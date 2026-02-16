import { GoogleGenerativeAI } from '@google/generative-ai';

// process.env will be populated by running with --env-file=.env
const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error('❌ Error: VITE_GEMINI_API_KEY is missing in .env file');
    process.exit(1);
}

async function testModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-2.0-flash-lite',
    ];

    console.log('🚀 Starting Gemini Model Test...');
    console.log(`🔑 API Key found (${API_KEY.substring(0, 8)}...)`);

    for (const modelName of modelsToTry) {
        try {
            process.stdout.write(`Testing ${modelName}... `);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Say hello');
            console.log(`✅ WORKS! Response: ${result.response.text().trim()}`);
        } catch (error) {
            console.log(`❌ FAILED: ${error.status || 'unknown'} - ${error.message?.substring(0, 100)}`);
        }
    }
}

testModels();
