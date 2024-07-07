import {Context} from 'koa';
import Router from 'koa-router';
import yahooFinanceController from '../controllers/yahooFinanceController';

const router = new Router();

router.get('/getFinanceChart/:symbol', async (ctx: Context) => {
  await yahooFinanceController.getFinanceChart(ctx);
});

router.get('/getQuote/:symbol', async (ctx: Context) => {
  await yahooFinanceController.getQuote(ctx);
});

router.get('/searchSymbol', async (ctx: Context) => {
  await yahooFinanceController.searchSymbols(ctx);
});

router.get('/getStockDescription/:symbol', async (ctx: Context) => {
  await yahooFinanceController.getStockDescription(ctx);
});


const yahooFinanceRoutes = router.routes();
export default yahooFinanceRoutes;
