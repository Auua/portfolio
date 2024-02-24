import { auth } from '@/app/_utils/auth/config';
import TabContent from './TabContent';

export default async function Tabs({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) return null;

  const session = await auth();

  if (!session) return null;

  return <TabContent>{children}</TabContent>;
}
