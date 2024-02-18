'use client';
import loginAction from '@/actions/loginActions';
import { useTranslations } from 'next-intl';
import { BsEnvelopeArrowUp } from 'react-icons/bs';
import { SubmitButton } from './components/SubmitButton';
import Form from './components/ActionForm';
import { LoginFormData } from '@/app/_types/form';
import { usePathname } from 'next/navigation';

export default function LoginForm() {
  const t = useTranslations('Form.Login');
  const nav = usePathname();

  const fields = {
    username: { required: true, autoComplete: 'username', type: 'text' },
    password: {
      required: true,
      autoComplete: 'current-password',
      type: 'password',
    },
  };

  const id = 'loginForm';

  const header = t('title');
  const buttons = [
    <input key={'locale'} type={'hidden'} name={'nextUrl'} value={nav} />,
    <SubmitButton formId={id} key={'submit'}>
      <BsEnvelopeArrowUp /> {t('submit')}
    </SubmitButton>,
  ];
  const form = (
    <Form<LoginFormData>
      t={t}
      action={loginAction}
      fields={fields}
      id={id}
      buttons={buttons}
    />
  );

  return {
    header,
    content: form,
    isForm: true,
  };
}
