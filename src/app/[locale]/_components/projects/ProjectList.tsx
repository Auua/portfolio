import styles from '@/app/_styles/projects.module.css';
import { Project } from '@prisma/client';
import { ProjectCard } from './ProjectCard';

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <section className={styles.projects} id={'projects'}>
      <h2 className={'screen-reader-only'}>Project List</h2>
      {projects.length ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div>No projects found...</div>
      )}
    </section>
  );
};
export default ProjectList;
