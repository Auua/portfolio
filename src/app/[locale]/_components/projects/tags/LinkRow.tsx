import styles from '@/app/_styles/project.module.css';
import { ProjectUrl } from '@prisma/client';
import { Link } from '@/i18n';

/*
const Icons: Record<string, IconProp> = {
  github: ['fab', 'github'],
  other: ['fas', 'circle-question'],
  demo: ['fas', 'globe'],
};
<Icon icon={Icons[key]} />{' '}
*/

const LinkRow = ({ url }: { url: ProjectUrl }) => (
  <div className={styles.row}>
    {Object.entries(url).map(([key, value], index) => (
      <div key={index}>
        <Link key={index} href={value as string}>
          {key.toUpperCase()}
        </Link>
      </div>
    ))}
  </div>
);

export default LinkRow;
