import {
  GenericCreatable,
  GenericFetchable,
} from '../shared/Contracts';

import User, { UserDTO } from './User';

export type Creatable = GenericCreatable<User>;

export type Fetchable = GenericFetchable<string, UserDTO>;
