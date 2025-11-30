import * as z from 'zod';
import { UpdateTrackDtoSchema } from '../lib/validation';

export class UpdateTrackDto implements z.infer<typeof UpdateTrackDtoSchema> {
  name!: string;
  duration!: number;
  artistId!: string | null;
  albumId!: string | null;
}
