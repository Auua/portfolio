import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// If the tested component uses features from Next.js, you have to mock them.
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({ locale: 'en' }),
  useSelectedLayoutSegment: () => ({ locale: 'en' }),
}));

jest.mock('next-intl/server', () => ({
  getRequestConfig: () => ({}),
  getLocale: () => 'en',
  getTranslations: jest.fn().mockImplementation(() => {
    // Mock implementation of the translation function
    return (key: string) => key;
  }),
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: jest.fn().mockImplementation(() => {
    // Mock implementation of the translation function
    return (key: string) => key;
  }),
}));

jest.mock('./src/app/api/auth/[...nextauth]/options', () => ({
  providers: [require('./src/mocks/next-auth')],
  adapter: jest.fn(),
  session: jest.fn(),
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue(null),
}));

/*
// Mock the entire module
jest.mock('@/app/_lib/pages', () => {
  return require('./__mocks__/prisma');
});

jest.mock('@/app/_lib/pages', () => {
  return require('./__mocks__/prisma');
});
jest.mock('next-auth', () => ({
  ...jest.requireActual('next-auth'), // Use actual implementations for other exports
  getServerSession: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ user: { name: 'John Doe' } })),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'), // Use actual implementations for other exports
  getServerSession: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ user: { name: 'John Doe' } })),
}));
*/

global.afterEach(async () => {
  await axe(document.body).then((result) => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(result).toHaveNoViolations();
  });
});
