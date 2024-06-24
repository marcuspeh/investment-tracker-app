import {Context} from 'koa';
import axios from 'axios';

async function getFinanceChart(ctx: Context) {
  const symbol: string = ctx.params.symbol || ""
  const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    )

  ctx.body = response.data
  ctx.status = response.status
}

export default {
  getFinanceChart,
};