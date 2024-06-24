import axios from 'axios';
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { FinanceChartModel, SearchSymbolModel } from '@/model/external';
import { chartDataParsed } from '@/mockedData/chart';

async function getFinanceChart(symbol: string): Promise<ApiResponseModel<FinanceChartModel>> {
  return axios
    .get(
      `http://localhost:3000/api/v1/getFinanceChart/${symbol}`
    )
    .then(response => {
      const result = response.data?.chart?.result;
      if (result.length === 0) {
        return {
          isSuccess: true
        };
      }

      var parsedResponse: FinanceChartModel = {
        meta: result[0].meta,
        timestamps: result[0].timestamp,
        quotes: result[0].indicators.quote[0],
      }

      return {
        isSuccess: true,
        data: parsedResponse
      };
    })
    .catch(error => {
      console.log(error);

      return {
        isSuccess: false,
        data: chartDataParsed
      };
    });
}

async function searchSymbol(
  query: string,
  limit = 10
): Promise<ApiResponseModel<SearchSymbolModel>> {
  return axios
    .get(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${query}&quotesCount=${limit}&newsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`,
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
  searchSymbol
}