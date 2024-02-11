import {
  fireEvent,
  renderComponentInsideMain,
  screen,
} from '../testUtils/testUtils';
import { Modal } from '@/app/_components/modal/Modal';

const back = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
useRouter.mockReturnValue({
  back: back,
});

describe('Modal', () => {
  // Renders a modal with a header and content
  it('should render a modal with a header and content with footer close button', () => {
    // Given
    const header = 'Test Header';
    const content = <div>Test Content</div>;
    const isForm = false;

    // When
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );

    // Then
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
  });

  // Renders a modal with a header and content
  it('should render a modal with a header and form', () => {
    // Given
    const header = 'Test Form Header';
    const content = (
      <form>
        <input type="submit" value="Submit" />
      </form>
    );
    const isForm = true;

    // When
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );

    // Then
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
  });

  // Renders a close button that closes the modal
  it('should render a close button that closes the modal', async () => {
    // Given
    const header = 'Test Header';
    const content = <div>Test Content</div>;
    const isForm = false;

    // When
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );
    fireEvent.click(screen.getByText(/close/i));

    // Then
    expect(back).toHaveBeenCalled();
  });

  // Renders a x close button that closes the modal
  it('should render a x close button that closes the modal', async () => {
    // Given
    const header = 'Test Header';
    const content = <div>Test Content</div>;
    const isForm = false;

    // When
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );
    fireEvent.click(screen.getByText(/X/i));

    // Then
    expect(back).toHaveBeenCalled();
  });

  // Closes the modal when clicked outside the modal
  it('should render a close button that closes the modal when clicked outside the modal', async () => {
    // Given
    const header = 'Test Header';
    const content = <div>Test Content</div>;
    const isForm = false;

    // When
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );
    fireEvent.mouseDown(screen.getByRole('presentation'));

    // Then
    expect(back).toHaveBeenCalled();
  });

  // Closes the modal when ESC is pressed
  it('should close the modal when escape is pressed', async () => {
    // Given
    const header = 'Test Header';
    const content = <div>Test Content</div>;
    const isForm = false;

    // Whenf
    renderComponentInsideMain(
      <Modal header={header} content={content} isForm={isForm} />,
    );
    fireEvent.keyPress(screen.getByRole('presentation'), {
      key: 'Escape',
    });

    // Then
    expect(back).toHaveBeenCalled();
  });
});
