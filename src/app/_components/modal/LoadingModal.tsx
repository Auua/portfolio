import styles from '@/app/_styles/modal.module.css';
import LoadingComponent from '../loading/LoadingComponent';

export function LoadingModal() {
  return (
    <div role={'presentation'} className={styles.backdrop}>
      <div className={styles.content} role={'dialog'} aria-modal={true}>
        <LoadingComponent />
      </div>
    </div>
  );
}
