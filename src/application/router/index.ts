import { Router, Express } from 'express';
import riskProfileRoutes from './routes/riskProfile';
import userRoutes from './routes/user';

const registerRoutes = (server: Express): void => {
  const router = Router();

  riskProfileRoutes(router);
  userRoutes(router);

  server.use(router);
};

export default registerRoutes;
