import prisma from './prisma';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const getProjectTags = cache(async () => {
  try {
    const projectTags = await prisma.project.findMany({
      select: {
        tags: true,
      },
    });
    const allTags = [...new Set(projectTags.map(({ tags }) => tags).flat())];
    console.info('getProjectTags');
    return allTags;
  } catch (error) {
    console.error('getProjectTags', error);
    throw error;
  }
});

export const getProject = cache(async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      console.warn('not found any project with id: ', id);
      notFound();
    }
    console.info('getProject');
    return project;
  } catch (error) {
    console.error(`getProject ${id}`, error);
    throw error;
  }
});

export const getFilteredProjects = cache(async (params?: string[]) => {
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
      console.info(`getFilteredProjects ${params}`);
      return projects;
    }
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.info('getProjects');

    return projects;
  } catch (error) {
    console.error(`getFilteredProjects ${params}`, error);
    throw error;
  }
});
