import * as z from 'zod';

export const CreateAlbumDtoSchema = z.object({
  name: z.string('Name must be of type String'),
  year: z.number('Year must be of type Number'),
  artistId: z.nullable(z.string('Artist must be of type String | Null')),
});

export const UpdateAlbumDtoSchema = CreateAlbumDtoSchema.partial();
