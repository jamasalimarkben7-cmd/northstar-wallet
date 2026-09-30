export default function Spinner({ size = 16, className = "" }) {
  return (
    <svg
      className={`spinner ${className}`}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="loading"
      role="status"
    >
      <title>Loading</title>
      <path d="M11 2v4m7.45 2.55A7.5 7.5 0 1 1 3.5 11" />
    </svg>
  );
}
