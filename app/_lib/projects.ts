import prisma from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';

export async function getProjectTags() {
  try {
    const projectTags = await prisma.project.findMany({
      select: {
        tags: true,
      },
    });

    return [...new Set(projectTags.map(({ tags }) => tags).flat())];
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
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
      console.log('not found any project with id: ', id);
      notFound();
    }

    return project;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
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
      return projects;
    }
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return projects;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(`getFilteredProjects ${params}`, error);
    throw error;
  }
}
