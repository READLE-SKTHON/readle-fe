import { mockNews } from "@/mocks/news";

type NewsPreviewProps = {
  // 미리보기 본문 (없으면 기본 기사)
  content?: string;
};

export default function NewsPreview({ content }: NewsPreviewProps) {
  const news = mockNews;

  return (
    <section className="mb-8">
      <div className="mt-4 rounded-3xl bg-[#F5F6FC] px-7 py-6">
        <p className="line-clamp-5 text-[16px] leading-7 text-gray-700">
          {(content ?? news.content).trim()}
        </p>
      </div>
    </section>
  );
}
