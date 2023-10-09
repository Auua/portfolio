import '@/app/_styles/others.css';

import React from 'react';
import { OtherAchievement, Section } from '@prisma/client';
import { months } from '@/app/_utils/stringUtils';

const dates = (start: Date, end: Date | null) => {
  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  const endDate = end ? ` - ${months[end.getMonth()]} ${end.getFullYear()}` : '';

  return `${startMonth} ${startYear}${endDate}`;
};

const setField = (classStyle: string, value: string | null) => (value ? <p className={classStyle}>{value}</p> : '');

type AchievementsProps = Section & { others: OtherAchievement[] };

const Others = ({ otherData }: { otherData: AchievementsProps }) => {
  const groupedElements = new Map();

  otherData.others.forEach((element) => {
    const { type } = element;
    if (!groupedElements.has(type)) {
      groupedElements.set(type, []);
    }
    groupedElements.get(type).push(element);
  });

  return (
    <div className={'other'}>
      <h2>Other stuff</h2>
      <div className={'other-description'}>{otherData.content}</div>
      <div className={'other__categories'}>
      {Array.from(groupedElements).map(([type, elements]) => (
        <div key={type} className={`${type} other__category`} id={type}>
          <h3 className={'other__category--title'}>{type}</h3>
          <ul>
            {elements.map((element: OtherAchievement) => (
              <li key={element.id} className={'other__item'}>
                <h4>{element.title}</h4>
                <div className={'other__item--date'}>
                  {dates(element.date, element.validity)}
                </div>
                <div className={'other__item--content'}>
                  {setField('excerpt', element.excerpt)}
                  {setField('note', element.note)}
                  {setField('desc', element.desc)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>);
};

export default Others;
