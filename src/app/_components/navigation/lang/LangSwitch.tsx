import { TranslationProps } from '@/app/_types/common';
import { SUPPORTED_LANGUAGES } from '../../../../../i18n';
import LangSelect from './LangSelect';

export default function LangSwitch({ locale, t }: TranslationProps) {
  return (
    <LangSelect defaultValue={locale} label={t('LangSwitch.label')}>
      {SUPPORTED_LANGUAGES.map((cur) => (
        <option key={cur} value={cur}>
          {t('LangSwitch.locale', { locale: cur })}
        </option>
      ))}
    </LangSelect>
  );
}
