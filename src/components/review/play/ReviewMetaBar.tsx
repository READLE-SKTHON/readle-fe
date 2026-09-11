import QuizMetaBar from "@/components/quiz/question/QuizMetaBar";

type ReviewMetaBarProps = {
  // 훈련하기 유형 태그 (예: 정보추출 | 일치/불일치)
  typeName: string;
  subType: string;

  // 동일 유형 신규 지문 응용 문제 여부
  isApply: boolean;

  onOpenNews: () => void;
};

// 훈련하기 문제 유형·지문 전체보기 (응용 문제 태그 포함)
export default function ReviewMetaBar({
  typeName,
  subType,
  isApply,
  onOpenNews,
}: ReviewMetaBarProps) {
  return (
    <>
      <QuizMetaBar type={typeName} subtype={subType} onOpenNews={onOpenNews} />

      {/* 응용 문제 태그 */}
      {isApply && (
        <span className="mt-6 inline-block rounded-full bg-[#2285E3] px-4 py-1 text-[14px] font-bold text-white">
          응용
        </span>
      )}
    </>
  );
}
