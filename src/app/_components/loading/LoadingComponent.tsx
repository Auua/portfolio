import styles from '@/app/_styles/loading.module.css';

const LoadingComponent = ({
  translation = 'Loading...',
}: {
  translation?: string;
}) => {
  return (
    <div className={`center`}>
      <div className={styles.loading}>
        <div className={styles.loader} />
        <span className="screen-reader-only">{translation}</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
