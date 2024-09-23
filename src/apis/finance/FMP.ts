import axios from 'axios';
import { IFinance } from './IFinance';

export class FMP implements IFinance {
    private baseUrl: string = 'https://financialmodelingprep.com/api/v3';
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getCompanyProfile(symbol: string): Promise<any> {
        return this.fetchData(`${this.baseUrl}/profile/${symbol}`);
    }

    async getCompanyEarnings(symbol: string): Promise<any> {
        return this.fetchData(`${this.baseUrl}/income-statement/${symbol}`);
    }

    async getCompanyRevenue(symbol: string, quarter: string, year: string): Promise<any> {
        // Assuming revenue data is available under a specific endpoint
        return this.fetchData(`${this.baseUrl}/revenue/${symbol}?quarter=${quarter}&year=${year}`);
    }

    private async fetchData(url: string): Promise<any> {
        try {
            const response = await axios.get(url, { params: { apikey: this.apiKey } });
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch data from FMP:`, error);
            return null;
        }
    }
}
