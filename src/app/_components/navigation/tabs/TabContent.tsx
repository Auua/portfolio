'use client';
import styles from '@/app/_styles/tabs.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import TabBar from './TabBar';

export default function TabContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  if (segment !== '__DEFAULT__') {
    return null;
  }
  return (
    <>
      <div className={styles.divider} />
      <TabBar />
      <section className={styles.selected}>{children}</section>
    </>
  );
}
