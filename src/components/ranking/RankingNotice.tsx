type RankingNoticeProps = {
  message: string;
};

// 디자인 없는 상태 안내 카드 (학교 미등록 · 친구 0명)
export default function RankingNotice({ message }: RankingNoticeProps) {
  return (
    <p className="rounded-2xl bg-[#E8F1F9] px-5 py-4 text-center text-[14px] font-semibold break-keep text-[#5E5E5E]">
      {message}
    </p>
  );
}
