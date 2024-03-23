import { Level, SkillSectionProps } from '@/app/_types/data';
import { Skill } from '@prisma/client';

export const mapSkills = (
  sections: SkillSectionProps[],
): Record<string, Map<Level, Skill[]>> =>
  sections
    .sort((a, b) => a.order - b.order)
    .reduce(
      (acc, section) => {
        if (!acc[section.tag]) {
          acc[section.tag] = new Map<Level, Skill[]>();
        }

        section.skills.forEach((skill) => {
          const level = skill.level as unknown as Level;
          if (!acc[section.tag].has(level)) {
            acc[section.tag].set(level, []);
          }
          acc[section.tag].get(level)?.push(skill);
        });

        return acc;
      },
      {} as Record<string, Map<Level, Skill[]>>,
    );
