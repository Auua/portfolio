import Icon from '@/app/_components/common/Icon';
import Link from 'next/link';
import { SessionProps } from '@/app/_types/common';

export default async function AuthStatusButton({ session }: SessionProps) {
  if (session) {
    return (
      <Link href={'/api/auth/signout'}>
        <Icon icon={['fas', 'arrow-right-to-bracket']} /> Sign out
      </Link>
    );
  }
  return (
    <Link href={'/api/auth/signin'}>
      <Icon icon={['fas', 'arrow-right-from-bracket']} /> Sign in
    </Link>
  );
}
