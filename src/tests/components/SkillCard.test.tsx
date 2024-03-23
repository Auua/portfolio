import { skillMock } from '@/mocks/skill';
import { renderComponentInsideMain, screen } from '../testUtils/testUtils';
import { SkillCard } from '@/app/[locale]/_components/skills/SkillCard';

describe('SkillCard', () => {
  // Renders an Image component with the correct src, alt, height and width props based on the skill prop passed to it.
  it('should render Image component with correct props', () => {
    // Given
    const skill = skillMock('Skill1', true, 'Novice');
    const size = 50;

    // When
    renderComponentInsideMain(<SkillCard skill={skill} size={size} />);

    // Then
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      `data:image/svg+xml;utf8,${encodeURIComponent(skill.svg)}`,
    );
    expect(imageElement).toHaveAttribute('alt', `Icon of a "${skill.title}"`);
    expect(imageElement).toHaveAttribute('height', size.toString());
    expect(imageElement).toHaveAttribute('width', size.toString());
  });

  // When the skill prop passed to it has an SVG that starts with '<', it correctly encodes the SVG data and sets it as the src prop on the Image component.
  it('should correctly encode SVG data when skill prop has SVG that starts with "<"', () => {
    // Given
    const skill = {
      svg: 'data:image/svg+xml;utf8,<svg></svg>',
      title: 'Test Skill',
      id: '2',
      level: 'Novice',
      sectionId: '1',
      top: null,
    };

    // When
    renderComponentInsideMain(<SkillCard skill={skill} />);

    // Then
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      `data:image/svg+xml;utf8,<svg></svg>`,
    );
  });

  // When the size prop is not passed, it defaults to 50.
  it('should default to size 50 when size prop is not passed', () => {
    // Given
    const skill = skillMock('Skill2', false, 'Novice');

    // When
    renderComponentInsideMain(<SkillCard skill={skill} />);

    // Then
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('height', '50');
    expect(imageElement).toHaveAttribute('width', '50');
  });
});
