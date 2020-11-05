import { application } from '@shared/config';
import app from '@application/app';
import { Logger } from './logger';

const logger = new Logger();

const server = app.listen(application.port, () => {
  logger.info(`Server Running on PORT ${application.port}`);
});

export default server;
