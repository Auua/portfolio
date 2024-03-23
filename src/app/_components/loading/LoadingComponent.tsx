import styles from '@/app/_styles/loading.module.css';

const LoadingComponent = ({
  translation = 'Loading...',
  size = 'large',
}: {
  translation?: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  if (size === 'small') {
    const smallerSize = {
      '--loading-size': '1rem',
      '--loading-border': '2px',
    } as React.CSSProperties;
    return (
      <div className={styles.loading} style={{ padding: 0 }}>
        <div className={styles.loader} style={smallerSize} />
        <span className="screen-reader-only">{translation}</span>
      </div>
    );
  }
  return (
    <div className={`center full`}>
      <div className={styles.loading}>
        <div className={styles.loader} />
        <span className="screen-reader-only">{translation}</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
