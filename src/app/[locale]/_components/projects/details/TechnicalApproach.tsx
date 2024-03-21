import styles from '@/app/_styles/project.module.css';
import { ProjectJsonProps } from '@/app/_types/project';
import { removeUnderscore } from '@/app/_utils/modification/string';
import { BsDatabaseCheck } from 'react-icons/bs';

const TechnicalApproach = ({ title, data }: ProjectJsonProps) => {
  if (!data) return null;
  const TSS = 'Tech Stack Selection' as keyof typeof data;
  const features = data['features' as keyof typeof data] as
    | Record<string, string>
    | undefined;
  const stack = data['stack' as keyof typeof data] as Record<string, string>;
  return (
    <section className={styles.section_full} id={title}>
      <h2 className={styles.title}>
        <BsDatabaseCheck />
        {removeUnderscore(title)}
      </h2>
      <div className={styles.section}>
        <div className={styles.selection}>
          <h3 className={styles.title}>Tech stack selection</h3>
          <p>{data[TSS]}</p>
        </div>
        {features ? (
          <div className={styles.section_features}>
            <h3 className={styles.title}>Features</h3>
            <ul className={styles.features}>
              {Object.entries(features).map(([key, value2]) => (
                <li key={key}>
                  <input id={key} className={styles.toggle} type={'checkbox'} />
                  <label htmlFor={key} className={styles.label}>
                    <h4>{removeUnderscore(key)}</h4>
                  </label>
                  <div className={styles.collapsible_content}>{value2}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        <h3>Tech stack</h3>
        <div className={styles.stack}>
          {Object.entries(stack).map(([key, value2]) => (
            <div key={key} className={styles.tech}>
              <h4 className={styles.title}>{removeUnderscore(key)}</h4>
              <p className={styles.inside}>{value2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalApproach;
