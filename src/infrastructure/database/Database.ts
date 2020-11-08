import Knex from 'knex';
import { infrastructure } from '../../shared/config';

export const config: Knex.Config = {
  client: 'mysql2',
  connection: infrastructure.database.connection,
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
};

export default class Database {
  private static instance: Database;

  private constructor(
    private readonly knexInstance: Knex,
  ) { }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database(Knex(config));
      Database.instance.checkConnection();
    }

    return Database.instance;
  }

  public async checkConnection(): Promise<string> {
    return this.knexInstance.select(1);
  }

  public connection(): Knex {
    return this.knexInstance;
  }
}
