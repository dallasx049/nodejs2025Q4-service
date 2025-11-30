import * as z from 'zod';
import { UpdateAlbumDtoSchema } from '../lib/validation';

export class UpdateAlbumDto implements z.infer<typeof UpdateAlbumDtoSchema> {
  name!: string;
  year!: number;
  artistId!: string | null;
}
