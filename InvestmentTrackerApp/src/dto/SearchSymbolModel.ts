interface SearchSymbolModel{
  shortname: string;          // "Apple Inc."								     	"AAPL Jan 2026 165.000 call"
  quoteType: string;          // "EQUITY"									      	"OPTION"
  symbol: string;             // "AAPL"										        "AAPL260116C00165000"
  score: number;              // 2904400									      	20008
  exchDisp: string;           // "NASDAQ"										      "OPR"
}

interface SearchResultModel {
  quotes: SearchSymbolModel[];
}

export type {
  SearchResultModel,
  SearchSymbolModel,
}
