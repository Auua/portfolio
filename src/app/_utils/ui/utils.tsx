export const NestedList = ({
  data,
  styles,
}: {
  data: string | (string | number | object)[] | object | null;
  styles?: string;
}) => {
  if (!data) return <></>;

  const mapValues = (
    currentValue: string | (string | number | object)[] | object,
  ) => {
    if (Array.isArray(currentValue)) {
      return (
        <ul key={'arr-list'} className={styles}>
          {currentValue.map((item, index) => (
            <li key={index}>{mapValues(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof currentValue === 'object' && currentValue !== null) {
      return (
        <ul key={'object-list'} className={styles}>
          {Object.entries(currentValue).map(([key, val]) => {
            if (val) {
              return (
                <li key={key}>
                  <span className={'capitalize text-bold'}>{key}:</span>{' '}
                  {mapValues(val)}
                </li>
              );
            }
          })}
        </ul>
      );
    }
    return currentValue;
  };

  return <>{mapValues(data)}</>;
};

export const mapParagraphs = (str: string) =>
  str
    .split('\n')
    .filter((text) => text !== '' || text !== undefined)
    .map((text, index) => (
      <p key={`about-${index}`} className={'preline'}>
        {text}
      </p>
    ));
