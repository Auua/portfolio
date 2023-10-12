import React from 'react';

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
  type?: string;
};
const Header = ({ title, type, children }: HeaderProps) => (
  <header className={`main__header ${type ?? ''}`}>
    <h1>{title}</h1>
    {children}
  </header>
);
export default Header;
