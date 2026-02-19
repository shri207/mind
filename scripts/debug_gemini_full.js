
const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error('❌ Error: VITE_GEMINI_API_KEY is missing');
    process.exit(1);
}

async function listModels() {
    console.log('Fetching available models...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`❌ Failed to list models: ${response.status} ${response.statusText}`);
            console.error(await response.text());
            return;
        }

        const data = await response.json();
        console.log('✅ Available Models:');
        if (data.models) {
            data.models.forEach(m => {
                if (m.name.includes('generateContent')) { // Only show models that support generation
                    console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                } else if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                }
            });
            // Just print all names to be safe
            console.log('All model names:');
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log('No models found in response.');
        }
    } catch (e) {
        console.error('❌ Network error:', e);
    }
}

listModels();
