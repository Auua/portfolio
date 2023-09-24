import '@/app/_styles/common.css';

import React from 'react';

type ButtonProps = {
  error?: boolean;
  children: any;
  onClick?: () => void;
  classNames?: string;
};

const Button = ({
  error = false, children, onClick, classNames = '',
}: ButtonProps) => (
  <button className={`${error ? 'error' : ''} ${classNames}`} onClick={onClick}>
    {children}
  </button>
);
export default Button;
