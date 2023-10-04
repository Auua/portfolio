import '@/app/_styles/card.css';

import React from 'react';
import { Timeline, TimelineExtra } from '@prisma/client';
import Icon from '@/app/_components/common/Icon';
import { mapRows } from '@/app/_utils/uiUtils';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TimelineEvent = ({
  end,
  location,
  main,
  sub,
  extra,
}: Partial<Timeline>) => (
  <div>
    <div className={'card--timeline-title'}>
      <div className={'timeline-title'}>
        <Icon icon={['fas', 'calendar']} className={'padded-right'} />
        <span>
        {end ? `${months[end.getMonth()]} ${end.getFullYear()}` : 'Present'}
      </span>
      </div>
    </div>
    <div className={'card card--timeline'}>
      <h4>{main}</h4>
      <div>
        <p>
          <Icon icon={['fas', 'location']} /> <span className={'text-bold'}>{sub}</span>{` - ${location}`}
        </p>
        {extra ? (
          <ul>
            {Object.keys(extra).map((value) => (
              mapRows({ [value]: (extra ?? {})[value as keyof TimelineExtra] })
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  </div>
);

export default TimelineEvent;
