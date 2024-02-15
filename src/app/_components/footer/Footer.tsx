import styles from '@/app/_styles/footer.module.css';
import { getTranslations } from 'next-intl/server';
import { BsEnvelopeArrowUp, BsGithub, BsLinkedin } from 'react-icons/bs';
import { Link } from '@/i18n';

const Footer = async () => {
  const t = await getTranslations('Footer');
  return (
    <footer className={styles.placeholder}>
      <div className={styles.main}>
        <div className={`button-row ${styles.group}`}>
          <Link
            href={t('socials.github.url')}
            aria-label={t('socials.github.alt')}
          >
            <BsGithub title={t('socials.github.alt')} size={25} />
          </Link>
          <Link
            href={t('socials.linkedin.url')}
            aria-label={t('socials.linkedin.alt')}
          >
            <BsLinkedin title={t('socials.linkedin.alt')} size={25} />
          </Link>
          <Link
            href={t('socials.contact.url')}
            aria-label={t('socials.contact.alt')}
          >
            <BsEnvelopeArrowUp title={t('socials.contact.alt')} size={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
