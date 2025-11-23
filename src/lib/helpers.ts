import { User } from '../modules/users/interfaces/user.interface';

export const getUserWithoutPassword = ({
  id,
  version,
  createdAt,
  updatedAt,
  login,
}: User): Omit<User, 'password'> => ({
  id,
  version,
  createdAt,
  updatedAt,
  login,
});
