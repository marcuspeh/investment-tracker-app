import axios from 'axios';
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { SearchResultModel, SearchSymbolModel, FinanceChartModel, QuoteModel } from '../dto';
import { mockedFinanceChartData } from '@/mockedData/financeChartData';
import { mockedQuoteData } from '@/mockedData/quoteData';
import { mockedSearchSymbolData } from '@/mockedData/searchSymbolData';

const apiUrl: string = process.env.EXPO_PUBLIC_API_URL || "localhost:3000/api/v1";
const isDev: boolean = process.env.EXPO_PUBLIC_ENV === 'dev' || false;

async function getFinanceChart(symbol: string, range: string): Promise<ApiResponseModel<FinanceChartModel>> {
  return axios
    .get(`${apiUrl}/getFinanceChart/${symbol}?range=${range}`)
    .then(response => {
      return {
        isSuccess: true,
        data: response.data
      };
    })
    .catch(error => {
      console.log(error);

      return {
        isSuccess: false,
        data: isDev ? mockedFinanceChartData : undefined
      };
    });
}

async function getQuote(symbol: string): Promise<ApiResponseModel<QuoteModel>> {
  return axios
    .get(`${apiUrl}/getQuote/${symbol}`)
    .then(response => {
      return {
        isSuccess: true,
        data: response.data
      };
    })
    .catch(error => {
      console.log(error);

      return {
        isSuccess: false,
        data: isDev ? mockedQuoteData : undefined
      };
    });
}

async function searchSymbol(
  query: string,
  limit = 10
): Promise<ApiResponseModel<SearchResultModel>> {
  return axios
    .get(`${apiUrl}/searchSymbol?q=${query}&limit=${limit}`)
    .then(response => {
      return {
        isSuccess: true,
        data: response.data,
      };
    })
    .catch(error => {
      console.log(error);

      return {
        isSuccess: false,
        data: isDev ? mockedSearchSymbolData : undefined
      };
    });
}

export {
  getFinanceChart,
  searchSymbol,
  getQuote,
}