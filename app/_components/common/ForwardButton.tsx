import { SessionProps } from '@/app/_types/common';
import Link from 'next/link';

type ForwardButtonProps = { name: string } & SessionProps;

const ForwardButton = ({ name, session }: ForwardButtonProps) => {
  if (session) {
    return (
      <Link className={'btn btn--margin'} href={`/${name}`}>
        Find out more
      </Link>
    );
  }
  return (
    <Link
      className={'btn btn--margin'}
      href={`api/auth/signin?callbackUrl=/${name}`}
    >
      Sign in to see more
    </Link>
  );
};

export default ForwardButton;
