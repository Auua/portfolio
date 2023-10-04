import prisma from './prisma';

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
    return skills;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
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
    return projects;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error('getTopSkills', error);
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
    return page;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
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
          },
        },
        projects: true,
      },

    });
    return page;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(`getFullPage ${name}`, error);
    throw error;
  }
}
