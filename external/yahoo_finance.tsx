import axios from 'axios';
import {ApiResponseModel} from '../model/api_response_model';

async function getFinanceChart(symbol: string): Promise<ApiResponseModel> {
  return axios
    .get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`)
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

async function searchSymbol(
  query: string,
  limit = 10
): Promise<ApiResponseModel> {
  return axios
    .get(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${query}&quotesCount=${limit}&newsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`
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

export default {
  getFinanceChart,
  searchSymbol
}