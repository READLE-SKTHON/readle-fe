import { mockNews } from "@/mocks/news";

export default function NewsPreview() {
  const news = mockNews;

  return (
    <section className="mb-8">
      <div className="mt-4 rounded-3xl bg-[#F5F6FC] px-7 py-6">
        <p className="line-clamp-5 text-[16px] leading-7 text-gray-700">{news.content.trim()}</p>
      </div>
    </section>
  );
}
