import React from 'react';
import styles from '@/app/projects/page.module.css';
import { ProjectCard } from '@/app/_components/cards/Card';
import { Project } from '@prisma/client';

const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section className={styles.section__projects} id={'projects'}>
      <h2 className={'visually--hidden'}>Projects</h2>
      {projects.length ? (
        <div className={styles.grid__main}>
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
export default ProjectSection;
