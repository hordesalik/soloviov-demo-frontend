import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { appRouter } from '../../router/app.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const expressAppInstance = express();

expressAppInstance.set('views', path.join(__dirname, '..', '..', 'views'));
expressAppInstance.set('view engine', 'mustache');
expressAppInstance.engine('mustache', mustacheExpress());

expressAppInstance.use('/public', express.static(path.join(__dirname, '..', '..', '..', 'public')));
expressAppInstance.use(appRouter);
