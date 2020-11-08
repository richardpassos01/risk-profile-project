import { Fetchable } from '../Repository';
import { UserDTO } from '../User';

export default class Fetch {
  constructor(
    private readonly fetcher: Fetchable,
  ) { }

  async execute(
    userId: string,
  ): Promise<UserDTO> {
    return this.fetcher.fetch(userId);
  }
}
