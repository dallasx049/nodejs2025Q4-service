import * as z from 'zod';

export const CreateUserDtoSchema = z.object({
  login: z.string('Login must be of type String'),
  password: z.string('Password must be of type String'),
});

export const UpdatePasswordDtoSchema = z.object({
  oldPassword: z.string('OldPassword must be of type String'),
  newPassword: z.string('NewPassword must be of type String'),
});
