type ExcerptBoxProps = {
  passage: string;
};

// 문제 풀이용 발췌 지문 박스
export default function ExcerptBox({ passage }: ExcerptBoxProps) {
  return (
    <div className="rounded-xl bg-[#F3F4FA] px-5 py-4">
      <p className="text-[16px] leading-7 break-keep whitespace-pre-line text-black">{passage}</p>
    </div>
  );
}
