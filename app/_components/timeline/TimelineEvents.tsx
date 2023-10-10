import '@/app/_styles/timeline.css';

import React from 'react';
import { Section, Timeline } from '@prisma/client';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import TimelineEvent from '@/app/_components/timeline/TimelineEvent';

const Description = ({ title, description, tag }: Record<string, string>) => (
  <div className={`${tag}_history description page-item`} id={tag}>
    <h2 className={'description-title'}>{title}</h2>
    <div>{mapParagraphs(description)}</div>
  </div>
);

type TimelineEventProps = Section & { timeline: Timeline[] };

const TimeLine = ({ workData, educationData }: {
  workData: TimelineEventProps, educationData: TimelineEventProps
}) => {
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
    const startPoint = endPoint + (end?.getFullYear() ?? currentYear) - start.getFullYear();
    return ({
      '--grid-row-end': endPoint,
      '--grid-row-start': startPoint,
    });
  };

  const calculateEducationGridRows = (end: Date | null, index: number) => {
    if (educationEventsBeforeWork > 0 && education.length - index <= educationEventsBeforeWork) {
      return { '--grid-row': -(education.length - index) };
    }
    return ({ '--grid-row': currentYear - (end?.getFullYear() ?? currentYear) + 1 });
  };

  return (
    <div className={'timeline'}>
      <Description title={workData.subtitle}
                   description={workData.content}
                   tag={workData.tag} />
      <ul aria-label={'Work Experience'} className={'timeline-list timeline__work'} style={customStyle}>
        {work.map(({
          id, start, end, location, main, sub, extra,
        }) => (
          <li key={id}
              className={'timeline-list__item'}
              style={calculateWorkGridRows(end, start) as React.CSSProperties}>
            <TimelineEvent {...{
              end, location, main, sub, extra, isWorkType: true,
            }} />
          </li>))}
      </ul>
      <Description title={educationData.subtitle}
                   description={educationData.content}
                   tag={educationData.tag} />
      <ul aria-label={'Education'} className={'timeline-list timeline__education'} style={customStyle}>
        {education.map(({
          id, end, location, main, sub, extra,
        }, index) => (
          <li key={id}
              className={'timeline-list__item'}
              style={calculateEducationGridRows(end, index) as React.CSSProperties}>
              <TimelineEvent {...{
                main, end, sub, location, extra, isWorkType: false,
              }} />
          </li>))}
      </ul>
    </div>);
};

export default TimeLine;
