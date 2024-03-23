import styles from '@/app/_styles/projects.module.css';
import { Project } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

export const ProjectCard = ({ project }: { project: Project }) => (
  <Suspense fallback={'Loading project...'}>
    <article className={styles.card}>
      <figure id={project.title} className={styles.project_image}>
        <Image
          src={`data:image/jpg;base64,${project.pics[0]?.src}`}
          alt={project.pics[0]?.alt ?? project.title}
          fill={true}
          loading="lazy"
          sizes="100%"
        />
        <figcaption>
          <h3 className={styles.project_title}>{project.title}</h3>
        </figcaption>
      </figure>
      <p className={styles.excerpt}>
        {project.excerpt}
        <Link
          className={'btn'}
          href={`projects/${project.id}`}
          aria-label={project.title}
        >
          View Project
        </Link>
      </p>
    </article>
  </Suspense>
);
