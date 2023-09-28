import '@/app/_styles/card.css';

import React from 'react';
import { Timeline, TimelineExtra } from '@prisma/client';
import Icon from '@/app/_components/common/Icon';

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

const mapNestedList = (value: string[]) => (
  <ul className={'squared nested'}>
    {value.map((key) => <li key={key}>{key}</li>)}
  </ul>
);

// eslint-disable-next-line consistent-return
const mapValues = (key: string, value: string | null | string[]) => {
  if (value !== null) {
    return (
      <>
        <span className={'capitalize text-bold'}>{key}</span>:
        {typeof value === 'string' ? value : mapNestedList(value)}
      </>
    );
  }
};

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
              <li key={`${main}_${value}`}>{mapValues(value, (extra ?? {})[value as keyof TimelineExtra])}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  </div>
);

export default TimelineEvent;
