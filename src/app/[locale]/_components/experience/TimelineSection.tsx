import styles from '@/app/_styles/experience.module.css';
import { TimelineSectionProps } from '@/app/_types/data';
import TimelineEvent from './TimelineEvent';
import { useFormatter, useTranslations } from 'next-intl';
import { EducationExtra, WorkExtra } from './Extras';
import { mapParagraphs } from '@/app/_utils/ui/utils';

const Description = ({ subtitle, content, tag }: TimelineSectionProps) => (
  <div
    className={`${styles.history} ${styles[`${tag}_history`]} description`}
    id={tag}
  >
    <h2 className={styles.description_title}>{subtitle}</h2>
    <div>{mapParagraphs(content)}</div>
  </div>
);

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

  const { timeline: work } = workData;
  const { timeline: education } = educationData;

  const firstWork = work?.slice(-1)[0].end?.getFullYear() ?? 2018;
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
    };
  };

  const calculateEducationGridRows = (end: Date | null, index: number) => {
    if (
      educationEventsBeforeWork > 0 &&
      education.length - index <= educationEventsBeforeWork
    ) {
      return { '--grid-row': -(education.length - index) };
    }
    return {
      '--grid-row': currentYear - (end?.getFullYear() ?? currentYear) + 1,
    };
  };

  const formatPeriod = (end: Date | null) => {
    if (end) {
      return format.dateTime(end, { year: 'numeric', month: 'short' });
    }
    return t('present');
  };

  return (
    <div className={styles.timeline}>
      {showDetails && <Description {...workData} />}
      <ul
        aria-label={t('work-experience')}
        className={`${styles.list} ${styles.work}`}
        style={customStyle}
      >
        {work.map(({ id, start, end, location, main, sub, extra }) => (
          <li
            key={id}
            className={styles.item}
            style={calculateWorkGridRows(end, start) as React.CSSProperties}
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
                <WorkExtra
                  extra={extra}
                  achievements={t('achievements')}
                  skills={t('skills')}
                />
              )}
            </TimelineEvent>
          </li>
        ))}
      </ul>
      {showDetails && <Description {...educationData} />}
      <ul
        aria-label={t('education')}
        className={`${styles.list} ${styles.education}`}
        style={customStyle}
      >
        {education.map(({ id, end, location, main, sub, extra }, index) => (
          <li
            key={id}
            className={styles.item}
            style={
              calculateEducationGridRows(end, index) as React.CSSProperties
            }
          >
            <TimelineEvent
              {...{
                main,
                sub,
                location,
                formattedEndDate: formatPeriod(end),
              }}
            >
              {extra && <EducationExtra extra={extra} />}
            </TimelineEvent>
          </li>
        ))}
      </ul>
    </div>
  );
};
/*
<div className={'timeline'}>

  <ul
    aria-label={'Work Experience'}
    className={'timeline-list timeline__work'}
    style={customStyle}
  >
    {work.map(({ id, start, end, location, main, sub, extra }) => (
      <li
        key={id}
        className={'timeline-list__item'}
        style={calculateWorkGridRows(end, start) as React.CSSProperties}
      >
        <TimelineEvent
          {...{
            end,
            location,
            main,
            sub,
            extra,
            isWorkType: true,
          }}
        />
      </li>
    ))}
  </ul>
  <Description
    title={educationData.subtitle}
    description={educationData.content}
    tag={educationData.tag}
  />
  <ul
    aria-label={'Education'}
    className={'timeline-list timeline__education'}
    style={customStyle}
  >
    {education.map(({ id, end, location, main, sub, extra }, index) => (
      <li
        key={id}
        className={'timeline-list__item'}
        style={
          calculateEducationGridRows(end, index) as React.CSSProperties
        }
      >
        <TimelineEvent
          {...{
            main,
            end,
            sub,
            location,
            extra,
            isWorkType: false,
          }}
        />
      </li>
    ))}
  </ul>
</div>
);
};
*/

export default TimelineSection;
