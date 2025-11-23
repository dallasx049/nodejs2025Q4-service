import * as z from 'zod';
import { UpdatePasswordDtoSchema } from '../lib/validation';

export class UpdatePasswordDto
  implements z.infer<typeof UpdatePasswordDtoSchema>
{
  oldPassword: string; // previous password
  newPassword: string; // new password
}
