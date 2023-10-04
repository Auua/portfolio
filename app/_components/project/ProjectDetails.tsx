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
      <p>{data['Tech Stack Selection']}</p>
      {data?.features ? <div className={'section--two-thirds'}>
        <h3>Features</h3>
        <ul>
          {Object.entries(data.features as Record<string, string>).map(([key, value2]) => (
            <li key={key}>
              <h4>
                {key.replace('_', ' ')}
              </h4>
              <p>{value2}</p>
            </li>
          ))}
        </ul>
      </div> : null}
    </div>
    <div>
      <h3>Tech stack</h3>
      <div className={'grid'}>
        {Object.entries(data.stack as Record<string, string>).map(([key, value2]) => (
          <div key={key}>
            <h4>{key.replace('_', ' ')}</h4>
            <p className={'inside-item'}>{value2}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const UserBenefits = ({ title, data }: ProjectProps) => (
  <section className={'section--half'} id={title}>
    <h2><Icon icon={['fas', 'users-viewfinder']} /> {title.replace('_', ' ')}</h2>
    {Object.entries(data as Record<string, string>).map(([key, value]) => (
      <>
        <h3>{key}</h3>
        <p>{value}</p>
      </>
    ))}
  </section>
);

export const Achievements = ({ title, data }: ProjectProps) => (
  <section className={'section--half'} id={'achievements'}>
    <h2><Icon icon={['fas', 'award']} /> {title}</h2>
    <div>{mapValues(title, data)}</div>
  </section>
);
