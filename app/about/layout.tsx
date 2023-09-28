import './page.module.css';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'page-container--full'}>
      {children}
    </div>
  );
}
