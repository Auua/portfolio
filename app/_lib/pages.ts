import prisma from '@/app/_lib/prisma';
import { cache } from 'react';

export const revalidate = 3600;

export const getTopSkills = cache(async () => {
  try {
    const skills = await prisma.page.findUniqueOrThrow({
      where: {
        label: 'skills',
      },
      include: {
        sections: {
          include: {
            skills: {
              where: {
                top: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    console.info('getTopSkills');
    return skills;
  } catch (error) {
    console.error('getTopSkills', error);
    throw error;
  }
});

export const getLatestProjects = cache(async () => {
  try {
    const projects = await prisma.page.findUniqueOrThrow({
      where: {
        label: 'projects',
      },
      include: {
        projects: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
      },
    });
    console.info('getLatestProjects');
    return projects;
  } catch (error) {
    console.error('getLatestProjects', error);
    throw error;
  }
});

export const getPage = cache(async (name: string) => {
  try {
    const page = await prisma.page.findUniqueOrThrow({
      where: {
        label: name,
      },
    });
    console.info(`getPage ${name}`);
    return page;
  } catch (error) {
    console.error(`getPage ${name}`, error);
    throw error;
  }
});

export const getFullPage = cache(async (name: string) => {
  try {
    const page = await prisma.page.findUniqueOrThrow({
      where: {
        label: name,
      },
      include: {
        sections: {
          include: {
            skills: true,
            timeline: true,
            others: true,
          },
        },
        projects: true,
      },
    });
    console.info(`getFullPage ${name}`);
    return page;
  } catch (error) {
    console.error(`getFullPage ${name}`, error);
    throw error;
  }
});
