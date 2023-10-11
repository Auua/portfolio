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
    console.info('getTopSkills');
    return skills;
  } catch (error) {
    console.error('getTopSkills', error);
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
    console.info('getLatestProjects');
    return projects;
  } catch (error) {
    console.error('getLatestProjects', error);
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
    console.info(`getPage ${name}`);
    return page;
  } catch (error) {
    console.error(`getPage ${name}`, error);
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
    console.info(`getFullPage ${name}`);
    return page;
  } catch (error) {
    console.error(`getFullPage ${name}`, error);
    throw error;
  }
}
