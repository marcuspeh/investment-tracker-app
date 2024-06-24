import {Context} from 'koa';
import Router from 'koa-router';

import serverStatusController from '../controllers/serverStatusController';
import yahooFinanceRoutes from './yahooFinanceRouter';

const router = new Router();
router.prefix('/api');

// Check server status
router.get('/serverStatus', async (ctx: Context) => {
  await serverStatusController.statusCheck(ctx);
});

// Set up routes
router.use('/v1', yahooFinanceRoutes);

export default router;
