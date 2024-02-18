import { object, string, toTrimmed, toCustom, nonNullable } from 'valibot';

const sanitize = (txt: string) => txt.replace(/[^a-zA-Z0-9 ,.\-+?'`]/g, '**');

export const LoginSchema = object({
  username: nonNullable(
    string([toCustom((txt) => sanitize(txt)), toTrimmed()]),
  ),
  password: string([toCustom((txt) => sanitize(txt)), toTrimmed()]),
});
