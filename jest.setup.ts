import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

jest.mock('next-auth/providers/credentials', () => {
  return require('./__mocks__/next-auth');
});

jest.mock('./app/api/auth/[...nextauth]/options', () => ({
  providers: [require('./__mocks__/next-auth')],
  adapter: jest.fn(),
  session: jest.fn(),
}));

// Mock the entire module
jest.mock('@/app/_lib/pages', () => {
  return require('./__mocks__/prisma');
});

jest.mock('@/app/_lib/pages', () => {
  return require('./__mocks__/prisma');
});

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve({ user: { name: 'testuser' }, expires: null });
      }),
  ),
}));

global.afterEach(async () => {
  await axe(document.body).then((result) => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(result).toHaveNoViolations();
  });
});