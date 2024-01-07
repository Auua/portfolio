import { Cormorant, Karla, Quicksand } from 'next/font/google';

export const cormorant = Cormorant({ style: ['italic'], subsets: ['latin'] });
export const karla = Karla({ subsets: ['latin'] });
export const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--quicksand-font',
});
