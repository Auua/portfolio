import '@/app/_styles/project.css';

import { mapValues } from '@/app/_utils/uiUtils';
import Icon from '@/app/_components/common/Icon';

type ProjectProps = {
  title: string;
  data: any;
};

export const TechnicalApproach = ({ title, data }: ProjectProps) => (
  <section className={'section--full'} id={title}>
    <h2><Icon icon={['fas', 'gears']} /> {title.replace('_', ' ')}</h2>
    <div className={'section'}>
      <div className={'selection'}>
        <h3 className={'title'}>Tech stack selection</h3>
        <p>{data['Tech Stack Selection']}</p>
      </div>
      {data?.features ? <div className={'section--two-thirds'}>
        <h3 className={'title'}>Features</h3>
        <ul className={'features'}>
          {Object.entries(data.features as Record<string, string>).map(([key, value2]) => (
            <li key={key}>
              <input id={key} className='toggle' type='checkbox' />
              <label htmlFor={key} className='label-toggle'>
                <h4>
                  {key.replace('_', ' ')}
                </h4>
              </label>
              <div className={'collapsible__content'}>
                {value2}
              </div>
            </li>
          ))}
        </ul>
      </div> : null}
    </div>
    <div>
      <h3>Tech stack</h3>
      <div className={'stack'}>
        {Object.entries(data.stack as Record<string, string>).map(([key, value2]) => (
          <div key={key} className={'tech'}>
            <h4 className={'title title__tech'}>{key.replace('_', ' ')}</h4>
            <p className={'inside-item'}>{value2}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const UserBenefits = ({ title, data }: ProjectProps) => (
  <section className={'section--half'} id={title}>
    <h2 className={'title'}><Icon icon={['fas', 'users-viewfinder']} /> {title.replace('_', ' ')}</h2>
    {Object.entries(data as Record<string, string>).map(([key, value]) => (
      <div key={key} className={'benefit'}>
        <h3 className={'title'}>{key}</h3>
        <div>{value}</div>
      </div>
    ))}
  </section>
);

export const Achievements = ({ title, data }: ProjectProps) => (
  <section className={'section--half'} id={'achievements'}>
    <h2 className={'title'}><Icon icon={['fas', 'award']} /> {title}</h2>
    <div className={'content'}>{mapValues(title, data)}</div>
  </section>
);
