import '@/app/_styles/project.css';

import Icon from '@/app/_components/common/icons/Icon';
import { removeUnderscore } from '@/app/_utils/stringUtils';
import { ProjectJsonProps } from '@/app/_types/project';

const TechnicalApproach = ({ title, data }: ProjectJsonProps) => {
  return (
    <section className={'section--full'} id={title}>
      <h2>
        <Icon icon={['fas', 'gears']} /> {removeUnderscore(title)}
      </h2>
      <div className={'section'}>
        <div className={'section--selection'}>
          <h3 className={'title'}>Tech stack selection</h3>
          <p>{data['Tech Stack Selection']}</p>
        </div>
        {data?.features ? (
          <div className={'section--features'}>
            <h3 className={'title'}>Features</h3>
            <ul className={'features'}>
              {Object.entries(data.features as Record<string, string>).map(
                ([key, value2]) => (
                  <li key={key}>
                    <input id={key} className="toggle" type="checkbox" />
                    <label htmlFor={key} className="label-toggle">
                      <h4>{removeUnderscore(key)}</h4>
                    </label>
                    <div className={'collapsible__content'}>{value2}</div>
                  </li>
                ),
              )}
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        <h3>Tech stack</h3>
        <div className={'stack'}>
          {Object.entries(data?.stack as Record<string, string>).map(
            ([key, value2]) => (
              <div key={key} className={'tech'}>
                <h4 className={'title title__tech'}>{removeUnderscore(key)}</h4>
                <p className={'inside-item'}>{value2}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnicalApproach;
