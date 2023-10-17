/**
 * @jest-environment jsdom
 */

import { usePageScroll } from '@/app/_hooks';
import { renderComponent } from '@/__tests__/__utils__/testUtils';

let sections: Element[];
let addEventListenerSpy: jest.SpyInstance;
let removeEventListenerSpy: jest.SpyInstance;

beforeEach(() => {
  sections = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
  ];
  // @ts-ignore
  document.querySelectorAll = jest.fn(() => sections);

  addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
});

afterEach(() => {
  addEventListenerSpy.mockRestore();
  removeEventListenerSpy.mockRestore();
});

const TestComponent = ({ callback }: { callback: () => void }) => {
  usePageScroll(callback);
  return <div />;
};

it('updates the hash when scrolling', () => {
  const callback = jest.fn();
  renderComponent(<TestComponent callback={callback} />);

  expect(window.location.hash).toEqual('');

  sections.forEach((section, index) => {
    // @ts-ignore
    section.getBoundingClientRect = () => ({
      top: index * 100,
      bottom: window.innerHeight / 2,
    });
    section.getAttribute = () => `section-id-${index}`;
  });

  const event = new Event('scroll');
  window.dispatchEvent(event);

  expect(callback).toHaveBeenCalledWith('#section-id-2');
  expect(window.location.hash).toEqual('#section-id-2');
});
