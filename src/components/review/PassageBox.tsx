type PassageBoxProps = {
  passage: string;

  // 밑줄 표시 구절 (지문 내 첫 번째 일치 구간)
  underline: string;
};

// 문제 대상 구절에 밑줄을 표시한 지문 박스
export default function PassageBox({ passage, underline }: PassageBoxProps) {
  const underlineIndex = underline ? passage.indexOf(underline) : -1;

  return (
    <div className="rounded-3xl bg-[#F5F6FC] px-7 py-6">
      <p className="text-[17px] leading-7 break-keep whitespace-pre-line text-black">
        {underlineIndex < 0 ? (
          passage
        ) : (
          <>
            {passage.slice(0, underlineIndex)}
            <span className="underline decoration-[#0083FF] decoration-3 underline-offset-6">
              {underline}
            </span>
            {passage.slice(underlineIndex + underline.length)}
          </>
        )}
      </p>
    </div>
  );
}
