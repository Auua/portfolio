import styles from '@/app/_styles/skill.module.css';
import { SupportedLocale } from '@/app/_types/common';
import { Skill } from '@prisma/client';
import Image from 'next/image';

type SkillProps = {
  skill: Skill;
  size?: number;
  sizes?: string;
  locale: SupportedLocale;
};

export const SkillCard = ({ skill, size = 50, locale }: SkillProps) => {
  const src =
    skill.svg.charAt(0) === '<'
      ? `data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}`
      : skill.svg;

  const title = skill.tTitle ? skill.tTitle[locale] : skill.title;

  return (
    <figure className={styles.skill}>
      <Image
        src={src}
        alt={`Icon of a "${skill.title}"`}
        height={size}
        width={size}
      />
      <figcaption>{title}</figcaption>
    </figure>
  );
};
