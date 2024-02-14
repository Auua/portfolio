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
      (messageRef.current as HTMLElement).focus();

      const elementPosition = (
        messageRef.current as HTMLElement
      ).getBoundingClientRect().top;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, [focus]);

  return <div ref={messageRef}>{children}</div>;
};

export default FocusContent;
