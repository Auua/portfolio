import { useTranslations } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../../i18n';
import LangSelect from './LangSelect';

export default function LangSwitch({ locale }) {
  const t = useTranslations('LangSwitch');

  return (
    <LangSelect defaultValue={locale} label={t('label')}>
      {SUPPORTED_LANGUAGES.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </option>
      ))}
    </LangSelect>
  );
}
