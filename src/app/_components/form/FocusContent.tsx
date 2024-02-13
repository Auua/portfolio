'use client';
import React, { useEffect, useRef } from 'react';

const FocusContent = ({
  focus,
  children,
}: {
  focus: boolean;
  children: React.ReactNode;
}) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current && focus) {
      (messageRef.current as HTMLElement)?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [focus]);

  return <div ref={messageRef}>{children}</div>;
};

export default FocusContent;
