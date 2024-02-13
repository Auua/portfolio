import styles from '@/app/_styles/form.module.css';
import { TranslatorProps } from '@/app/_types/common';
import { BsExclamationTriangle } from 'react-icons/bs';
import FocusContent from './FocusContent';

type ErrorMessageProps = {
  name: string;
  messages: string[];
  shouldFocus?: boolean;
} & TranslatorProps;

type InputFieldProps = {
  errors?: string[];
  type?: string;
  name: string;
  autoComplete: string;
  required: boolean;
  shouldFocus?: boolean;
} & TranslatorProps;

const errorMessages = ({ name, messages, t, shouldFocus }: ErrorMessageProps) => (
  <FocusContent focus={shouldFocus}>
    <div className={styles.error} id={`${name}Error`} role={'alert'}>
      <BsExclamationTriangle /> {messages.map((error) => t(error)).join(', ')}
    </div>
  </FocusContent>
);

export const InputField = ({
  t,
  errors,
  type,
  name,
  autoComplete,
  required,
  shouldFocus,
}: InputFieldProps) => {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {t(name)}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        aria-describedby={`${name}Error`}
      />
      {errors && errorMessages({ messages: errors, t, name, shouldFocus })}
    </>
  );
};

export const TextAreaField = ({
  t,
  errors,
  name,
  autoComplete,
  required,
  shouldFocus,
}: InputFieldProps) => {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {t(name)}
        <textarea
          className={styles.input}
          id={name}
          name={name}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          aria-describedby={`${name}Error`}
        />
      </label>
      {errors && errorMessages({ messages: errors, t, name, shouldFocus })}
    </>
  );
};

export const TextField = ({
  t,
  errors,
  type = 'text',
  name,
  autoComplete,
  required,
}: InputFieldProps) => {
  if (type === 'textarea') {
    return (
      <TextAreaField
        t={t}
        errors={errors}
        name={name}
        autoComplete={autoComplete}
        required={required}
      />
    );
  } else {
    return (
      <InputField
        t={t}
        errors={errors}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
      />
    );
  }
};
