const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-[var(--text-color)] rounded-lg">
      <div
        style={{ width: `${progress}%` }}
        className={`h-5 w- bg-green-600`}
      ></div>
    </div>
  );
};
export default ProgressBar;
