import styles from '@/app/_styles/project.module.css';
import { BsPersonHearts } from 'react-icons/bs';

import { ProjectJsonProps } from '@/app/_types/project';
import { removeUnderscore } from '@/app/_utils/modification/string';

const UserBenefits = ({ title, data }: ProjectJsonProps) => (
  <section className={styles.section_half} id={title}>
    <h2 className={styles.title}>
      <BsPersonHearts />
      {removeUnderscore(title)}
    </h2>
    {Object.entries(data as Record<string, string>).map(([key, value]) => (
      <div key={key} className={styles.benefit}>
        <h3 className={styles.title}>{key}</h3>
        <div>{value}</div>
      </div>
    ))}
  </section>
);

export default UserBenefits;
