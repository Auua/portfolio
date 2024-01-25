import {
  fireEvent,
  renderComponent,
  screen,
} from '@/__tests__/__utils__/testUtils';
import ContactForm from '@/app/_components/form/ContactForm';

const mockSendForm = jest.fn();

jest.mock('@/app/_actions/formActions', () => ({
  sendForm: jest.fn((data) => mockSendForm(data)),
}));

describe('ContactForm', () => {
  // Form is submitted successfully with valid inputs
  it('should submit form successfully when valid inputs are provided', async () => {
    // Arrange
    const formData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      company: 'Example Company',
      message: 'This is a test message',
    };

    mockSendForm.mockResolvedValueOnce({
      error: false,
      message: 'Success',
    });
    // Act
    renderComponent(
      <main>
        <ContactForm />
      </main>,
    );
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: formData.name },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByLabelText('Company'), {
      target: { value: formData.company },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: formData.message },
    });
    fireEvent.click(screen.getByText('Send'));

    // Assert
    expect(await screen.findByText('Thank you!')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Thank you!')).not.toBeInTheDocument();
  });

  // Error notification is displayed if form submission fails
  it('should display error notification if form submission fails', async () => {
    // Arrange
    const formData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      company: 'Example Company',
      message: 'This is a test message',
    };
    mockSendForm.mockResolvedValueOnce({
      error: true,
    });

    // Act
    renderComponent(
      <main>
        <ContactForm />
      </main>,
    );
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: formData.name },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByLabelText('Company'), {
      target: { value: formData.company },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: formData.message },
    });
    fireEvent.click(screen.getByText('Send'));

    // Assert
    expect(
      await screen.findByText('Sorry, something is failing...'),
    ).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeBtn);

    expect(
      screen.queryByText('Sorry, something is failing...'),
    ).not.toBeInTheDocument();
  });

  // Validation errors are displayed if form submission fails due to invalid inputs
  it('should display validation error if form submitted with invalid inputs', async () => {
    // Arrange

    // Act
    renderComponent(
      <main>
        <ContactForm />
      </main>,
    );
    fireEvent.click(screen.getByText('Send'));

    // Assert
    expect(
      await screen.findByText(/Please enter Your full name/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please enter Your company name/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please enter Your message/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please enter a valid email address/i),
    ).toBeInTheDocument();
  });
});
