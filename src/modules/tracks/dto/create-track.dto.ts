import * as z from 'zod';
import { CreateTrackDtoSchema } from '../lib/validation';

export class CreateTrackDto implements z.infer<typeof CreateTrackDtoSchema> {
  name!: string;
  duration!: number;
  artistId!: string | null;
  albumId!: string | null;
}
