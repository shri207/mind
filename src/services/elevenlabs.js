const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const API_BASE = 'https://api.elevenlabs.io/v1'

// Voice mapping per language — using ElevenLabs best voices
const VOICE_MAP = {
    'English': 'EXAVITQu4vr4xnSDxMaL',    // Sarah — calm, professional female
    'Hindi': 'pFZP5JQG7iQjIQuC4Bku',       // Lily — works well with Hindi
    'Tamil': 'pFZP5JQG7iQjIQuC4Bku',       // Lily — multilingual
    'Telugu': 'pFZP5JQG7iQjIQuC4Bku',      // Lily — multilingual
    'Spanish': 'EXAVITQu4vr4xnSDxMaL',     // Sarah
    'French': 'EXAVITQu4vr4xnSDxMaL',      // Sarah
    'German': 'EXAVITQu4vr4xnSDxMaL',      // Sarah
    'Japanese': 'pFZP5JQG7iQjIQuC4Bku',    // Lily
    'Korean': 'pFZP5JQG7iQjIQuC4Bku',      // Lily
    'Chinese': 'pFZP5JQG7iQjIQuC4Bku',     // Lily
    'Arabic': 'pFZP5JQG7iQjIQuC4Bku',      // Lily
    'Portuguese': 'EXAVITQu4vr4xnSDxMaL',  // Sarah
    'Tanglish': 'pFZP5JQG7iQjIQuC4Bku',   // Lily - multilingual
}

let currentVoiceId = VOICE_MAP['English']

export function setTTSLanguage(lang) {
    currentVoiceId = VOICE_MAP[lang] || VOICE_MAP['English']
    console.log(`[ElevenLabs] Voice set for language: ${lang}, voiceId: ${currentVoiceId}`)
}

export async function textToSpeech(text) {
    try {
        console.log(`[ElevenLabs] Calling TTS API with voiceId: ${currentVoiceId}`)
        const response = await fetch(`${API_BASE}/text-to-speech/${currentVoiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': API_KEY,
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.75,
                    style: 0.4,
                    use_speaker_boost: true,
                },
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`[ElevenLabs] API error ${response.status}:`, errorText)
            throw new Error(`ElevenLabs API error: ${response.status}`)
        }

        console.log('[ElevenLabs] TTS response received successfully')
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        return audioUrl
    } catch (error) {
        console.error('[ElevenLabs] TTS Error:', error)
        throw error
    }
}

let currentAudio = null

export function playAudio(url) {
    return new Promise((resolve, reject) => {
        if (currentAudio) {
            currentAudio.pause()
            currentAudio = null
        }

        currentAudio = new Audio(url)
        currentAudio.onended = () => {
            currentAudio = null
            resolve()
        }
        currentAudio.onerror = (e) => {
            currentAudio = null
            reject(e)
        }
        currentAudio.play()
    })
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause()
        currentAudio = null
    }
}

export async function speakText(text) {
    const cleanText = text.replace(/[*#_`]/g, '').substring(0, 1000)
    console.log(`[ElevenLabs] Speaking text (${cleanText.length} chars)...`)
    const audioUrl = await textToSpeech(cleanText)
    await playAudio(audioUrl)
    return audioUrl
}
