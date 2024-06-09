interface Quotes {
  exchange: string;           // "NMS"										        "OPR"
  shortname: string;          // "Apple Inc."								     	"AAPL Jan 2026 165.000 call"
  quoteType: string;          // "EQUITY"									      	"OPTION"
  symbol: string;             // "AAPL"										        "AAPL260116C00165000"
  index: string;              // "quotes"									      	"quotes"
  score: string;              // 2904400									      	20008
  typeDisp: string;           // "Equity"									      	"Option"
  longname: string;           // "Apple Inc."								    	"AAPL Jan 2026 165.000 call"
  exchDisp: string;           // "NASDAQ"										      "OPR"
  sector: string;             // "Technology"									    -
  sectorDisp: string;         // "Technology"								     	-
  industry: string;           // "Consumer Electronics"						-
  industryDisp: string;       // "Consumer Electronics"						-
  dispSecIndFlag: boolean;    // true											        -
  isYahooFinance: boolean;    // true											        true
}

export interface SearchSymbolModel {
  quotes: Quotes[];
}
