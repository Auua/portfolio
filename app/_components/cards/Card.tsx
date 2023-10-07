'use client';

import '@/app/_styles/card.css';
import Image from 'next/image';
import { Project, Skill } from '@prisma/client';
import Link from 'next/link';
import { Suspense } from 'react';

type SkillProps = {
  skill: Skill;
  size?: number;
  sizes?: string;
};

export const SkillCard = ({ skill, size = 50, sizes }: SkillProps) => {
  const src = skill.svg.charAt(0) === '<' ? `data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}` : skill.svg;

  if (sizes) {
    return (
      <figure className={'card card--skill'}>
        <div className={'card--skill-image'}>
          <Image
            src={src}
            alt={`Icon of a "${skill.title}"`}
            fill={true}
            sizes={sizes}
            style={{ objectPosition: 'top', objectFit: 'contain', padding: '0.25rem' }}
          />
        </div>
        <figcaption>{skill.title}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={'card card--skill'}>
      <Image
        src={src}
        alt={`Icon of a "${skill.title}"`}
        height={size}
        width={size}
      />
      <figcaption>{skill.title}</figcaption>
    </figure>
  );
};

export const ProjectCard = ({ project }: { project: Project }) => (
  <Suspense fallback={'Loading project...'}>
    <article className={'card card--project'}>
      <figure id={project.title} className={'card card--project-image'}>
        <Image
          src={`data:image/jpg;base64,${project.pics[0]?.src}`}
          alt={project.pics[0]?.alt ?? project.title}
          fill={true}
          loading='lazy'
          sizes='100%'
        />
        <figcaption>
          <h3 className={'project-title'}>{project.title}</h3>
        </figcaption>
      </figure>
      <p className={'card--project-excerpt'}>
        {project.excerpt}
        <Link className={'btn'} href={`projects/${project.id}`} aria-label={project.title}>
          View Project
        </Link>
      </p>
    </article>
  </Suspense>
);
