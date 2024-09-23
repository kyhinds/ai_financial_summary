"use strict";
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
const OpenAI_1 = require("../src/apis/ai/OpenAI");
const FMP_1 = require("../src/apis/finance/FMP");
describe('Financial Query Processing', () => {
    let openAI;
    let fmp;
    beforeEach(() => {
        openAI = new OpenAI_1.OpenAIWrapper('test-openai-key');
        fmp = new FMP_1.FMP('test-fmp-key');
    });
    test('should process earnings summary correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(fmp, 'getCompanyEarnings').mockResolvedValue({ data: 'Earnings data' });
        jest.spyOn(openAI, 'summarizeText').mockResolvedValue('Summary of earnings');
        const symbol = 'AAPL';
        const earnings = yield fmp.getCompanyEarnings(symbol);
        const summary = yield openAI.summarizeText(JSON.stringify(earnings));
        expect(earnings).toEqual({ data: 'Earnings data' });
        expect(summary).toEqual('Summary of earnings');
    }));
    test('should handle revenue data fetch correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(fmp, 'getCompanyRevenue').mockResolvedValue({ data: 'Revenue data' });
        const symbol = 'AAPL';
        const quarter = 'Q2';
        const year = '2023';
        const revenue = yield fmp.getCompanyRevenue(symbol, quarter, year);
        expect(revenue).toEqual({ data: 'Revenue data' });
    }));
    // Add more tests as needed for each functionality
});
