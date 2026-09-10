import { mockNews } from "@/mocks/news";

type NewsPreviewProps = {
  onOpen: () => void;
};

export default function NewsPreview({ onOpen }: NewsPreviewProps) {
  const news = mockNews;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer rounded-full bg-[#2285E3] text-white px-4 py-1 text-[14px] font-bold"
        >
          지문 전체보기
        </button>

        <span className="text-[14px] font-semibold text-gray-400">
          {formatDate(news.publishedAt)}
        </span>
      </div>

      <div className="mt-4 rounded-3xl bg-[#F5F6FC] px-7 py-6">
        <p className="line-clamp-5 text-[16px] leading-7 text-gray-700">{news.content.trim()}</p>
      </div>
    </section>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-");

  return `${year}년 ${month}월 ${day}일`;
}
