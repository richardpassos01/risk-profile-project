import { Creatable } from '../Repository';
import User, { UserDTO } from '../User';

export default class Create {
  constructor(
    private readonly creator: Creatable,
  ) { }

  async execute(data: UserDTO): Promise<User> {
    const user = new User(data);

    user.prepareToSaveOnDatabase();

    await this.creator.create(user);

    return user;
  }
}
