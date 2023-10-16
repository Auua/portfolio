import { OtherAchievement, Skill, Timeline } from '@prisma/client';

export const sectionMock = (
  title: string,
  order: number,
  skills: Skill[],
  timeline: Timeline[],
  others: OtherAchievement[],
) => ({
  id: `section-${title}`,
  content: 'This is the content of the section.',
  order: order,
  title: `section-${title}`,
  updatedAt: '2023-04-20T14:45:00Z',
  subtitle: `Subtitle of the section ${title}`,
  tag: title,
  skills: skills,
  timeline: timeline,
  others: others,
  pageId: `page-${title}`,
});
