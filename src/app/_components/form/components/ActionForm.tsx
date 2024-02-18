'use client';
/// <reference types="react-dom/canary" />

import styles from '@/app/_styles/form.module.css';
import { FormResponse } from '@/app/_types/form';
import { TextField } from './InputField';
import { TranslatorProps } from '@/app/_types/common';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import FocusContent from './FocusContent';
import ReturnButton from './ReturnButton';

type FormProps<FormDataType> = {
  action: (
    prevState: Awaited<FormResponse<FormDataType>>,
    formData: FormData,
  ) => FormResponse<FormDataType> | Promise<FormResponse<FormDataType>>;
  id: string;
  fields: {
    [K in keyof FormDataType]: {
      required: boolean;
      autoComplete: string;
      type: string;
    };
  };
  buttons: React.ReactNode[];
} & TranslatorProps;

const Form = <FormDataType,>({
  t,
  action,
  id,
  fields,
  buttons,
}: FormProps<FormDataType>) => {
  const initialState: FormResponse<FormDataType> = {
    message: '',
    success: true,
  };

  const [state, formAction] = useFormState(action, initialState);

  const formT = useTranslations('Form');

  return (
    <form key={id} id={id} className={styles.contact} action={formAction}>
      {Object.keys(fields).map((key) => {
        const field = fields[key as keyof FormDataType];
        const errors = state?.errors?.[key as keyof FormDataType];
        const firstError = state.errors && Object.keys(state.errors)[0] === key;
        return (
          <TextField
            key={String(key)}
            t={t}
            errors={errors}
            name={String(key)}
            autoComplete={field.autoComplete}
            required={field.required}
            type={field.type}
            shouldFocus={firstError}
          />
        );
      })}
      <div id={'formButtons'} className={'button-row start form'}>
        {buttons}
        <button key={'reset'} className={'secondary'} type={'reset'}>
          {formT('reset')}
        </button>
        <ReturnButton buttonType={'secondary'}>{formT('return')}</ReturnButton>

        {state?.message &&
          (state.success ? (
            <FocusContent focus={true}>
              <p aria-live="polite" className={styles.success} role="status">
                {t(state?.message)}
              </p>
            </FocusContent>
          ) : (
            <FocusContent focus={!state?.errors}>
              <p aria-live="polite" className={styles.alert} role="alert">
                {t(state?.message)}
              </p>
            </FocusContent>
          ))}
      </div>
    </form>
  );
};

export default Form;
