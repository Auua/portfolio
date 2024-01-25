import { SessionProps } from '@/app/_types/common';
import { getTopSkills } from '@/app/_lib/pages';
import styles from '@/app/home/page.module.css';
import { SkillCard } from '@/app/_components/cards/Card';
import ForwardButton from '@/app/_components/common/ForwardButton';

const TopSkills = async ({ session }: SessionProps) => {
  const { title, sections } = await getTopSkills();
  return (
    <>
      <h2 id={`${title}--title`}>Top skills</h2>
      <div className={styles.main__skills}>
        {sections?.map(({ skills }) =>
          skills?.map((item, index) => (
            <div key={index} className={styles.main__card}>
              <SkillCard key={`${item.title}-card`} skill={item} size={100} />
            </div>
          )),
        )}
      </div>
      <ForwardButton session={session} name={'skills'} />
    </>
  );
};

export default TopSkills;
