interface LoadingSpinnerProps {
  message?: string;
}
import GIF from "../assets/cat Mark loading.gif";

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <img src={GIF} alt="" />
        {/* <span
          className={`loading loading-spinner loading-${size} text-error`}
        ></span> */}
        {message && <p className="mt-4 text-base-content/70">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
