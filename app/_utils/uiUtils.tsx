import React from 'react';

export const mapParagraphs = (str: string) => str.split('\n')
  .map((text, index) => (
    <p key={`about-${index}`} className={'preline'}>
      {text}
    </p>
  ));

export const mapNestedList = (value: string[]) => (
  <ul className={'squared nested'}>
    {value.map((key) => <li key={key}>{key}</li>)}
  </ul>
);

export const mapRows = (data: Record<string, any>) => {
  const key = Object.keys(data)[0];
  const value = data[key];
  if (value !== null) {
    return (
      <li key={key}>
        <span className={'capitalize text-bold'}>{key.replace('_', ' ')}</span>:
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        {' '}{mapValues(key, value)}
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
    return <ul className={'nested'}>{Object.entries(value).map((data) => mapRows({ [data[0]]: data[1] }))}</ul>;
  }
  return value;
};
