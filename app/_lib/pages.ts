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
