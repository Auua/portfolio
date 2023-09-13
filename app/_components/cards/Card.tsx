'use client';

import '@/app/_styles/card.css';
import Image from 'next/image';
import { SkillProps } from '@/app/_types/types';

export const SkillCard = ({ skill, size }: { skill: SkillProps, size: number }) => (
  <div className={'card--skill'}>
    <Image
      src={`data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}`}
      alt={skill.title}
      height={size ?? 50}
      width={size ?? 50}
    />
  </div>
);
