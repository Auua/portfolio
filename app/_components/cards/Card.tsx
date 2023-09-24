'use client';

import '@/app/_styles/card.css';
import Image from 'next/image';
import { Skill } from '@prisma/client';

type SkillProps = {
  skill: Skill;
  size?: number;
  sizes?: string;
};

export const SkillCard = ({ skill, size = 50, sizes }: SkillProps) => {
  const src = skill.svg.charAt(0) === '<' ? `data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}` : skill.svg;

  if (sizes) {
    return (
      <figure className={'card--skill'}>
        <div className={'card--skill-image'}>
          <Image
            src={src}
            alt={skill.title}
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
    <figure className={'card--skill'}>
      <Image
        src={src}
        alt={skill.title}
        height={size}
        width={size}
      />
      <figcaption>{skill.title}</figcaption>
    </figure>
  );
};

export default SkillCard;
