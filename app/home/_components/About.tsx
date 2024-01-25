import { SessionProps } from '@/app/_types/common';
import { Page } from '@prisma/client';
import { getPage } from '@/app/_lib/pages';
import styles from '@/app/home/page.module.css';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import ForwardButton from '@/app/_components/common/ForwardButton';

const About = async ({ session }: SessionProps) => {
  const { title, desc }: Page = await getPage('about');
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div className={styles.description}>
        {mapParagraphs(desc)}
        <ForwardButton session={session} name={'about'} />
      </div>
    </>
  );
};

export default About;
