"use strict";
// index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const readline_1 = __importDefault(require("readline"));
const OpenAI_1 = require("./apis/ai/OpenAI");
const FMP_1 = require("./apis/finance/FMP");
// Load environment variables
dotenv_1.default.config();
// Set up command line interface for input
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const openAI = new OpenAI_1.OpenAIWrapper(process.env.OPENAI_API_KEY || '');
const fmp = new FMP_1.FMP(process.env.FMP_API_KEY || '');
function processUserQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        rl.question('Enter your financial query: ', (query) => __awaiter(this, void 0, void 0, function* () {
            // Determine the action based on the query using OpenAI
            const action = yield openAI.decideAction(query);
            console.log(`Determined action: ${action}`);
            const symbol = extractSymbol(query); // Function to extract symbol from query
            switch (action) {
                case '1': // Fetch and summarize earnings
                    const earningsData = yield fmp.getCompanyEarnings(symbol);
                    const summary = yield openAI.summarizeText(JSON.stringify(earningsData));
                    console.log(`Earnings Summary for ${symbol}:`, summary);
                    break;
                case '2': // Fetch revenue data
                    const parts = query.split(' ');
                    const year = parts[parts.length - 1];
                    const quarter = parts[parts.length - 2];
                    const revenueData = yield fmp.getCompanyRevenue(symbol, quarter, year);
                    console.log(`Revenue for ${symbol} in ${quarter} ${year}:`, revenueData);
                    break;
                default:
                    console.log("Action not recognized. Please try a different query.");
            }
            rl.close(); // Close the readline interface after processing the query
        }));
    });
}
function extractSymbol(query) {
    // Extracts the stock symbol from the query
    return query.split(' ')[1];
}
processUserQuery();
