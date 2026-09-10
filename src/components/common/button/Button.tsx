type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export default function Button({ label, disabled = false, onClick, className = "" }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-16 w-full rounded-2xl text-[20px] font-bold text-white transition-opacity ${
        disabled
          ? "cursor-not-allowed bg-[#A8A8A8]"
          : "cursor-pointer bg-[#2285E3] hover:opacity-90 active:opacity-80"
      } ${className}`}
    >
      {label}
    </button>
  );
}
