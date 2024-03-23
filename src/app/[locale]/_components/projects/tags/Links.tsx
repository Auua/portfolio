import styles from '@/app/_styles/projects.module.css';
import { ProjectUrl } from '@prisma/client';
import LinkRow from './LinkRow';
import TagRow from './TagRow';

const Links = ({ url, tags }: { url: ProjectUrl | null; tags: string[] }) => {
  return (
    <section className={styles.column} id={'tags'}>
      {url ? <LinkRow url={url} /> : null}
      {tags ? <TagRow data={tags} /> : null}
    </section>
  );
};
export default Links;
