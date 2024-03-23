import { Prisma } from '@prisma/client';

export type SectionProps = Prisma.SectionGetPayload<{
  include: { skills: true; timeline: true; others: true };
}>;

export type SkillSectionProps = Prisma.SectionGetPayload<{
  include: { skills: true };
}>;

export type TimelineSectionProps = Prisma.SectionGetPayload<{
  include: { timeline: true };
}> | null;

export enum Level {
  Expert = 'Expert',
  Proficient = 'Proficient',
  Competent = 'Competent',
  Novice = 'Novice',
}

export const levels = Object.values(Level);
