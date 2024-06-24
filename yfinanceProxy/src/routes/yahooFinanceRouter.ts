import {Context} from 'koa';
import Router from 'koa-router';
import yahooFinanceController from '../controllers/yahooFinanceController';

const router = new Router();

router.get('/getFinanceChart/:symbol', async (ctx: Context) => {
  await yahooFinanceController.getFinanceChart(ctx);
});

const yahooFinanceRoutes = router.routes();
export default yahooFinanceRoutes;
