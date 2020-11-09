import express from 'express';
import registerRoutes from '@application/router';
import errorHandler from './error/handler';
import { registerEvents } from './container/Events';

const app = express();

app.use(express.json());
registerRoutes(app);
registerEvents();
app.use(errorHandler);

export default app;
