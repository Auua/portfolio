'use client';
import styles from '@/app/_styles/modal.module.css';
import { useTranslations } from 'next-intl';
import useModalClosure from '@/app/_hooks/useModalClosure';
import React from 'react';

export function Modal({
  header,
  content,
  isForm = false,
}: {
  header: string;
  content: JSX.Element;
  isForm?: boolean;
}) {
  const t = useTranslations('Modal');
  /* handle modal closure */
  const { contentRef, closeModal } = useModalClosure();

  return (
    <div role={'presentation'} className={styles.backdrop}>
      <div
        className={styles.content}
        ref={contentRef}
        role={'dialog'}
        aria-modal={true}
        aria-labelledby={'modalHeading'}
        aria-describedby={'modalContent'}
      >
        <div className={styles.header}>
          <h2 id={'modalHeading'}>{header}</h2>
          <button className={styles.top} onClick={closeModal}>
            X
          </button>
        </div>
        <div id={'modalContent'}>{content}</div>
        {!isForm ? (
          <div className={'button-row end'}>
            <button onClick={closeModal}>{t('close')}</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
