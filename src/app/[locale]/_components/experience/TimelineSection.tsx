import styles from '@/app/_styles/experience.module.css';
import { TimelineSectionProps } from '@/app/_types/data';
import { useFormatter, useTranslations } from 'next-intl';
import { EducationExtra, WorkExtra } from './Extras';
import { Timeline } from './Timeline';

const TimelineSection = ({
  workData,
  educationData,
  showDetails,
}: {
  workData: TimelineSectionProps;
  educationData: TimelineSectionProps;
  showDetails: boolean;
}) => {
  const format = useFormatter();
  const t = useTranslations('Experience');

  const work = workData?.timeline ?? [];
  const education = educationData?.timeline ?? [];

  const firstWork = work?.slice(-1)[0]?.end?.getFullYear() ?? 2018;
  const currentYear = new Date().getFullYear();
  const workYears = (work[0]?.end?.getFullYear() ?? currentYear) - firstWork;

  const educationEventsBeforeWork = education?.filter(
    (event) => (event.end?.getFullYear() ?? 2018) < firstWork,
  ).length;

  const customStyle = {
    '--grid-rows': workYears + educationEventsBeforeWork,
  } as React.CSSProperties;

  const calculateWorkGridRows = (end: Date | null, start: Date) => {
    const endPoint = currentYear - (end?.getFullYear() ?? currentYear) + 1;
    const startPoint =
      endPoint + (end?.getFullYear() ?? currentYear) - start.getFullYear();
    return {
      '--grid-row-end': endPoint,
      '--grid-row-start': startPoint,
    } as React.CSSProperties;
  };

  const calculateEducationGridRows = (
    end: Date | null,
    start: Date,
    index: number,
  ) => {
    if (
      educationEventsBeforeWork > 0 &&
      education.length - index <= educationEventsBeforeWork
    ) {
      return {
        '--grid-row': -(education.length - index),
      } as React.CSSProperties;
    }
    return {
      '--grid-row': currentYear - (end?.getFullYear() ?? currentYear) + 1,
    } as React.CSSProperties;
  };

  const formatPeriod = (end: Date | null) => {
    if (end) {
      return format.dateTime(end, { year: 'numeric', month: 'short' });
    }
    return t('present');
  };

  return (
    <div className={styles.timeline}>
      <Timeline
        showDetails={showDetails}
        timelineData={workData}
        label={'work-experience'}
        style={styles.work}
        customStyle={customStyle}
        calculateGridRows={calculateWorkGridRows}
        formatPeriod={formatPeriod}
        t={t}
        Extra={WorkExtra}
      />
      <Timeline
        showDetails={showDetails}
        timelineData={educationData}
        label={'education'}
        style={styles.education}
        customStyle={customStyle}
        calculateGridRows={calculateEducationGridRows}
        formatPeriod={formatPeriod}
        t={t}
        Extra={EducationExtra}
      />
    </div>
  );
};

export default TimelineSection;
