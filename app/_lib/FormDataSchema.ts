import { z } from 'zod';

const sanitize = (string: string) =>
  string.replace(/[^a-zA-Z0-9 ,.\-+?'`]/g, '**');

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please enter Your full name' })
    .includes(' ', { message: 'Please enter Your full name' })
    .transform((string) => sanitize(string)),
  company: z
    .string()
    .min(2, { message: 'Please enter Your company name' })
    .trim()
    .transform((string) => sanitize(string)),
  message: z
    .string()
    .min(2, { message: 'Please enter Your message' })
    .transform((string) => sanitize(string)),
  email: z.string().email('Please enter a valid email address').trim(),
});

export default formSchema;
