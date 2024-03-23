'use server';
import { LoginFormData, FormResponse } from '@/app/_types/form';
import {
  errorResponse,
  successResponse,
} from '@/app/_utils/mapper/apiResponseBuilder';
import { LoginSchema } from '@/app/_utils/schemas/LoginSchema';
import { parse, ValiError, flatten } from 'valibot';
import { signIn } from '@/app/_utils/auth/config';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export default async function sendForm(
  prevState: FormResponse<LoginFormData>,
  formData: FormData,
) {
  try {
    const { username, password } = parse(
      LoginSchema,
      Object.fromEntries(formData.entries()),
    );
    await signIn('credentials', {
      username,
      password,
    });
    return successResponse<LoginFormData, undefined>(undefined, '');
  } catch (error) {
    if (error instanceof ValiError) {
      console.error(flatten(error));
      return errorResponse<LoginFormData>('', flatten(error).nested);
    } else if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return errorResponse<LoginFormData>('invalid', undefined);
        default:
          return errorResponse<LoginFormData>('error', undefined);
      }
    } else {
      if (isRedirectError(error)) {
        throw error;
      }
      console.error(error);
      return errorResponse<LoginFormData>('error', undefined);
    }
  }
}
