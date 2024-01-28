import { getServerSession } from 'next-auth';
import Home from './_components/Home';
import options from '@/app/api/auth/[...nextauth]/options';

export default async function IndexPage() {
  const session = await getServerSession(options);
  return <Home session={session} />;
}
