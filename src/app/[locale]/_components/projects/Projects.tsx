import styles from '@/app/_styles/projects.module.css';
import { getProjectTags, getFilteredProjects } from '@/lib/projects';
import TagRow from './tags/TagRow';
import ProjectList from './ProjectList';

export default async function Projects({
  searchTags,
}: {
  searchTags?: string[];
}) {
  const [tags, projects] = await Promise.all([
    getProjectTags(),
    getFilteredProjects(searchTags),
  ]);

  return (
    <section className={styles.main}>
      <section className={styles.section} id={'tags filter'}>
        <TagRow data={tags} />
      </section>
      <ProjectList projects={projects} />
    </section>
  );
}
