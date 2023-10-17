/**
 * @jest-environment jsdom
 */

import { useHashChange } from '@/app/_hooks';
import { renderComponent } from '@/__tests__/__utils__/testUtils';

let addEventListenerSpy: jest.SpyInstance;
let removeEventListenerSpy: jest.SpyInstance;

beforeEach(() => {
  addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
});

afterEach(() => {
  addEventListenerSpy.mockRestore();
  removeEventListenerSpy.mockRestore();
});

const TestComponent = ({ callback }: { callback: () => void }) => {
  useHashChange(callback);
  return <div />;
};

it('should call callback on hash change', async () => {
  const callback = jest.fn();

  renderComponent(<TestComponent callback={callback} />);

  const newHash = '#newhash';
  window.location.hash = newHash;

  window.dispatchEvent(new Event('hashchange'));

  expect(callback).toHaveBeenCalledWith(newHash);
});
