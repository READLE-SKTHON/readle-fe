type ErrorStateProps = {
  message: string;
  onRetry: () => void;
  className?: string;
};

// 요청 실패 안내 및 다시 시도
export default function ErrorState({ message, onRetry, className = "" }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <p className="text-center text-[16px] leading-6 font-semibold break-keep whitespace-pre-line text-[#8F8F8F]">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="h-10 cursor-pointer rounded-full bg-[#CEE5F8] px-6 text-[16px] font-bold text-[#0083FF]"
      >
        다시 시도
      </button>
    </div>
  );
}
