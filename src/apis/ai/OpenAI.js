"use strict";
// src/apis/ai/OpenAI.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIWrapper = void 0;
const openai_1 = require("openai"); // Ensure this matches the actual export
class OpenAIWrapper {
    constructor(apiKey) {
        //const configuration = new Configuration({ apiKey: apiKey });
        this.openai = new openai_1.OpenAI();
    }
    decideAction(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Based on the input: "${query}", which action should be performed? Respond with one number only: 1 for earnings summary, 2 for revenue details, 0 for neither`;
            try {
                const response = yield this.openai.createCompletion({
                    model: "text-davinci-003", // Updated to a more recent model
                    prompt: prompt,
                    max_tokens: 10
                });
                return response.data.choices[0].text.trim();
            }
            catch (error) {
                console.error('Error in deciding action:', error);
                return ''; // Return empty or a default action code in case of an error
            }
        });
    }
    summarizeText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.createCompletion({
                    model: "text-davinci-002",
                    prompt: `Summarize this text: ${text}`,
                    max_tokens: 150
                });
                return response.choices[0].text.trim();
            }
            catch (error) {
                console.error('Error in summarizeText:', error);
                return 'Failed to summarize text.';
            }
        });
    }
    answerQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.createCompletion({
                    model: "text-davinci-002",
                    prompt: query,
                    max_tokens: 150
                });
                return response.choices[0].text.trim();
            }
            catch (error) {
                console.error('Error in answerQuery:', error);
                return 'Failed to answer query.';
            }
        });
    }
}
exports.OpenAIWrapper = OpenAIWrapper;
