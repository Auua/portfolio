'use server';
import { signOut } from '@/app/_utils/auth/config';
import { isRedirectError } from 'next/dist/client/components/redirect';

export default async function sendForm(locale: string) {
  try {
    await signOut({
      redirectTo: `/${locale}`,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('actionlogout', error);
    return 'error';
  }
}
