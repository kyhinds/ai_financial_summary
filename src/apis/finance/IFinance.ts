export interface IFinance {
    getCompanyProfile(symbol: string): Promise<any>;
    getCompanyEarnings(symbol: string): Promise<any>;
    getCompanyRevenue(symbol: string, quarter: string, year: string): Promise<any>;
}
