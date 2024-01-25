import { Page } from '@prisma/client';
import { getPage } from '@/app/_lib/pages';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { Session } from 'next-auth';
import { Metadata } from 'next';
import { Main } from './_components/Main';

const fetchData = () => getPage('home');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();
  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

export default async function Home() {
  const session: Session | null = await getServerSession(options as never);
  const homePageData: Page = await fetchData();

  return <Main session={session} data={homePageData} />;
}
