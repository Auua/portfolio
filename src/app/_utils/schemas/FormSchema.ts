import {
  email,
  minLength,
  object,
  string,
  toTrimmed,
  includes,
  toCustom,
  nonNullable,
} from 'valibot';

const sanitize = (txt: string) => txt.replace(/[^a-zA-Z0-9 ,.\-+?'`]/g, '**');
//(t: (arg: string) => string) =>
export const FormSchema = object({
  email: nonNullable(string([email('validEmail'), toTrimmed()])),
  name: string([
    minLength(3, 'fullNameLength'),
    includes(' ', 'fullName'),
    toCustom((txt) => sanitize(txt)),
    toTrimmed(),
  ]),
  company: string([
    minLength(2, 'companyName'),
    toCustom((txt) => sanitize(txt)),
    toTrimmed(),
  ]),
  message: string([
    minLength(3, 'messageLength'),
    toCustom((txt) => sanitize(txt)),
    toTrimmed(),
  ]),
});
