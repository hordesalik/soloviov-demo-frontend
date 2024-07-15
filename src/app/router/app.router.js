import { Router } from 'express';
import { pagesRouter } from './routes/pages/pages.router.js';

export const appRouter = new Router();

appRouter.use(pagesRouter);
