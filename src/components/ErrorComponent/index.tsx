import AlertIcon from "../icons/AlertIcon";

export interface ErrorProps {
  title?: string;
  error: unknown;
}

const ErrorComponent = ({ title, error }: ErrorProps) => {
  if (!error) return null;
  return (
    <div className="bg-red-500/50 rounded-lg p-4 text-teal-50 font-medium flex items-center gap-4 m-4">
      <AlertIcon className="inline" />
      <div className="flex flex-col gap-1">
        {title && <p>{title}</p>}
        <p>{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
