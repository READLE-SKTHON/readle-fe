type ButtonVariant = "primary" | "black" | "gray";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  variant?: ButtonVariant;
};

// 버튼 배경색 (gray는 비활성과 같은 색이지만 클릭 가능한 보조 버튼)
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#2285E3]",
  black: "bg-black",
  gray: "bg-[#A8A8A8]",
};

export default function Button({
  label,
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-16 w-full rounded-2xl text-[20px] font-bold text-white transition-opacity ${
        disabled
          ? "cursor-not-allowed bg-[#A8A8A8]"
          : `cursor-pointer ${variantStyles[variant]} hover:opacity-90 active:opacity-80`
      } ${className}`}
    >
      {label}
    </button>
  );
}
