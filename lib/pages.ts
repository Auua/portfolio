import prisma from './prisma';

export async function getHomePage() {
  try {
    const home = await prisma.page.findFirst({
      where: {
        label: 'home',
      },
    });
    return home;
  } catch (error) {
    return { error };
  }
}

export async function getTopSkills() {
  try {
    const skills = await prisma.page.findUnique({
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
    return { error };
  }
}

export async function getPage(name: string) {
  try {
    const page = await prisma.page.findUnique({
      where: {
        label: name,
      },
    });
    return page;
  } catch (error) {
    return { error };
  }
}

export async function getFullPage(name: string) {
  try {
    const page = await prisma.page.findUnique({
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
    return { error };
  }
}
