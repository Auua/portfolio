import prisma from './prisma';
import { cache } from 'react';

export const getTimelineFor = cache(async (name: string) => {
  try {
    const page = await prisma.section.findFirstOrThrow({
      where: {
        tag: name,
      },
      include: {
        timeline: true,
      },
    });
    console.info(`getTimelineFor ${name}`);
    return page;
  } catch (error) {
    console.error(`getTimelineFor ${name}`, error);
    throw error;
  }
});
