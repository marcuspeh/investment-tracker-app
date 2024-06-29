import { SearchResultModel } from "@/dto"

const searchSymbolData: SearchResultModel = {
  "quotes": [
      {
          "shortname": "Advance Auto Parts Inc.",
          "quoteType": "EQUITY",
          "symbol": "AAP",
          "score": 2025100,
          "exchDisp": "NYSE"
      },
      {
          "shortname": "Apple Inc.",
          "quoteType": "EQUITY",
          "symbol": "AAPL",
          "score": 54791,
          "exchDisp": "NASDAQ"
      },
      {
          "shortname": "APPLE INC",
          "quoteType": "EQUITY",
          "symbol": "AAPL.MX",
          "score": 20048,
          "exchDisp": "Mexico"
      }
  ]
}

export {
  searchSymbolData,
}
