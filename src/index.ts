// index.ts

import dotenv from 'dotenv';
import readline from 'readline';
import { OpenAIWrapper } from './apis/ai/OpenAI';
import { FMP } from './apis/finance/FMP';

// Load environment variables
dotenv.config();

// Set up command line interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const openAI = new OpenAIWrapper(process.env.OPENAI_API_KEY || '');
const fmp = new FMP(process.env.FMP_API_KEY || '');

async function processUserQuery() {
  rl.question('Enter your financial query: ', async (query) => {
    // Determine the action based on the query using OpenAI
    const action = await openAI.decideAction(query);
    console.log(`Determined action: ${action}`);

    const symbol = extractSymbol(query); // Function to extract symbol from query
    switch (action) {
      case '1': // Fetch and summarize earnings
        const earningsData = await fmp.getCompanyEarnings(symbol);
        const summary = await openAI.summarizeText(JSON.stringify(earningsData));
        console.log(`Earnings Summary for ${symbol}:`, summary);
        break;
      case '2': // Fetch revenue data
        const parts = query.split(' ');
        const year = parts[parts.length - 1];
        const quarter = parts[parts.length - 2];
        const revenueData = await fmp.getCompanyRevenue(symbol, quarter, year);
        console.log(`Revenue for ${symbol} in ${quarter} ${year}:`, revenueData);
        break;
      default:
        console.log("Action not recognized. Please try a different query.");
    }

    rl.close(); // Close the readline interface after processing the query
  });
}

function extractSymbol(query: string): string {
  // Extracts the stock symbol from the query
  return query.split(' ')[1];
}

processUserQuery();
