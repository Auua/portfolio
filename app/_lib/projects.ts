import prisma from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';

export async function getProjectTags() {
  try {
    const projectTags = await prisma.project.findMany({
      select: {
        tags: true,
      },
    });
    const allTags = [...new Set(projectTags.map(({ tags }) => tags).flat())];
    console.info('getProjectTags', allTags);
    return allTags;
  } catch (error) {
    console.error('getProjectTags', error);
    throw error;
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      console.warn('not found any project with id: ', id);
      notFound();
    }
    console.info('getProject', project);
    return project;
  } catch (error) {
    console.error(`getProject ${id}`, error);
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
      console.info(`getFilteredProjects ${params}`, projects);
      return projects;
    }
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.info('getProjects', projects);

    return projects;
  } catch (error) {
    console.error(`getFilteredProjects ${params}`, error);
    throw error;
  }
}
