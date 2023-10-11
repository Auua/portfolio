import logger from '@/app/_lib/logger';
import prisma from '@/app/_lib/prisma';

export async function getTopSkills() {
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
    logger.info('getTopSkills', skills);
    return skills;
  } catch (error) {
    logger.error('getTopSkills', error);
    throw error;
  }
}

export async function getLatestProjects() {
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
    logger.info('getLatestProjects', projects);
    return projects;
  } catch (error) {
    logger.error('getTopSkills', error);
    throw error;
  }
}

export async function getPage(name: string) {
  try {
    const page = await prisma.page.findUniqueOrThrow({
      where: {
        label: name,
      },
    });
    logger.info(`getPage ${name}`, page);
    return page;
  } catch (error) {
    logger.error(`getPage ${name}`, error);
    throw error;
  }
}

export async function getFullPage(name: string) {
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
    logger.info(`getFullPage ${name}`, page);
    return page;
  } catch (error) {
    logger.error(`getFullPage ${name}`, error);
    throw error;
  }
}
