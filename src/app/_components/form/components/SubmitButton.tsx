'use client';
import styles from '@/app/_styles/form.module.css';
import { useFormStatus } from 'react-dom';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';

type SubmitButtonProps = {
  formId: string;
  children: React.ReactNode;
};

export const SubmitButton = ({ formId, children }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      key={`${formId}Submit`}
      className={styles.submit}
      type={'submit'}
      form={formId}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? <LoadingComponent size={'small'} /> : children}
    </button>
  );
};
