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
        height="auto"
        viewBox="0 0 150 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          fontSize="100"
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
      <h1 className={'error-title'}>{title}</h1>
      {description && <p className={'error-desc'}>{description}</p>}
      {children}
    </div>
  );
};

export default Error;
