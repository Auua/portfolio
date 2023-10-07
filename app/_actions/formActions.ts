'use server';

import formDataSchema from '@/app/_lib/FormDataSchema';
import { z } from 'zod';

const formUrl = process.env.DISCORD_WEBHOOK || '';

type Inputs = z.infer<typeof formDataSchema>;

export default async function sendForm(formData: Inputs) {
  try {
    const validatedData = formDataSchema.parse(formData);

    const data = {
      username: 'portfolio',
      avatar_url: '',
      embeds: [
        {
          fields: [
            {
              name: 'Name',
              value: validatedData.name,
            },
            {
              name: 'Email',
              value: validatedData.email,
            },
            {
              name: 'Company',
              value: validatedData.company,
            },
          ],
        },
      ],
      content: validatedData.message,
    };
    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return { error: false, message: 'Thank You for Your message. I will contact You soon.' };
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(error);
    return { error: true, message: 'Something went wrong. Please try again later.' };
  }
}
