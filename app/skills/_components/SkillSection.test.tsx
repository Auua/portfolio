import SkillSection from '@/app/skills/_components/SkillSection';
import { skillMock } from '@/__mocks__/skill';
import { sectionMock } from '@/__mocks__/section';
import { Skill } from '@prisma/client';
import { renderComponent, screen } from '@/__tests__/__utils__/testUtils';

const skills = [
  skillMock('skill1', true, 'Proficient'),
  skillMock('skill2', true, 'Expert'),
  skillMock('skill3', true, 'Novice'),
  skillMock('skill4', true, 'Expert'),
  skillMock('skill5', true, 'Adv. Beginner'),
  skillMock('skill6', true, 'Proficient'),
  skillMock('skill7', true, 'Competent'),
  skillMock('skill8', true, 'Expert'),
];

const section = sectionMock('Test Subtitle', 1, skills, [], []);

const mappedSkills = new Map<string, Skill[]>();
skills.forEach((skill) => {
  const key = `${section.tag}:${skill.level}`;
  if (!mappedSkills.has(key)) {
    mappedSkills.set(key, []);
  }
  mappedSkills.get(key)?.push(skill);
});

describe('SkillSection', () => {
  it('should render a section with a title and a grid of skills for each level', () => {
    renderComponent(
      <main>
        <SkillSection section={section} skills={mappedSkills} />
      </main>,
    );

    const header = screen.getByRole('heading', { level: 2 });
    expect(header.innerHTML).toEqual('Subtitle of the section Test Subtitle');

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(8);

    skills.forEach((skill) => {
      const altText = `icon of a "${skill.title}"`;
      expect(
        screen.getByRole('img', { name: new RegExp(altText, 'i') }),
      ).toBeDefined();
    });
  });

  it('should render an empty grid for each level when skills are empty', () => {
    const emptyMap = new Map<string, Skill[]>();
    skills.forEach((skill) => {
      const key = `${section.tag}:${skill.level}`;
      if (!emptyMap.has(key)) {
        emptyMap.set(key, []);
      }
    });

    renderComponent(
      <main>
        <SkillSection section={section} skills={emptyMap} />
      </main>,
    );

    const header = screen.getByRole('heading', { level: 2 });
    expect(header.innerHTML).toEqual('Subtitle of the section Test Subtitle');

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);

    expect(screen.getByText(/expert/i)).toBeDefined();
    expect(screen.getByText(/proficient/i)).toBeDefined();
    expect(screen.getByText(/competent/i)).toBeDefined();
    expect(screen.getByText(/adv\. beginner/i)).toBeDefined();
    expect(screen.getByText(/novice/i)).toBeDefined();
  });
});
