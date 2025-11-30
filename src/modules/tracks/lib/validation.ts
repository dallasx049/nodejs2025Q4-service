import * as z from 'zod';

export const CreateTrackDtoSchema = z.object({
  name: z.string('Name must be of type String'),
  artistId: z.nullable(z.string('ArtistId must be of type String | Null')),
  albumId: z.nullable(z.string('AlbumId must be of type String | Null')),
  duration: z.number('Duration must of type Number'),
});

export const UpdateTrackDtoSchema = CreateTrackDtoSchema.partial();
