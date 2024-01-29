import 'server-only';

import prisma from './prisma';
import { cache } from 'react';

export const getTopSkills = cache(async () => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        top: true,
      },
    });
    console.info('getTopSkills');
    return skills;
  } catch (error) {
    console.error('getTopSkills', error);
    throw error;
  }
});

export const preload = () => {
  void getTopSkills();
};

export const getSkills = async () => {
  try {
    const page = await prisma.page.findUniqueOrThrow({
      where: {
        label: 'skills',
      },
      include: {
        sections: {
          include: {
            skills: true,
          },
        },
      },
    });
    console.info(`getSkills`);
    return page;
  } catch (error) {
    console.error(`getSkills`, error);
    throw error;
  }
};
