type ArticleTextProps = {
  title: string;
  content: string;
};

// 박스 없는 기사 제목·본문
export default function ArticleText({ title, content }: ArticleTextProps) {
  return (
    <article>
      <h2 className="text-[20px] leading-8 font-bold text-black">{title}</h2>

      <p className="mt-3 text-[16px] leading-7 whitespace-pre-line text-black">{content}</p>
    </article>
  );
}
