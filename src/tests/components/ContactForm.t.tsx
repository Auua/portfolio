import {
  renderComponentInsideMain,
  screen,
  fireEvent,
  waitFor,
} from '../testUtils/testUtils';
import Form from '@/app/_components/form/ContactForm';
import Page from '@/app/[locale]/contact/page';

const mockedSendForm = jest.fn();

jest.mock('@/actions/formActions', () => ({
  default: () => mockedSendForm,
}));

describe('ContactForm', () => {
  // Form renders without errors
  it('should render the form without errors', () => {
    // Given

    // When
    renderComponentInsideMain(<Page />);

    //Then
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('company')).toBeInTheDocument();
    expect(screen.getByLabelText('message')).toBeInTheDocument();
  });
  // User can input name, email, company and message in the form
  it('should allow user to input name, email, company, and message in the form', async () => {
    // Given
    const { header, content } = Form();
    const form = (
      <div>
        {header}
        {content}
      </div>
    );

    // When
    renderComponentInsideMain(form);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const companyInput = screen.getByLabelText('company');
    const messageInput = screen.getByLabelText('message');
    // When
    fireEvent.input(nameInput, 'John Doe');
    fireEvent.input(emailInput, 'john.doe@example.com');
    fireEvent.input(companyInput, 'ABC Company');
    fireEvent.input(messageInput, 'Hello, this is a test message.');
    // Then
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(companyInput).toHaveValue('ABC Company');
    expect(messageInput).toHaveValue('Hello, this is a test message.');
  });

  // User can submit the form without errors
  it('should submit the form without errors', async () => {
    // Given
    const { header, content } = Form();
    const form = (
      <div>
        {header}
        {content}
      </div>
    );
    mockedSendForm.mockResolvedValue({ message: 'success' });

    // When
    renderComponentInsideMain(form);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const companyInput = screen.getByLabelText('company');
    const messageInput = screen.getByLabelText('message');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // When
    fireEvent.input(nameInput, 'John Doe');
    fireEvent.input(emailInput, 'john.doe@example.com');
    fireEvent.input(companyInput, 'ABC Company');
    fireEvent.input(messageInput, 'Hello, this is a test message.');
    fireEvent.click(submitButton);
    // Then
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  // Form submission fails due to network error
  it('should handle network error during form submission', async () => {
    // Given
    mockedSendForm.mockRejectedValue(new Error('Network Error'));
    const { header, content } = Form();
    const form = (
      <div>
        {header}
        {content}
      </div>
    );

    // When
    renderComponentInsideMain(form);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const companyInput = screen.getByLabelText('company');
    const messageInput = screen.getByLabelText('message');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // When
    fireEvent.input(nameInput, 'John Doe');
    fireEvent.input(emailInput, 'john.doe@example.com');
    fireEvent.input(companyInput, 'ABC Company');
    fireEvent.input(messageInput, 'Hello, this is a test message.');
    fireEvent.click(submitButton);
    // Then
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });

  // Form submission fails due to server error
  it('should handle server error during form submission', async () => {
    // Given
    const { header, content } = Form();
    const form = (
      <div>
        {header}
        {content}
      </div>
    );

    // When
    renderComponentInsideMain(form);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const companyInput = screen.getByLabelText('company');
    const messageInput = screen.getByLabelText('message');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // When
    fireEvent.input(nameInput, 'John Doe');
    fireEvent.input(emailInput, 'john.doe@example.com');
    fireEvent.input(companyInput, 'ABC Company');
    fireEvent.input(messageInput, 'Hello, this is a test message.');
    fireEvent.click(submitButton);
    // Then
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });

  // Form submission fails due to invalid response
  it('should handle invalid response during form submission', async () => {
    // Given
    mockedSendForm.mockResolvedValue({
      errors: { nested: { name: 'invalid' } },
    });
    const { header, content } = Form();
    const form = (
      <div>
        {header}
        {content}
      </div>
    );

    // When
    renderComponentInsideMain(form);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const companyInput = screen.getByLabelText('company');
    const messageInput = screen.getByLabelText('message');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // When
    fireEvent.input(nameInput, 'John Doe');
    fireEvent.input(emailInput, 'john.doe@example.com');
    fireEvent.input(companyInput, 'ABC Company');
    fireEvent.input(messageInput, 'Hello, this is a test message.');
    fireEvent.click(submitButton);

    //Then
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    expect(screen.getByText('Invalid Response')).toBeInTheDocument();
  });
});
