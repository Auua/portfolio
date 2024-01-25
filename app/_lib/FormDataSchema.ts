import { string, object } from 'zod';

const sanitize = (txt: string) => txt.replace(/[^a-zA-Z0-9 ,.\-+?'`]/g, '**');

const formSchema = object({
  name: string()
    .min(3, { message: 'Please enter Your full name' })
    .includes(' ', { message: 'Please enter Your full name' })
    .transform((txt) => sanitize(txt)),
  company: string()
    .min(2, { message: 'Please enter Your company name' })
    .trim()
    .transform((txt) => sanitize(txt)),
  message: string()
    .min(2, { message: 'Please enter Your message' })
    .transform((txt) => sanitize(txt)),
  email: string().email('Please enter a valid email address').trim(),
});

export default formSchema;
