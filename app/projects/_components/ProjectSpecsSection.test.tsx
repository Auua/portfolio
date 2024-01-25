import { projectSpecsMock } from '@/__mocks__/project';
import { renderComponent, screen } from '@/__tests__/__utils__/testUtils';
import { removeUnderscore } from '@/app/_utils/stringUtils';
import ProjectSpecsSection from '@/app/projects/_components/ProjectSpecsSection';

describe('ProjectSpecsSection', () => {
  // Renders the sections
  it('should render the section with all specs', () => {
    const specs = projectSpecsMock;

    renderComponent(
      <main>
        <ProjectSpecsSection {...specs} />
      </main>,
    );

    // Assert Technical_Approach section
    const techSection = screen.queryByText('Technical Approach');
    expect(techSection).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /Technical Approach/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Tech stack selection/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        projectSpecsMock.Technical_Approach['Tech Stack Selection'],
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /Features/i }),
    ).toBeInTheDocument();
    Object.keys(projectSpecsMock.Technical_Approach.features).forEach((key) => {
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: removeUnderscore(key),
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { level: 3, name: 'Tech stack' }),
    ).toBeInTheDocument();
    Object.keys(projectSpecsMock.Technical_Approach.stack).forEach((key) => {
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: removeUnderscore(key),
        }),
      ).toBeInTheDocument();
    });

    // Assert User_Benefits section
    const benefitSection = screen.queryByText('User Benefits');
    expect(benefitSection).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /User Benefits/i }),
    ).toBeInTheDocument();
    Object.keys(projectSpecsMock.User_Benefits).forEach((key) => {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: removeUnderscore(key),
        }),
      ).toBeInTheDocument();
    });

    // Assert Achievements section
    const achievementsSection = screen.queryByText('Achievements');
    expect(achievementsSection).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /Achievements/i }),
    ).toBeInTheDocument();
    projectSpecsMock.Achievements.forEach((achievement) => {
      expect(screen.getByText(achievement)).toBeInTheDocument();
    });
  });

  // Technical Approach, User Benefits, and Achievements are all undefined or null
  it('should not render any section when all specs are null', () => {
    renderComponent(
      <ProjectSpecsSection
        Achievements={[]}
        Technical_Approach={null}
        User_Benefits={null}
      />,
    );

    const techSection = screen.queryByText('Technical Approach');
    expect(techSection).not.toBeInTheDocument();

    const benefitSection = screen.queryByText('User Benefits');
    expect(benefitSection).not.toBeInTheDocument();

    const achievementsSection = screen.queryByText('Achievements');
    expect(achievementsSection).not.toBeInTheDocument();
  });
});
