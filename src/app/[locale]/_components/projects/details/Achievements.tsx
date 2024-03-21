import styles from '@/app/_styles/project.module.css';
import { ProjectArrayProps } from '@/app/_types/project';
import { NestedList } from '@/app/_utils/ui/utils';
import { BsAward } from 'react-icons/bs';

const Achievements = ({ title, data }: ProjectArrayProps) => (
  <section className={styles.section_half} id={'achievements'}>
    <h2 className={styles.title}>
      <BsAward />
      {title}
    </h2>
    <div className={styles.content}>
      <NestedList data={data} styles={styles.achievements} />
    </div>
  </section>
);

export default Achievements;
