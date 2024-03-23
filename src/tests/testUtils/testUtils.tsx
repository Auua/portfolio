import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { Queries } from '@testing-library/dom/types/get-queries-for-element';
import { NextIntlClientProvider } from 'next-intl';

export const renderComponent = (ui: ReactElement, ...options: Queries[]) =>
  render(ui, {
    // eslint-disable-next-line testing-library/no-node-access
    //container: document.getElementById('test-root'),
    wrapper: ({ children }) => <div id={'test-root'}>{children}</div>,
    ...options,
  });

export const renderClientComponent = (
  ui: ReactElement,
  ...options: Queries[]
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={'en'} messages={{ en: 'en' }}>
        <div id={'test-root'}>{children}</div>
      </NextIntlClientProvider>
    ),
    ...options,
  });

export const renderComponentInsideMain = (
  ui: ReactElement,
  ...options: Queries[]
) =>
  render(ui, {
    // eslint-disable-next-line testing-library/no-node-access
    //container: document.getElementById('test-root'),
    wrapper: ({ children }) => (
      <div id={'test-root'}>
        <main>{children}</main>
      </div>
    ),
    ...options,
  });

export * from '@testing-library/react';
