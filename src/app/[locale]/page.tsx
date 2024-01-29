import { getServerSession } from 'next-auth';
import Home from './_components/Home';
import options from '@/app/api/auth/[...nextauth]/options';
import { getTopSkills } from '@/_lib/skills';

export default async function IndexPage() {
  const skillData = getTopSkills();
  const sessionData = getServerSession(options);

  const [skills, session] = await Promise.all([skillData, sessionData]);

  return <Home session={session} skills={skills} />;
}
