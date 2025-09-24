interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, message, icon }: EmptyStateProps) => {
  const defaultIcon = (
    <svg
      className="mx-auto h-16 w-16 text-base-content/30"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.063M6.343 6.343A8 8 0 0112 4c4.411 0 8 3.589 8 8a7.951 7.951 0 01-2.343 5.657M6.343 6.343L19.657 19.657"
      />
    </svg>
  );

  return (
    <div className="text-center py-16">
      <div className="mb-6">{icon || defaultIcon}</div>
      <h3 className="text-xl font-semibold text-base-content mb-2">{title}</h3>
      <p className="text-base-content/70 mb-4">{message}</p>
    </div>
  );
};

export default EmptyState;