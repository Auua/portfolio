import {
  cleanup,
  renderComponentInsideMain,
  screen,
} from '../testUtils/testUtils';
import Footer from '@/app/_components/footer/Footer';

afterEach(cleanup);

describe('Footer', () => {
  // Renders the footer with three links.
  it('should render a footer component with a container div and three social media links', async () => {
    // Given
    const footer = await Footer();

    // When
    renderComponentInsideMain(footer);
    await screen.findByRole('contentinfo');

    // Then
    expect(screen.getByRole('link', { name: /Github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  // Renders icon components with the title attribute set to correct alt text from the translations file
  it('should render icon components with the title attribute set to correct alt text from the translations file', async () => {
    // Given
    const footer = await Footer();

    // When
    renderComponentInsideMain(footer);
    await screen.findByRole('contentinfo');

    // Then
    expect(screen.getByTitle('socials.github.alt')).toBeInTheDocument();
    expect(screen.getByTitle('socials.linkedin.alt')).toBeInTheDocument();
    expect(screen.getByTitle('socials.contact.alt')).toBeInTheDocument();
  });

  // Renders a default error page when no props are passed.
  // Footer component is accessible and meets WCAG 2.1 standards
  it('should render a footer component that meets WCAG 2.1 standards', async () => {
    // Given
    const footer = await Footer();

    // When
    renderComponentInsideMain(footer);
    await screen.findByRole('contentinfo');

    // Then
    expect(
      screen.getByRole('link', { name: /Github/i }),
    ).toHaveAccessibleName();
    expect(
      screen.getByRole('link', { name: /LinkedIn/i }),
    ).toHaveAccessibleName();
    expect(
      screen.getByRole('link', { name: /Contact/i }),
    ).toHaveAccessibleName();
  });
});
