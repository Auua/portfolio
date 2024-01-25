import { Metadata } from 'next';
import { Page } from '@prisma/client';
import { getFullPage } from '@/app/_lib/pages';
import SkillsPage from '@/app/skills/_components/SkillsPage';
import { withSession } from '../_components/hoc/withSession';

const fetchData = () => getFullPage('skills');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const Skills = async () => {
  const { title, desc, sections } = await fetchData();
  return <SkillsPage title={title} desc={desc} sections={sections} />;
};
export default withSession('skills', Skills);
