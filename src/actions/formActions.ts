'use server';
import { ContactFormData, FormResponse } from '@/app/_types/form';
import {
  errorResponse,
  successResponse,
} from '@/app/_utils/builder/apiResponseBuilder';
import { FormSchema } from '@/app/_utils/schemas/FormSchema';
import { parse, ValiError, flatten } from 'valibot';

const formUrl = process.env.DISCORD_WEBHOOK || '';

export default async function sendForm(
  prevState: FormResponse<ContactFormData>,
  formData: FormData,
): Promise<FormResponse<ContactFormData>> {
  try {
    const { email, name, company, message } = parse(
      FormSchema,
      Object.fromEntries(formData.entries()),
    );

    const data = {
      username: 'portfolio',
      avatar_url: '',
      embeds: [
        {
          fields: [
            {
              name: 'Name',
              value: name,
            },
            {
              name: 'Email',
              value: email,
            },
            {
              name: 'Company',
              value: company,
            },
          ],
        },
      ],
      content: message,
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
    return successResponse<ContactFormData, undefined>(
      undefined,
      'thankYouSuccess',
    );
  } catch (error) {
    if (error instanceof ValiError) {
      console.error(flatten(error));
      return errorResponse<ContactFormData>(undefined, flatten(error).nested);
    } else {
      console.error(error);
      return errorResponse<ContactFormData>('error', undefined);
    }
  }
}
