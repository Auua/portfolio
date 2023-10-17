import {
  fireEvent,
  renderComponent,
  screen,
  waitFor,
} from '@/__tests__/__utils__/testUtils';
import Sidebar from '@/app/_components/navigation/Sidebar';
import { pageMetaDataMock } from '@/__mocks__/page';
import React from 'react';

// Mock the functions
const mockUseHashChange = jest.fn();
const mockUsePageScroll = jest.fn();

jest.mock('@/app/_hooks', () => ({
  useHashChange: () => mockUseHashChange,
  usePageScroll: () => mockUsePageScroll,
}));

describe('Sidebar', () => {
  const pageItems = pageMetaDataMock.pageItems;

  it('should render a sidebar with a list of page items', () => {
    renderComponent(<Sidebar pageItems={pageItems} narrow={false} />);

    pageItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('should handle active section on click', async () => {
    const mockSetActiveSection = jest.fn();

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation(() => ['', mockSetActiveSection]);

    renderComponent(<Sidebar pageItems={pageItems} narrow={false} />);

    const pageItem = screen.getByText(pageItems[2].title);
    fireEvent.click(pageItem);

    expect(
      screen.getByRole('link', { name: pageItems[2].title }).outerHTML,
    ).toContain('sidebar__item__active');

    await waitFor(() => expect(mockSetActiveSection).toHaveBeenCalled());

    useStateMock.mockRestore();
  });
});
