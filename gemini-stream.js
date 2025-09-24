import API_CONFIG from './config.js';

class GeminiStreamService {
    constructor() {
        this.apiKey = API_CONFIG.GEMINI_API_KEY;
        this.modelId = 'gemini-2.5-flash';
        this.apiEndpoint = 'streamGenerateContent';
    }

    async streamRequest(inputText) {
        const requestBody = {
            contents: [{
                role: "user",
                parts: [{
                    text: inputText
                }]
            }],
            generationConfig: {
                thinkingConfig: {
                    thinkingBudget: -1
                }
            },
            tools: [{
                googleSearch: {}
            }]
        };

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${this.modelId}:${this.apiEndpoint}?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            return await response.text();
        } catch (error) {
            console.error('Stream request failed:', error);
            throw error;
        }
    }
}

export default GeminiStreamService;