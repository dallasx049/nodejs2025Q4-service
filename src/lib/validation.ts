import { validate } from 'uuid';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { UpdatePasswordDto } from '../modules/users/dto/update-password.dto';
import { CreateArtistDto } from '../modules/artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../modules/artists/dto/update-artist.dto';

export const isValidCreateUserDto = (createUserDto: CreateUserDto): boolean => {
  return (
    createUserDto?.login &&
    createUserDto?.password &&
    typeof createUserDto?.login === 'string' &&
    typeof createUserDto?.password === 'string'
  );
};

export const isValidUpdatePasswordDto = (
  updatePasswordDto: UpdatePasswordDto,
): boolean => {
  return (
    updatePasswordDto?.oldPassword &&
    updatePasswordDto?.newPassword &&
    typeof updatePasswordDto?.oldPassword === 'string' &&
    typeof updatePasswordDto?.newPassword === 'string'
  );
};

export const isValidCreateArtistDto = (
  createArtistDto: CreateArtistDto,
): boolean => {
  return (
    createArtistDto?.name &&
    createArtistDto?.grammy &&
    typeof createArtistDto?.name === 'string' &&
    typeof createArtistDto?.grammy === 'boolean'
  );
};

export const isValidUpdateArtistDto = (
  updateArtistDto: UpdateArtistDto,
): boolean => {
  const validations = [];

  if (updateArtistDto?.name) {
    validations.push(typeof updateArtistDto?.name === 'string');
  }
  if (updateArtistDto?.grammy) {
    validations.push(typeof updateArtistDto?.grammy === 'boolean');
  }

  return validations.every(Boolean);
};

export const isValidUUID = (id: string): boolean => validate(id);
