import express from 'express';
import registerRoutes from '@application/router';
import errorHandler from './error/handler';

const app = express();

app.use(express.json());
registerRoutes(app);
app.use(errorHandler);

export default app;
