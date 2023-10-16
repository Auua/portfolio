import React from 'react';
import { getLatestProjects } from '@/app/_lib/pages';
import styles from '@/app/home/page.module.css';
import { Project } from '@prisma/client';
import { ProjectCard } from '@/app/_components/cards/Card';

const LatestProjects = async () => {
  const { title, excerpt, projects } = await getLatestProjects();
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div>
        <p>{excerpt}</p>
      </div>
      <div className={styles.main__projects}>
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            className={`${styles.main__card} ${styles['main__card--full']}`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestProjects;
