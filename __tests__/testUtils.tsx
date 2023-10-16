import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export const renderComponent = (ui: ReactElement) =>
  render(ui, {
    container: document.getElementById('test-root'),
  });
