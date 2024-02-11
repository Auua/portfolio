import Home from './_components/Home';
import { getTopSkills } from '@/lib/skills';

export default async function IndexPage() {
  const skills = await getTopSkills();

  return <Home skills={skills} />;
}
