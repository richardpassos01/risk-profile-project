import {
  GenericCreatable,
  GenericFetchable,
} from '../shared/Contracts';

import User from './User';

export type Creatable = GenericCreatable<User>;

export type Fetchable = GenericFetchable<string, User>;
