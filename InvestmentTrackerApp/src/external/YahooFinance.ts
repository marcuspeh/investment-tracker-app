import axios from 'axios';
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { SearchResultModel, SearchSymbolModel, FinanceChartModel } from '../dto';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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
      };
    });
}

async function getQuote(symbol: string): Promise<ApiResponseModel<SearchResultModel>> {
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
      };
    });
}

async function searchSymbol(
  query: string,
  limit = 10
): Promise<ApiResponseModel<SearchSymbolModel>> {
  return axios
    .get(
      `${apiUrl}/searchSymbol?q=${query}&limit=${limit}`,
    )
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
      };
    });
}

export {
  getFinanceChart,
  searchSymbol,
  getQuote,
}