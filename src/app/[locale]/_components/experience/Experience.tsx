import styles from '@/app/_styles/experience.module.css';
import { getTimelineFor } from '@/lib/experience';
import TimelineSection from './TimelineSection';

export default async function Experience({
  showDetails = false,
}: {
  showDetails?: boolean;
}) {
  const workSectio = getTimelineFor('work');
  const educationSection = getTimelineFor('education');

  const [work, education] = await Promise.all([workSectio, educationSection]);

  return (
    <section className={styles.section}>
      <TimelineSection
        workData={work}
        educationData={education}
        showDetails={showDetails}
      />
    </section>
  );
}
