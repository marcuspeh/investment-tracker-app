import Cors from '@koa/cors';
import Koa from 'koa';

import routes from './routes/index';

const app: Koa = new Koa();

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    ctx.status = error.statusCode || error.status || 500;
    error.status = ctx.status;
    ctx.body = {error};
    ctx.app.emit('error', error, ctx);
  }
});

// Middleware
app.use(Cors({credentials: true}));
app.proxy = true;

app.use(routes.routes());
app.use(routes.allowedMethods());

// Application error logging.
app.on('error', console.error);

export default app;
