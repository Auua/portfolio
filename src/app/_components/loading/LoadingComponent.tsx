const LoadingComponent = ({
  translation = 'Loading...',
}: {
  translation?: string;
}) => {
  return (
    <div className="loading center">
      <div className="loader" />
      <span className="screen-reader-only">{translation}</span>
    </div>
  );
};

export default LoadingComponent;
