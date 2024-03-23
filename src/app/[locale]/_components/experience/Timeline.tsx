import styles from '@/app/_styles/experience.module.css';
import { TimelineSectionProps } from '@/app/_types/data';
import TimelineEvent from './TimelineEvent';
import { EducationExtra, WorkExtra } from './Extras';
import { mapParagraphs } from '@/app/_utils/ui/utils';
import { TranslatorProps } from '@/app/_types/common';

type TimelineProps = {
  showDetails: boolean;
  timelineData: TimelineSectionProps;
  label: string;
  style: string;
  customStyle: React.CSSProperties;
  calculateGridRows: (
    end: Date | null,
    start: Date,
    index: number,
  ) => React.CSSProperties;
  formatPeriod: (date: Date | null) => string;
  Extra: typeof EducationExtra | typeof WorkExtra;
} & TranslatorProps;

const Description = ({
  subtitle,
  content,
  tag,
}: {
  subtitle: string;
  content: string;
  tag: string;
}) => (
  <div
    className={`${styles.history} ${styles[`${tag}_history`]} description`}
    id={tag}
  >
    <h2 className={styles.description_title}>{subtitle}</h2>
    <div>{mapParagraphs(content)}</div>
  </div>
);

export const Timeline = ({
  showDetails,
  timelineData,
  label,
  style,
  customStyle,
  calculateGridRows,
  formatPeriod,
  t,
  Extra,
}: TimelineProps) => {
  if (!timelineData) {
    return <p>{t('notFound')}</p>;
  }
  return (
    <>
      {showDetails && <Description {...timelineData} />}
      <ul
        aria-label={t(label)}
        className={`${styles.list} ${style}`}
        style={customStyle}
      >
        {timelineData.timeline.map(
          ({ id, start, end, location, main, sub, extra }, index) => (
            <li
              key={id}
              className={styles.item}
              style={calculateGridRows(end, start, index)}
            >
              <TimelineEvent
                {...{
                  location,
                  main,
                  sub,
                  formattedEndDate: formatPeriod(end),
                }}
              >
                {extra && (
                  <Extra
                    extra={extra}
                    achievements={t('achievements')}
                    skills={t('skills')}
                  />
                )}
              </TimelineEvent>
            </li>
          ),
        )}
      </ul>
    </>
  );
};
