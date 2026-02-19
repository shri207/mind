// Language code mapping for Web Speech API
const LANG_MAP = {
    'English': 'en-US',
    'Hindi': 'hi-IN',
    'Tamil': 'ta-IN',
    'Telugu': 'te-IN',
    'Spanish': 'es-ES',
    'French': 'fr-FR',
    'German': 'de-DE',
    'Japanese': 'ja-JP',
    'Korean': 'ko-KR',
    'Chinese': 'zh-CN',
    'Arabic': 'ar-SA',
    'Portuguese': 'pt-BR',
    'Tanglish': 'en-IN',
}

let currentLang = 'en-US'

export function setSpeechLanguage(lang) {
    currentLang = LANG_MAP[lang] || 'en-US'
    console.log(`[SpeechRecognition] Language set to: ${currentLang}`)
}

export function createSpeechRecognition(onResult, onEnd) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
        console.warn('Speech Recognition not supported in this browser')
        return null
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = currentLang

    let finalTranscript = ''

    recognition.onresult = (event) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
                finalTranscript += transcript
            } else {
                interim += transcript
            }
        }
        onResult(finalTranscript || interim, event.results[event.results.length - 1]?.isFinal)
    }

    recognition.onend = () => {
        onEnd(finalTranscript)
        finalTranscript = ''
    }

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        onEnd('')
    }

    return recognition
}
