type LoadingStateProps = {
  message: string;
  className?: string;
};

// 데이터 불러오는 중 안내
export default function LoadingState({ message, className = "" }: LoadingStateProps) {
  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <span className="size-9 animate-spin rounded-full border-4 border-[#CEE5F8] border-t-[#2285E3]" />

      <p className="text-[16px] font-semibold text-[#8F8F8F]">{message}</p>
    </div>
  );
}
