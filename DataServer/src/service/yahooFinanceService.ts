import { SearchResultModel, SearchSymbolModel, QuoteModel, FinanceChartModel, StockDescriptionModel } from '../dto';
import axios, { AxiosRequestConfig } from 'axios';


let invalidCookieTime: Date = new Date()
let cookieCache: string = ""
async function getCookie(): Promise<string> {
  const currTime = new Date()
  if (invalidCookieTime.getTime() > currTime.getTime() && cookieCache !== "") {
    return cookieCache
  }

  cookieCache = await axios.get(
    "https://fc.yahoo.com"
  ).catch(err => {
    return err.response.headers['set-cookie'][0]
  })

  if (cookieCache !== "") {
    invalidCookieTime = new Date(currTime.getTime() + 60 * 1000 * 60) // 1 hour
  }
  return cookieCache
}

let invalidCrumbTime: Date = new Date()
let crumbCache: string = ""
async function getCrumb(): Promise<string> {
  const currTime = new Date()
  if (invalidCrumbTime.getTime() > currTime.getTime() && crumbCache !== "") {
    return crumbCache
  }

  const header = await getHeader()
  const crumbResponse = await axios.get(
    `https://query2.finance.yahoo.com/v1/test/getcrumb`,
    header
  )
  crumbCache = crumbResponse.data;

  if (crumbCache !== "") {
    invalidCrumbTime = new Date(currTime.getTime() + 60 * 1000 * 60) // 1 hour
  }
  return crumbCache
}

async function getHeader(): Promise<AxiosRequestConfig> {
  const cookie = await getCookie()
  return {
    headers: {
      Cookie: cookie,
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    } 
  }
}

async function getQuoteService(symbol: string): Promise<QuoteModel> {
  const header = await getHeader()
  const crumb = await getCrumb()
  const response = await axios.get(
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbol}&crumb=${crumb}`,
    header,
  )

  const result = response.data?.quoteResponse?.result;
  if (result.length === 0) {
    return {} as QuoteModel;
  }

  const parsedResponse: QuoteModel =  {
    region: result[0]?.region,
    quoteType: result[0]?.quoteType,
    currency: result[0]?.currency,
    regularMarketChangePercent: result[0]?.regularMarketChangePercent,
    regularMarketPrice: result[0]?.regularMarketPrice,
    exchange: result[0]?.exchange,
    market: result[0]?.market,
    regularMarketChange: result[0]?.regularMarketChange,
    regularMarketTime: result[0]?.regularMarketTime,
    fullExchangeName: result[0]?.fullExchangeName,
    financialCurrency: result[0]?.financialCurrency,
    averageDailyVolume10Day: result[0]?.averageDailyVolume10Day,
    fiftyTwoWeekLow: result[0]?.fiftyTwoWeekLow,
    fiftyTwoWeekHigh: result[0]?.fiftyTwoWeekHigh,
    trailingPE: result[0]?.trailingPE,
    dividendRate: result[0]?.dividendRate,
    dividendYield: result[0]?.dividendYield,
    marketCap: result[0]?.marketCap,
    cryptoTradeable: result[0]?.cryptoTradeable,
    displayName: result[0]?.displayName,
    symbol: result[0]?.symbol,
  }
  
  return parsedResponse;
}

async function getFinanceChartService(symbol: string, range: string, interval: string): Promise<FinanceChartModel> {
  const response = await axios.get(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&useYfid=true&range=${range}`
  )

  const result = response.data?.chart?.result;
  if (result.length === 0) {
    return {} as FinanceChartModel;
  }

  const parsedResponse: FinanceChartModel = {
    timestamps: result[0]?.timestamp,
    close: result[0]?.indicators.quote[0]?.close,
  }
  return parsedResponse;
}

async function searchSymbolsService(query: string, limit: number): Promise<SearchResultModel> {
  const response = await  axios.get(
    `https://query1.finance.yahoo.com/v1/finance/search?q=${query}&quotesCount=${limit}&newsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`,
  )

  const result: SearchSymbolModel[] = []
  for (const row of response.data.quotes) {
    if (row?.shortname === "" || row?.shortname === undefined) {
      continue
    }
    result.push({
      shortname: row.shortname,
      quoteType: row.quoteType,
      symbol: row.symbol,
      score: row.score,
      exchDisp: row.exchDisp,
    })
  }

  return {
    quotes: result,
  } as SearchResultModel
}

async function getStockDescriptionService(symbol: string): Promise<StockDescriptionModel> {
  const crumb = await getCrumb()
  const header = await getHeader()
  const response = await  axios.get(
    `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=assetProfile&crumb=${crumb}`,
    header
  )

  return {
    longBusinessSummary: response.data?.quoteSummary?.result[0].assetProfile?.longBusinessSummary,
  } as StockDescriptionModel
}

export {
  getQuoteService,
  getFinanceChartService,
  searchSymbolsService,
  getStockDescriptionService
}