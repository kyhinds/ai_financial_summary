import OpenAI from 'openai'; // Import OpenAI directly
import { IAI } from "./IAI";

export class OpenAIWrapper implements IAI {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey: apiKey // Pass the API key directly in the constructor
        });
    }

    async decideAction(query: string): Promise<string> {
        const prompt = `Based on the input: "${query}", which action should be performed? Respond with one number only: 1 for earnings summary, 2 for revenue details, 0 for neither.`;
        try {
            const response = await this.openai.completions.create({
                model: "gpt-3.5-turbo", 
                prompt: prompt,
                max_tokens: 10
            });
            return response.choices[0].text.trim();
        } catch (error) {
            console.error('Error in deciding action:', error);
            return '';  // Return empty or a default action code in case of an error
        }
    }


    async summarizeText(text: string): Promise<string> {
        try {
            const response = await this.openai.completions.create({
                model: "gpt-3.5-turbo",
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
            const response = await this.openai.completions.create({
                model: "gpt-3.5-turbo",
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
