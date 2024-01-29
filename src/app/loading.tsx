import '@/app/_styles/loading.css';
import { DEFAULT_LOCALE } from '../../i18n';
import LoadingComponent from './_components/loading/LoadingComponent';

export default async function Loading() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <LoadingComponent />
      </body>
    </html>
  );
}
