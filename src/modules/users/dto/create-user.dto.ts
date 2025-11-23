import * as z from 'zod';
import { CreateUserDtoSchema } from '../lib/validation';

export class CreateUserDto implements z.infer<typeof CreateUserDtoSchema> {
  login: string;
  password: string;
}
