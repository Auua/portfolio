import Link from 'next/link';
import { SessionProps } from '@/app/_types/common';

export default async function AuthSwitch({ session }: SessionProps) {

  if (session) {
    return <Link href={'/api/auth/signout'}>Sign out</Link>;
  }
  return <Link href={'/api/auth/signin'}>Sign in</Link>;
}
