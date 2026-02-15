import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC_qElYAp9IGl5QuB6ro5Q2WO7tKBZ1d0c';

async function testModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-2.0-flash-lite',
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Say hello');
            console.log(`✅ ${modelName} WORKS! Response: ${result.response.text().trim()}`);
        } catch (error) {
            console.log(`❌ ${modelName} FAILED: ${error.status || 'unknown'} - ${error.message?.substring(0, 100)}`);
        }
    }
}

testModels();
