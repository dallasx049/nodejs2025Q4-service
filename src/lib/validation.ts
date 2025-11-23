import * as z from 'zod';
import { BadRequestException } from '@nestjs/common';

const UUIDSchema = z.uuid({ version: 'v4', error: 'Invalid UUID' });

export const parseUUID = (id: string): string => {
  const { data, success, error } = UUIDSchema.safeParse(id);

  if (!success) {
    throw new BadRequestException(error.issues[0].message);
  }

  return data;
};

export const parseDto = <T>(schema: z.Schema<T>, dto: T): T => {
  const { data, success, error } = schema.safeParse(dto);

  if (!success) {
    throw new BadRequestException(error.issues[0].message);
  }

  return data;
};
