import { useTranslations } from 'next-intl';
import LoadingComponent from '../_components/loading/LoadingComponent';

export default function Loading() {
  const t = useTranslations('Common');

  return <LoadingComponent translation={t('loading')} />;
}
