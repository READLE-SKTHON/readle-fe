type QuizMetaBarProps = {
  type: string;
  subtype?: string;
  canOpenNews?: boolean;
  onOpenNews: () => void;
};

export default function QuizMetaBar({
  type,
  subtype,
  canOpenNews = true,
  onOpenNews,
}: QuizMetaBarProps) {
  return (
    <div className="flex items-center justify-between">
      {/* 문제 유형 */}
      <span className="rounded-full bg-[#D5EAFB] px-4 py-1 text-[14px] font-bold text-[#168CF2]">
        {type}
        {subtype && ` | ${subtype}`}
      </span>

      {/* 지문 전체보기 */}
      {canOpenNews && (
        <button
          type="button"
          onClick={onOpenNews}
          className="cursor-pointer rounded-full px-4 py-1 text-[14px] font-bold text-black"
        >
          지문 전체보기
        </button>
      )}
    </div>
  );
}
