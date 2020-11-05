import { Router, Express } from 'express';
import riskProfileRoutes from './routes/riskProfile';

const registerRoutes = (server: Express): void => {
  const router = Router();

  riskProfileRoutes(router);

  server.use(router);
};

export default registerRoutes;
