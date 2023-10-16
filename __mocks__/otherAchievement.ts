import { OtherTypes } from '@prisma/client';

export const otherAchievementMock = (
  type: OtherTypes,
  title: string,
  validity: Date | null,
  note?: string,
) => ({
  id: `other-achievement-${title}`,
  type: type,
  title: title,
  date: '2023-01-15T00:00:00Z',
  validity: validity,
  desc: `Did something great for ${title}.`,
  excerpt: `Small ${title}.`,
  note: note,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const otherAchievementMock2 = (...params) => ({
  id: `other-achievement-${params[0]}`,
  type: params[0],
  title: params[1],
  date: '2023-01-15T00:00:00Z',
  validity: params[2],
  desc: `Did something great for ${params[1]}.`,
  excerpt: `Small ${params[1]}.`,
  note: params[3],
});
