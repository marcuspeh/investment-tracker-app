interface FinanceChartMeta {
  currency: string; // "USD"
  symbol: string; // "AAPL"
  exchangeName: string; // "NMS"
  fullExchangeName: string; // "NasdaqGS"
  instrumentType: string; // "EQUITY"
  firstTradeDate: number; // 345479400
  regularMarketTime: number; // 1716321601
  hasPrePostMarketData: boolean; // true
  gmtoffset: number; // -14400
  timezone: string; // "EDT"
  exchangeTimezoneName: string; // "America/New_York"
  regularMarketPrice: number; // 192.35
  fiftyTwoWeekHigh: number; // 192.73
  fiftyTwoWeekLow: number; // 190.92
  regularMarketDayHigh: number; // 192.73
  regularMarketDayLow: number; // 190.92
  regularMarketVolume: number; // 41934946
  chartPreviousClose: number; // 191.04
  previousClose: number; // 191.04
  scale: number; // 3
  priceHint: number; // 2
  dataGranularity: string; // "1m"
  range: string; // "1d"
  validRanges: string[]; // ["1d",  "5d", "1mo", "3mo", "6mo",  "1y",  "2y",  "5y", "10y",  "ytd",  "max"]
}

interface FinanceChartQuotes {
  open: number[];
  volume: number[];
  high: number[];
  close: number[];
  low: number[];
}

export interface FinanceChartModel {
  meta: FinanceChartMeta;
  timestamps: number[];
  quotes: FinanceChartQuotes;
}
