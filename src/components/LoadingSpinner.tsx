interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ message, size = "lg" }: LoadingSpinnerProps) => {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  }[size];

  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <span className={`loading loading-spinner loading-${size} text-error`}></span>
        {message && (
          <p className="mt-4 text-base-content/70">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;