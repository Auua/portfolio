'use client';
import logoutAction from '@/actions/logoutAction';
import { useTranslations, useLocale } from 'next-intl';
import { SubmitButton } from './components/SubmitButton';
import ReturnButton from './components/ReturnButton';

export default function LogoutForm() {
  const t = useTranslations('Form.Logout');
  const language = useLocale();
  const id = 'logoutForm';

  const header = t('title');
  const buttons = [
    <SubmitButton formId={id} key={'submit'}>
      {t('submit')}
    </SubmitButton>,
  ];
  const form = (
    <form
      key={id}
      id={id}
      action={async () => {
        await logoutAction(language);
      }}
    >
      <div id={'formButtons'} className={'button-row start form'}>
        {buttons}
        <ReturnButton buttonType={'secondary'}>{t('cancel')}</ReturnButton>
      </div>
    </form>
  );

  return {
    header,
    content: form,
    isForm: true,
  };
}
