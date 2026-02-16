# MindFuel AI 🧠✨

MindFuel AI is a calm, professional mental wellness coach application designed to support users through AI-driven conversation, mood tracking, and relaxation techniques.

> **Note:** MindFuel AI is a supportive tool and **does not replace professional therapy**. If you are in crisis, please contact emergency services or a crisis helpline immediately.

## 🌟 Features

- **AI Wellness Coach**: Engage in supportive, non-judgmental conversations with an AI trained to offer cognitive reframing and actionable advice.
- **Mood Tracking**: Monitor your emotional state over time with an intuitive mood overview.
- **Burnout Meter**: Assess and track your burnout risk levels.
- **Breathing Exercises**: Guided breathing tools to help you relax and recenter.
- **Voice Interaction**: Speak naturally to the AI and hear responses (powered by ElevenLabs).
- **Crisis Support**: Built-in detection for crisis signals to provide immediate resource information.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **AI**: Google Gemini API (Generative AI)
- **Voice**: ElevenLabs API (Text-to-Speech), Web Speech API (Speech-to-Text)
- **Backend/Data**: Firebase (Firestore, Auth)
- **UI/UX**: Framer Motion (Animations), Lucide React (Icons), Recharts (Data Visualization)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shri207/mind.git
    cd mind
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🧪 Testing

To test the Gemini API connection:
```bash
npm run test:gemini
```

## 🛡️ License

This project is licensed under the MIT License.
