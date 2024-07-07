import {Context} from 'koa';
import { getFinanceChartService, getQuoteService, searchSymbolsService, getStockDescriptionService } from '../service/yahooFinanceService';

async function getFinanceChart(ctx: Context) {
  const symbol: string = ctx.params.symbol || ""
  if (!symbol) {
    ctx.status = 400
    return;
  }

  const rangeToIntervalMap = {
    '1d': '2m',
    '5d': '15m',
    '1mo': '30m',
    '6mo': '1d',
    '1y': '1d',
    '5y': '1wk',
    'max': '1mo'
  }
  const range: string = ctx.request.query.range as string || "1mo"
  const interval: string = rangeToIntervalMap[range] 

  ctx.body = await getFinanceChartService(symbol, range, interval)
}

async function getQuote(ctx: Context) {
  const symbol: string = ctx.params.symbol || ""
  if (!symbol) {
    ctx.status = 400
    return;
  }

  ctx.body = await getQuoteService(symbol)
}

async function searchSymbols(ctx: Context) {
  const query: string = ctx.request.query.q as string || ""
  const limit: number = Number(ctx.request.query.limit as string) || 10

  ctx.body = await searchSymbolsService(query, limit)
}

async function getStockDescription(ctx: Context) {
  
  const symbol: string = ctx.params.symbol || ""
  if (!symbol) {
    ctx.status = 400
    return;
  }

  ctx.body = await getStockDescriptionService(symbol)
}

export default {
  getFinanceChart,
  getQuote,
  searchSymbols,
  getStockDescription
};