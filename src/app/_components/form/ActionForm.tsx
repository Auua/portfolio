'use client';
import styles from '@/app/_styles/form.module.css';
import { FormResponse } from '@/app/_types/form';
import { TextField } from './InputField';
import { TranslatorProps } from '@/app/_types/common';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n';

type FormProps<FormDataType> = {
  action: (
    prevState: FormResponse<FormDataType>,
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

export const Form = <FormDataType,>({
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
  const router = useRouter();

  const returnBack = () => {
    router.back();
  };

  return (
    <>
      <form key={id} id={id} className={styles.contact} action={formAction}>
        {Object.keys(fields).map((key) => {
          const field = fields[key as keyof FormDataType];
          return (
            <TextField
              key={String(key)}
              t={t}
              errors={state?.errors?.nested?.[key as keyof FormDataType]}
              name={String(key)}
              autoComplete={field.autoComplete}
              required={field.required}
              type={field.type}
            />
          );
        })}
        <div id={'formButtons'} className={'button-row end'}>
          <button className={'secondary'} onClick={returnBack}>
            {formT('return')}
          </button>
          <button key={'reset'} className={'secondary'} type={'reset'}>
            {formT('reset')}
          </button>
          {buttons}
        </div>
      </form>
      {state?.message &&
        (state.success ? (
          <p aria-live="polite" role="status">
            {t(state?.message)}
          </p>
        ) : (
          <p aria-live="polite" role="alert">
            {t(state?.message)}
          </p>
        ))}
    </>
  );
};
