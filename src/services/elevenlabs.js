const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL' // Sarah - calm, professional female voice
const API_BASE = 'https://api.elevenlabs.io/v1'

export async function textToSpeech(text) {
    try {
        const response = await fetch(`${API_BASE}/text-to-speech/${VOICE_ID}`, {
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
            throw new Error(`ElevenLabs API error: ${response.status}`)
        }

        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        return audioUrl
    } catch (error) {
        console.error('TTS Error:', error)
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
    const audioUrl = await textToSpeech(cleanText)
    await playAudio(audioUrl)
    return audioUrl
}
