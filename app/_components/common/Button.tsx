import '@/app/_styles/common.css';

import React from 'react';

type ButtonProps = {
  error?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  classNames?: string;
  ariaLabel?: string;
};

const Button = ({
  ariaLabel,
  error = false,
  children,
  onClick,
  classNames = '',
}: ButtonProps) => (
  <button
    aria-label={ariaLabel}
    className={`btn ${error ? 'error' : ''} ${classNames}`}
    onClick={onClick}
  >
    {children}
  </button>
);
export default Button;
