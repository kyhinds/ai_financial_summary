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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMP = void 0;
const axios_1 = __importDefault(require("axios"));
class FMP {
    constructor(apiKey) {
        this.baseUrl = 'https://financialmodelingprep.com/api/v3';
        this.apiKey = apiKey;
    }
    getCompanyProfile(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchData(`${this.baseUrl}/profile/${symbol}`);
        });
    }
    getCompanyEarnings(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchData(`${this.baseUrl}/income-statement/${symbol}`);
        });
    }
    getCompanyRevenue(symbol, quarter, year) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming revenue data is available under a specific endpoint
            return this.fetchData(`${this.baseUrl}/revenue/${symbol}?quarter=${quarter}&year=${year}`);
        });
    }
    fetchData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(url, { params: { apikey: this.apiKey } });
                return response.data;
            }
            catch (error) {
                console.error(`Failed to fetch data from FMP:`, error);
                return null;
            }
        });
    }
}
exports.FMP = FMP;
