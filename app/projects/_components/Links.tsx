import styles from '@/app/projects/page.module.css';
import LinkRow from '@/app/projects/_components/LinkRow';
import TagRow from '@/app/projects/_components/TagRow';
import { ProjectUrl } from '@prisma/client';

const Links = ({ url, tags }: { url: ProjectUrl | null; tags: string[] }) => {
  return (
    <section className={styles.article__column} id={'tags'}>
      {url ? <LinkRow url={url} /> : null}
      {tags ? <TagRow data={tags} /> : null}
    </section>
  );
};
export default Links;
