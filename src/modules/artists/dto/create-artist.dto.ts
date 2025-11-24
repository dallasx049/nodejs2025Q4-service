import * as z from 'zod';
import { CreateArtistDtoSchema } from '../lib/validation';

export class CreateArtistDto implements z.infer<typeof CreateArtistDtoSchema> {
  name!: string;
  grammy!: boolean;
}
