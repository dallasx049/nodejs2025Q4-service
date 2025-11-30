import { EnvSchema } from './validation';

export enum ErrorMessage {
  WRONG_PASSWORD = 'Wrong password',
}

export const env = EnvSchema.parse(process.env);
