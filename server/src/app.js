import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { env } from './config/env.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }));
  app.use('/api', routes);
  app.use(errorHandler);

  return app;
}
