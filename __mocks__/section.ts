import { SectionProps } from '@/app/_types/common';
import { OtherAchievement, Skill, Timeline } from '@prisma/client';

export const sectionMock = (
  title: string,
  order: number,
  skills: Skill[],
  timeline: Timeline[],
  others: OtherAchievement[],
): SectionProps => ({
  id: `section-${title}`,
  content: 'This is the content of the section.',
  order: order,
  subtitle: `Subtitle of the section ${title}`,
  tag: title,
  skills: skills,
  timeline: timeline,
  others: others,
  pageId: `page-${title}`,
});
