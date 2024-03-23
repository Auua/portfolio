import styles from '@/app/_styles/experience.module.css';
import { Timeline } from '@prisma/client';

const TimelineEvent = ({
  main,
  sub,
  location,
  formattedEndDate,
  children,
}: Partial<Timeline> & {
  formattedEndDate?: string;
  children?: React.ReactNode;
}) => (
  <>
    <div className={styles.date}>{formattedEndDate}</div>
    <h3 className={styles.title}>{main}</h3>
    <div className={styles.desc}>
      <p className={styles.location}>
        <span className={'text-bold'}>{sub}</span>
        {`- ${location}`}
      </p>
      {children}
    </div>
  </>
);

export default TimelineEvent;
