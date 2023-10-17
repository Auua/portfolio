import { renderComponent } from '@/__tests__/__utils__/testUtils';
import React from 'react';
import SkillsPage from '@/app/skills/_components/SkillsPage';
import { getByText, screen } from '@testing-library/react';
import { skillsPageMock } from '@/__mocks__/page';

describe('SkillsPage', () => {
  const skillsPage = skillsPageMock(false);

  it('should render the page with all props', () => {
    renderComponent(
      <SkillsPage
        title={skillsPage.title}
        desc={skillsPage.desc}
        sections={skillsPage.sections}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: skillsPage.title }),
    ).toBeDefined();
    skillsPage.sections.forEach((section) => {
      expect(
        screen.getByRole('heading', { level: 2, name: section.subtitle }),
      ).toBeDefined();
    });

    const infoNotification = screen.getByRole('status');
    expect(infoNotification).toBeDefined();
    expect(getByText(infoNotification, skillsPage.desc)).toBeDefined();

    expect(screen.queryAllByText(/expert/i)).toHaveLength(2);
    expect(screen.queryAllByText(/proficient/i)).toHaveLength(2);
    expect(screen.queryAllByText(/competent/i)).toHaveLength(2);
    expect(screen.queryAllByText(/adv\. beginner/i)).toHaveLength(2);
    expect(screen.queryAllByText(/novice/i)).toHaveLength(2);
  });

  it('should handle empty sections array', () => {
    renderComponent(
      <SkillsPage title="Test Title" desc="Test Description" sections={[]} />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Test Title/i }),
    ).toBeDefined();
    const infoNotification = screen.getByRole('status');
    expect(infoNotification).toBeDefined();
    expect(getByText(infoNotification, /Test Description/i)).toBeDefined();
  });
});
