import Levels from '@/app/_types/levels';
import { Skill } from '@prisma/client';
import styles from '@/app/skills/page.module.css';
import { SkillCard } from '@/app/_components/cards/Card';

export const LevelSection = ({
  level,
  data,
}: {
  level: Levels;
  data: Skill[] | undefined;
}) => (
  <div>
    <div
      className={`${styles['skill-level']}
      ${styles[`skill-level--${level}`]} text-black`}
    >
      {Levels[level]}
    </div>
    <ul className={styles.grid__level}>
      {data?.map((section) => (
        <li key={section.id}>
          <SkillCard key={section.id} skill={section} sizes={'100%'} />
        </li>
      ))}
    </ul>
  </div>
);
