import Cors from '@koa/cors';
import Koa from 'koa';

import routes from './routes/index';

const app: Koa = new Koa();

// Middleware
app.use(Cors({credentials: true}));
app.proxy = true;

app.use(routes.routes());
app.use(routes.allowedMethods());

// Application error logging.
app.on('error', console.error);

export default app;
