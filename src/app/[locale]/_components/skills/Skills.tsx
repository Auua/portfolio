import { mapSkills } from '@/app/_utils/mapper/skillMapper';
import { getSkills } from '@/lib/skills';
import SkillSection from './SkillSection';
import { getLocale } from 'next-intl/server';
import { SupportedLocale } from '@/app/_types/common';

export default async function Skills({
  sectionHeaderLevel,
}: {
  sectionHeaderLevel: number;
}) {
  const skillsData = getSkills();
  const localeData = getLocale();
  const [skills, locale] = await Promise.all([skillsData, localeData]);
  const mappedSkills = mapSkills(skills.sections);

  return (
    <section>
      {skills.sections.map((section) => (
        <SkillSection
          key={section.id}
          section={section}
          locale={locale as SupportedLocale}
          mappedSkills={mappedSkills[section.tag]}
          sectionHeaderLevel={sectionHeaderLevel}
        />
      ))}
    </section>
  );
}
