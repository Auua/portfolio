import styles from '@/app/_styles/experience.module.css';
import { NestedList } from '@/app/_utils/ui/utils';
import { TimelineExtra } from '@prisma/client';

export const WorkExtra = ({
  extra,
  achievements,
  skills,
}: {
  extra: TimelineExtra;
  achievements: string;
  skills: string;
}) => (
  <>
    {extra?.main ? (
      <div
        aria-label={achievements}
        className={styles.achievements}
        id={'achievements'}
      >
        <NestedList data={extra.main} />
      </div>
    ) : null}
    {extra?.skills ? (
      <div className={styles.skills} aria-label={skills}>
        <NestedList data={extra.skills} styles={styles.skill} />
      </div>
    ) : null}
  </>
);

export const EducationExtra = ({ extra }: { extra: TimelineExtra }) => (
  <NestedList data={extra} styles={styles.extra} />
);
