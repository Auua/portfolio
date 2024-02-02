import styles from '@/app/_styles/error.module.css';

type ErrorComponentProps = {
  statusCode: number;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const Error = ({
  statusCode,
  title,
  description,
  children,
}: ErrorComponentProps) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 150 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          fontSize="80"
          stroke="var(--primary)"
          strokeWidth="3px"
          fill="var(--highlight)"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontWeight="700"
        >
          {statusCode}
        </text>
      </svg>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};

export default Error;
