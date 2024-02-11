import { renderComponent, screen } from '../testUtils/testUtils';
import Navbar from '@/app/_components/navigation/Navbar';

/*
jest.mock('@/app/_components/navigation/lang/LangSwitch', () => {
  return () => <div>English</div>;
});
*/

jest.mock('@/app/_components/navigation/auth/AuthSwitch', () => {
  return () => <button>Login</button>;
});

describe('Navbar', () => {
  // Navbar renders without errors
  it('should render Navbar without errors', async () => {
    // Given
    const nav = await Navbar({ locale: 'en' });
    // When
    renderComponent(nav);
    // Then
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Navbar displays a link to skip to main content
  it('should display a link to skip to main content', async () => {
    // Given
    const nav = await Navbar({ locale: 'en' });
    // When
    renderComponent(nav);
    // Then
    expect(screen.getByText('skip')).toBeInTheDocument();
    expect(screen.getByText('skip')).toHaveAttribute('href', '#main');
  });
});
