import * as z from 'zod';
import { UpdateArtistDtoSchema } from '../lib/validation';

export class UpdateArtistDto implements z.infer<typeof UpdateArtistDtoSchema> {
  name: string;
  grammy: boolean;
}
