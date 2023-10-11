import prisma from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import logger from '@/app/_lib/logger';

export async function getProjectTags() {
  try {
    const projectTags = await prisma.project.findMany({
      select: {
        tags: true,
      },
    });
    const allTags = [...new Set(projectTags.map(({ tags }) => tags).flat())];
    logger.info('getProjectTags', allTags);
    return allTags;
  } catch (error) {
    logger.error('getProjectTags', error);
    throw error;
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      logger.warn('not found any project with id: ', id);
      notFound();
    }
    logger.info('getProject', project);
    return project;
  } catch (error) {
    logger.error(`getProject ${id}`, error);
    throw error;
  }
}

export async function getFilteredProjects(params?: string[]) {
  try {
    if (params) {
      const projects = await prisma.project.findMany({
        where: {
          tags: {
            hasEvery: [...params],
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      logger.info(`getFilteredProjects ${params}`, projects);
      return projects;
    }
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    logger.info('getProjects', projects);

    return projects;
  } catch (error) {
    logger.error(`getFilteredProjects ${params}`, error);
    throw error;
  }
}
