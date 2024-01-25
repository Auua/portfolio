import {
  fireEvent,
  renderComponent,
  screen,
} from '@/__tests__/__utils__/testUtils';
import Sidebar from '@/app/_components/navigation/Sidebar';
import { pageMetaDataMock } from '@/__mocks__/page';
import React from 'react';

// Mock the functions
const mockUseHashChange = jest.fn();
const mockUsePageScroll = jest.fn();

window.scrollTo = jest.fn();

jest.mock('@/app/_hooks', () => ({
  useHashChange: () => mockUseHashChange,
  usePageScroll: () => mockUsePageScroll,
}));

describe('Sidebar', () => {
  // Renders a sidebar with a list of page items.
  it('should render a sidebar with a list of page items', () => {
    const pageItems = pageMetaDataMock.pageItems;
    const narrow = false;

    // Act
    renderComponent(<Sidebar pageItems={pageItems} narrow={narrow} />);

    // Assert
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();

    const sidebarItems = screen.getAllByRole('button');
    expect(sidebarItems).toHaveLength(pageItems.length);
  });

  // Clicking on a page item button scrolls to the corresponding section.
  it('should scroll to the corresponding section when clicking on a page item button', () => {
    // Arrange
    const pageItems = pageMetaDataMock.pageItems;
    const narrow = false;

    renderComponent(<Sidebar pageItems={pageItems} narrow={narrow} />);

    // Act
    const itemButton = screen.getByRole('button', { name: pageItems[2].title });
    fireEvent.click(itemButton);

    // Assert
    expect(window.scrollTo).toHaveBeenCalled();
  });

  // The active page item is highlighted.
  it('should highlight the active page item', () => {
    // Arrange
    const pageItems = pageMetaDataMock.pageItems;
    const narrow = false;
    renderComponent(<Sidebar pageItems={pageItems} narrow={narrow} />);

    // Act
    const itemButton = screen.getByRole('button', { name: pageItems[2].title });
    fireEvent.click(itemButton);

    // Assert
    expect(itemButton).toHaveClass('sidebar__item__active');
  });

  // Clicking on a non-existent page item button scrolls to the top of the page.
  it('should scroll to the top of the page when clicking on a non-existent page item button', () => {
    // Arrange
    const pageItems = pageMetaDataMock.pageItems;
    const narrow = false;
    renderComponent(<Sidebar pageItems={pageItems} narrow={narrow} />);

    // Act
    const nonExistentItemButton = screen.getByRole('button', {
      name: pageItems[0].title,
    });
    fireEvent.click(nonExistentItemButton);

    // Assert
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  // The sidebar is not rendered if there are no page items.
  it('should not render the sidebar if there are no page items', () => {
    // Arrange
    const narrow = false;

    // Act
    renderComponent(<Sidebar pageItems={[]} narrow={narrow} />);

    // Assert
    const sidebar = screen.queryByRole('aside');
    expect(sidebar).not.toBeInTheDocument();
  });
});
