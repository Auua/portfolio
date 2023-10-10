import '@/app/_styles/timeline.css';

import Icon from '@/app/_components/common/Icon';
import { months } from '@/app/_utils/stringUtils';
import { Timeline, TimelineExtra } from '@prisma/client';
import { mapRows } from '@/app/_utils/uiUtils';

const WorkExtra = ({ extra }: { extra: TimelineExtra }) => (
  <>
    {extra?.main ? (
      <div aria-label={'Achievements'} className={'achievements'} id={'achievements'}>
        <ul>
          {extra.main.map((task) => (<li key={task}>{task}</li>))}
        </ul>
      </div>
    ) : null}
    {extra?.skills ? (
      <div className={'skills'} aria-label={'Skills'}>
        <Icon icon={['fas', 'code']} />
        <ul>
          {extra.skills.map((skill) => (
            <li key={skill} className={'skill'}>{skill}</li>
          ))}
        </ul>
      </div>) : null }
  </>
);

const EducationExtra = ({ extra }: { extra: TimelineExtra }) => (
  <ul className={'none'}>
    {Object.keys(extra).map((value) => (
      mapRows({ [value]: (extra ?? {})[value as keyof TimelineExtra] })
    ))}
  </ul>
);

const TimelineEvent = ({
  main, end, sub, extra, location, isWorkType,
}: { isWorkType: boolean } & Partial<Timeline>) => (
  <>
    <div className='date'>
      <Icon icon={['fas', `${isWorkType ? 'suitcase' : 'graduation-cap'}`]} />
      {end ? `${months[end.getMonth()]} ${end.getFullYear()}` : 'Present'}
    </div>
    <h3 className='title'>{main}</h3>
    <div className='descr'>
      <p className={'location'}>
        <Icon icon={['fas', 'location']} />
        <span className={'text-bold'}>{sub}</span>{`- ${location}`}
      </p>
      {extra && (isWorkType ? <WorkExtra extra={extra} /> : <EducationExtra extra={extra} />) }
    </div>
  </>
);

export default TimelineEvent;
