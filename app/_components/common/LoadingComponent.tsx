import React from 'react';

type LoadingProps = {
  type?: string
};
const LoadingComponent = ({ type }: LoadingProps) => (
  <div className='loading center'>
    <div className='loader' />
    <span className='visually--hidden'>{`Loading${type ? ` ${type}` : ''}...`}</span>
  </div>
);
export default LoadingComponent;
