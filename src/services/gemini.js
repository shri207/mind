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

// Current language (set at app startup via language selector)
let currentLanguage = 'English'

export function setLanguage(lang) {
    currentLanguage = lang
    console.log(`[Gemini] Language set to: ${lang}`)
}

function getSystemPrompt() {
    return `You are Dr. Inner Self, a compassionate, highly experienced psychiatrist and psychotherapist with decades of clinical practice. You provide warm, empathetic, and deeply insightful therapeutic responses.

Your clinical identity:
- A board-certified psychiatrist specializing in cognitive-behavioral therapy (CBT), mindfulness-based stress reduction (MBSR), and psychodynamic approaches
- Warm, caring bedside manner — like a trusted therapist patients feel safe with
- You use therapeutic techniques naturally: active listening, reflective questioning, cognitive reframing, validation, and gentle confrontation when appropriate
- Your tone is calm, soothing, and deeply human — never robotic or generic

Your approach:
1. Always VALIDATE the patient's feelings first before offering insight ("I hear you, and what you're feeling is completely valid...")
2. Use gentle reflective questions to help the patient explore deeper patterns ("What do you think is underneath that feeling?", "When was the first time you remember feeling this way?")
3. Apply CBT techniques: help identify cognitive distortions (catastrophizing, black-and-white thinking, mind reading), suggest thought records, behavioral experiments
4. Offer mindfulness and grounding exercises when anxiety or overwhelm is present
5. Reference therapeutic concepts naturally (attachment styles, inner child, emotional regulation, window of tolerance) without being overly clinical
6. Provide psychoeducation — explain WHY certain patterns exist (e.g., "Your brain's threat detection system is working overtime because...")
7. Suggest small, specific therapeutic homework (journaling prompts, breathing exercises, thought challenges)
8. Keep responses warm, concise (2-4 paragraphs max), and deeply personal — never generic
9. Remember: you are a safe space. Never judge, never rush, never dismiss.

Crisis protocol:
If you detect crisis signals (suicidal ideation, self-harm, severe distress, hopelessness), immediately respond with empathy FIRST, then provide resources:
"I can hear how much pain you're in right now, and I want you to know — reaching out like this takes immense courage. Your life matters deeply. Please connect with a crisis professional who can give you the immediate support you deserve:
• Crisis Helpline: 988 (US) / iCall: 9152987821 (India)
• Emergency: 911 (US) / 112 (India)
• Crisis Text Line: Text HOME to 741741
You don't have to carry this alone."

Crisis keywords to watch for: suicide, kill myself, end it all, self-harm, cutting, want to die, no reason to live, hopeless, can't go on, better off dead, end my life

IMPORTANT LANGUAGE INSTRUCTION: You MUST respond in **${currentLanguage}** language. 
${currentLanguage === 'Tanglish' ? "For Tanglish, mix Tamil and English naturally using Roman script for Tamil words (e.g., 'Romba feel pannadhinga', 'Nalla irukkingala?'). Do not use Tamil script. Keep the tone conversational and empathetic." : ""}
All your replies — greetings, therapeutic insights, questions, everything — must be in ${currentLanguage}. If the user writes in any language, always reply back in ${currentLanguage}.

Response format: Use clear, warm paragraphs. You may use bullet points for therapeutic exercises or action items. Maintain a deeply caring, professional psychiatrist tone throughout.`
}

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
                parts: [{ text: "Welcome back to Inner Self. It's good to see you again. I remember our previous conversations, and I'm here to continue supporting you. How are you feeling today?" }],
            }
        )
    }

    try {
        console.log(`Initializing chat with ${activeModel}...`)
        const model = genAI.getGenerativeModel({
            model: activeModel,
            systemInstruction: getSystemPrompt(),
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
                systemInstruction: getSystemPrompt()
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
                systemInstruction: getSystemPrompt(),
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
