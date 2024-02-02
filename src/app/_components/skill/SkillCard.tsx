import styles from '@/app/_styles/skill.module.css';
import Image from 'next/image';
import { Skill } from '@prisma/client';

type SkillProps = {
  skill: Skill;
  size?: number;
  sizes?: string;
};

export const SkillCard = ({ skill, size = 50 }: SkillProps) => {
  const src =
    skill.svg.charAt(0) === '<'
      ? `data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}`
      : skill.svg;

  return (
    <figure className={styles.skill}>
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
