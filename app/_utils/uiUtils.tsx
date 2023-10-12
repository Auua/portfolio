import '@/app/_styles/common.css';
import React from 'react';
import { removeUnderscore } from '@/app/_utils/stringUtils';

export const mapParagraphs = (str: string) =>
  str
    .split('\n')
    .filter((text) => text !== '' || text !== undefined)
    .map((text, index) => (
      <p key={`about-${index}`} className={'preline'}>
        {text}
      </p>
    ));

export const mapMultiSections = (str: string) =>
  str.split('“').map((section, index) => {
    if (section === '') return null;
    const [title, content] = section.split(':”\n');
    return (
      <section key={`multi-section section-${index}`} className={'sub-section'}>
        <h2>{title}</h2>
        <div className={'sub-section__content'}>{mapParagraphs(content)}</div>
      </section>
    );
  });

export const mapNestedList = (value: string[]) => (
  <ul className={'squared nested'}>
    {value.map((key) => (
      <li key={key}>{key}</li>
    ))}
  </ul>
);

export const mapRows = (data: { [p: string]: string[] | string | null }) => {
  const key = Object.keys(data)[0];
  const value = data[key];
  if (value !== null) {
    return (
      <li key={key}>
        <span className={'capitalize text-bold'}>{removeUnderscore(key)}</span>:
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}{' '}
        {mapValues(key, value)}
      </li>
    );
  }
  return null;
};

export const mapValues = (key: string, value: string | string[] | object) => {
  if (Array.isArray(value)) {
    return mapNestedList(value);
  }
  if (typeof value === 'object') {
    return (
      <ul className={'nested'}>
        {Object.entries(value).map((data) => mapRows({ [data[0]]: data[1] }))}
      </ul>
    );
  }
  return value;
};
