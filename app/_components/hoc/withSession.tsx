import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { NextComponentType, NextPageContext } from 'next';

export const withSession = <IP extends object, P extends object>(
  name: string,
  PageComponent: NextComponentType<NextPageContext, IP, P>,
) => {
  return async (props: P) => {
    const session = await getServerSession(options as never);

    if (!session) {
      return redirect(`api/auth/signin?callbackUrl=/${name}`);
    }

    return <PageComponent {...props} />;
  };
};
