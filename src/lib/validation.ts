import { validate } from 'uuid';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { User } from '../modules/users/interfaces/user.interface';
import { UpdatePasswordDto } from '../modules/users/dto/update-password.dto';

export const isValidCreateUserDto = (createUserDto: CreateUserDto): boolean => {
  return (
    createUserDto.login &&
    createUserDto.password &&
    typeof createUserDto.login === 'string' &&
    typeof createUserDto.password === 'string'
  );
};

export const isValidUpdatePasswordDto = (
  updatePasswordDto: UpdatePasswordDto,
): boolean => {
  return (
    updatePasswordDto.oldPassword &&
    updatePasswordDto.newPassword &&
    typeof updatePasswordDto.oldPassword === 'string' &&
    typeof updatePasswordDto.newPassword === 'string'
  );
};

export const isValidUserId = (id: User['id']): boolean => validate(id);
