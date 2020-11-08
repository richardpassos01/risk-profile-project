import { Creatable, Fetchable } from '@domain/user/Repository';
import { User } from '@domain/user';
import { infrastructure } from '@shared/config';
import Database from '../Database';

const UserTable = infrastructure.database.tables.user;

export default class UserRepository implements Creatable, Fetchable {
  constructor(
    private readonly database: Database,
  ) { }

  async create(user: User): Promise<void> {
    return this.database.connection().insert(user)
      .into(UserTable);
  }

  async fetch(id: string): Promise<User> {
    const user = await this.database.connection()
      .select('*')
      .from(UserTable)
      .where({
        id,
      });

    return user[0];
  }
}
