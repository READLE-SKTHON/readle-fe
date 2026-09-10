type QuizMetaBarProps = {
  type: string;
  subtype?: string;
  onOpenNews: () => void;
};

export default function QuizMetaBar({ type, subtype, onOpenNews }: QuizMetaBarProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-[#D5EAFB] px-4 py-1 text-[14px] font-bold text-[#168CF2]">
        {subtype ? `${type} | ${subtype}` : type}
      </span>

      <button
        type="button"
        onClick={onOpenNews}
        className="cursor-pointer rounded-full bg-[#E8EE58] px-4 py-1 text-[14px] font-bold text-black"
      >
        지문 전체보기
      </button>
    </div>
  );
}
