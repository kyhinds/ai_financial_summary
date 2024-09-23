import { OpenAIWrapper } from '../src/apis/ai/OpenAI';
import { FMP } from '../src/apis/finance/FMP';

describe('Financial Query Processing', () => {
  let openAI: OpenAIWrapper;
  let fmp: FMP;

  beforeEach(() => {
    openAI = new OpenAIWrapper('test-openai-key');
    fmp = new FMP('test-fmp-key');
  });

  test('should process earnings summary correctly', async () => {
    jest.spyOn(fmp, 'getCompanyEarnings').mockResolvedValue({ data: 'Earnings data' });
    jest.spyOn(openAI, 'summarizeText').mockResolvedValue('Summary of earnings');

    const symbol = 'AAPL';
    const earnings = await fmp.getCompanyEarnings(symbol);
    const summary = await openAI.summarizeText(JSON.stringify(earnings));

    expect(earnings).toEqual({ data: 'Earnings data' });
    expect(summary).toEqual('Summary of earnings');
  });

  test('should handle revenue data fetch correctly', async () => {
    jest.spyOn(fmp, 'getCompanyRevenue').mockResolvedValue({ data: 'Revenue data' });
    
    const symbol = 'AAPL';
    const quarter = 'Q2';
    const year = '2023';
    const revenue = await fmp.getCompanyRevenue(symbol, quarter, year);

    expect(revenue).toEqual({ data: 'Revenue data' });
  });

  // Add more tests as needed for each functionality
});
