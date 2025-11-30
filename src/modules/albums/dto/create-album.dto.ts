import * as z from 'zod';
import { CreateAlbumDtoSchema } from '../lib/validation';

export class CreateAlbumDto implements z.infer<typeof CreateAlbumDtoSchema> {
  name!: string;
  year!: number;
  artistId!: string | null;
}
