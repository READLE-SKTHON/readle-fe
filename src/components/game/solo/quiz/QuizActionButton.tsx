type QuizActionButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function QuizActionButton({
  label,
  disabled = false,
  onClick,
}: QuizActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`mt-8 h-16 w-full rounded-2xl text-[18px] font-bold ${
        disabled
          ? "cursor-not-allowed bg-gray-200 text-gray-400"
          : "cursor-pointer bg-black text-white"
      }`}
    >
      {label}
    </button>
  );
}
