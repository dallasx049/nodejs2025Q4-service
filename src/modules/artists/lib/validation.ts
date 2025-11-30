import * as z from 'zod';

export const CreateArtistDtoSchema = z.object({
  name: z.string('Name must be of type String'),
  grammy: z.boolean('Grammy must be of type Boolean'),
});

export const UpdateArtistDtoSchema = CreateArtistDtoSchema.partial();
