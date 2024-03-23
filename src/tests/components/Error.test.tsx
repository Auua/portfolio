import { renderComponentInsideMain, screen } from '../testUtils/testUtils';
import Error from '@/app/_components/error/Error';

describe('Error', () => {
  // Renders the error page with the provided status code, title, and description.
  it('should render the error page with the provided status code, title, and description', () => {
    // Given
    const statusCode = 404;
    const title = 'Page Not Found';
    const description = 'The requested page could not be found.';

    // When
    renderComponentInsideMain(
      <Error statusCode={statusCode} title={title} description={description} />,
    );

    // Then
    expect(screen.getByText(statusCode.toString())).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: title, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // Renders the error page with the provided status code, title, and children

  it('should render the error page with the provided status code, title, and childern', () => {
    // Given
    const statusCode = 404;
    const title = 'Page Not Found';
    const children = <button>Return</button>;

    // When
    renderComponentInsideMain(
      <Error statusCode={statusCode} title={title}>
        {children}
      </Error>,
    );

    // Then
    expect(screen.getByText(statusCode.toString())).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: title, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return' })).toBeInTheDocument();
  });

  // Renders a default error page when no props are passed.
  it('should render the default error page when no props are passed', () => {
    // Given

    // When
    renderComponentInsideMain(<Error />);

    // Then
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Unexpected Error Occurred',
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
