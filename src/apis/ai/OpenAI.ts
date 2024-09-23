// src/apis/ai/OpenAI.ts

import { OpenAI } from "openai"; // Ensure this matches the actual export
import { IAI } from "./IAI";

export class OpenAIWrapper implements IAI {
    private openai: any; // Use any if specific type is unknown or not exported

    constructor(apiKey: string) {
        //const configuration = new Configuration({ apiKey: apiKey });
        this.openai = new OpenAI();
    }

    async decideAction(query: string): Promise<string> {
        const prompt = `Based on the input: "${query}", which action should be performed? Respond with one number only: 1 for earnings summary, 2 for revenue details, 0 for neither`;
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003", // Updated to a more recent model
                prompt: prompt,
                max_tokens: 10
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error in deciding action:', error);
            return '';  // Return empty or a default action code in case of an error
        }
    }

    async summarizeText(text: string): Promise<string> {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Summarize this text: ${text}`,
                max_tokens: 150
            });
            return response.choices[0].text.trim();
        } catch (error) {
            console.error('Error in summarizeText:', error);
            return 'Failed to summarize text.';
        }
    }

    async answerQuery(query: string): Promise<string> {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-002",
                prompt: query,
                max_tokens: 150
            });
            return response.choices[0].text.trim();
        } catch (error) {
            console.error('Error in answerQuery:', error);
            return 'Failed to answer query.';
        }
    }
}
