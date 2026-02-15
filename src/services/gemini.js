import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Monkey-patch fetch to proxy Google API requests (bypass CORS)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
    let [resource, config] = args;
    if (typeof resource === 'string' && resource.includes('generativelanguage.googleapis.com')) {
        resource = resource.replace('https://generativelanguage.googleapis.com', '/google-api');
    } else if (resource instanceof Request && resource.url.includes('generativelanguage.googleapis.com')) {
        const newUrl = resource.url.replace('https://generativelanguage.googleapis.com', '/google-api');
        resource = new Request(newUrl, resource);
    }
    return originalFetch(resource, config);
};

const SYSTEM_PROMPT = `You are MindFuel AI, a calm, professional mental wellness coach. You are NOT a therapist and must NEVER diagnose mental health conditions.

Your personality:
- Like a calm executive coach combined with a supportive friend
- Professional vocabulary, structured responses
- Non-judgmental, warm but not overly emotional
- Clear and actionable

Your rules:
1. NEVER diagnose depression, anxiety, or any mental illness
2. NEVER replace therapy or medical advice
3. NEVER use clinical/medical terminology
4. Always offer cognitive reframing techniques
5. Suggest small, practical, actionable steps
6. Ask reflective questions to build self-awareness
7. If you detect crisis signals (suicidal ideation, self-harm, severe distress), immediately respond with: "I want you to know that your feelings matter. For immediate support, please reach out to: Crisis Helpline: 988 (US), Emergency: 911, Crisis Text Line: Text HOME to 741741. You deserve professional support right now."
8. Keep responses concise (2-4 paragraphs max)
9. Use encouraging language focused on strengths and resilience
10. Frame challenges as opportunities for growth

Crisis keywords to watch for: suicide, kill myself, end it all, self-harm, cutting, want to die, no reason to live, hopeless, can't go on

Response format: Use clear paragraphs. You may use bullet points for action items. Keep a warm, professional tone throughout.`

let chatSession = null

const MODELS = ['gemini-2.5-flash']
let activeModel = MODELS[0]

async function getWorkingModel(systemInstruction) {
    return { model: genAI.getGenerativeModel({ model: activeModel, systemInstruction }), name: activeModel }
}

export async function initChat(memoryContext = null) {
    const history = []
    if (memoryContext) {
        history.push(
            {
                role: 'user',
                parts: [{ text: `[SYSTEM CONTEXT - Previous conversation history for continuity]\n\n${memoryContext}\n\n[END SYSTEM CONTEXT]\n\nPlease acknowledge you have context from our previous conversations. Greet me warmly and naturally, referencing something from our past conversations if relevant.` }],
            },
            {
                role: 'model',
                parts: [{ text: "Welcome back to MindFuel. It's good to see you again. I remember our previous conversations, and I'm here to continue supporting you. How are you feeling today?" }],
            }
        )
    }

    try {
        console.log(`Initializing chat with ${activeModel}...`)
        const model = genAI.getGenerativeModel({
            model: activeModel,
            systemInstruction: SYSTEM_PROMPT,
        })

        chatSession = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 800,
                temperature: 0.7,
                topP: 0.9,
            },
        })

        return chatSession
    } catch (e) {
        console.error('Failed to init chat:', e)
        throw e
    }
}

export async function sendMessage(message) {
    if (!chatSession) {
        console.log('Session missing, re-initializing...')
        await initChat()
    }

    try {
        console.log(`Sending message via ${activeModel}...`)

        // Timeout promise (8s)
        const timeoutMs = 8000
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out after 8s')), timeoutMs)
        )

        // Race: Try stateful chat first
        const resultPromise = chatSession.sendMessage(message)
        const result = await Promise.race([resultPromise, timeoutPromise])

        console.log('Message sent successfully')
        return result.response.text()
    } catch (error) {
        console.error('Gemini stateful chat failed/timed out:', error)

        // Fallback: Stateless generation (often works when chat session is stuck)
        try {
            console.log('Falling back to stateless generation...')
            const model = genAI.getGenerativeModel({
                model: activeModel,
                systemInstruction: SYSTEM_PROMPT
            })

            // Construct a simple prompt with recent history if possible, or just the message
            const prompt = `[Previous context: User is talking to AI coach]\nUser: ${message}\nModel:`
            const result = await model.generateContent(prompt)
            return result.response.text()
        } catch (fallbackError) {
            console.error('Stateless fallback also failed:', fallbackError)
            chatSession = null // Force re-init next time
            throw fallbackError
        }
    }
}

/**
 * Standalone generation with fallback
 */
export async function generateResponse(prompt) {
    for (const modelName of MODELS) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: SYSTEM_PROMPT,
            })
            const result = await model.generateContent(prompt)
            activeModel = modelName // Remember working model
            return result.response.text()
        } catch (e) {
            console.warn(`generateResponse failed with ${modelName}:`, e)
            // Continue to next model
        }
    }
    throw new Error('All models failed to generate response')
}

export function detectCrisis(text) {
    const crisisKeywords = [
        'suicide', 'kill myself', 'end it all', 'self-harm', 'self harm',
        'cutting myself', 'want to die', 'no reason to live', 'hopeless',
        "can't go on", 'end my life', 'better off dead', 'not worth living'
    ]
    const lowerText = text.toLowerCase()
    return crisisKeywords.some(keyword => lowerText.includes(keyword))
}

export async function analyzeSentiment(text) {
    const model = genAI.getGenerativeModel({ model: activeModel })

    const prompt = `Analyze the emotional sentiment of the following text and return ONLY a JSON object with these exact fields (no markdown, no code blocks, just raw JSON):
{
  "mood_score": <number 1-100, where 100 is very positive>,
  "energy_level": <number 1-100>,
  "stress_index": <number 1-100, where 100 is very stressed>,
  "dominant_emotion": "<one word>",
  "burnout_risk": "<low|moderate|elevated|critical>",
  "burnout_score": <number 0-100>
}

Text: "${text}"`

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text().trim()
        const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        return JSON.parse(cleaned)
    } catch (e) {
        return {
            mood_score: 65,
            energy_level: 55,
            stress_index: 40,
            dominant_emotion: 'neutral',
            burnout_risk: 'low',
            burnout_score: 25
        }
    }
}
