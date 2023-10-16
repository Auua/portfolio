/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react';
import Header from '@/app/_components/common/Header';
import { renderComponent } from '@/__tests__/testUtils';

describe('Header', () => {
  it('renders with only title', () => {
    renderComponent(<Header title="title" />);
    const header = screen.getByRole('heading', { name: 'title' });
    expect(header).toBeDefined();
  });

  it('renders with with children', () => {
    renderComponent(
      <Header title="title">
        <p>This is child</p>
      </Header>,
    );
    const header = screen.getByRole('heading', { name: 'title' });
    expect(header).toBeDefined();
    expect(screen.getByText('This is child')).toBeDefined();
  });
});
