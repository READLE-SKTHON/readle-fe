import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";

import type { News } from "@/types/news";

type ArticleSheetProps = {
  news: News;
  onClose: () => void;
};

// 기사 게재일 표시 형식 (2026.09.01)
const formatPublishedDate = (publishedAt: string) => publishedAt.slice(0, 10).split("-").join(".");

// 지문 전체보기 바텀시트 (기사 원문 · 출처)
export default function ArticleSheet({ news, onClose }: ArticleSheetProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 배경 클릭 닫기 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 transition-opacity duration-300 starting:opacity-0"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="지문 전체보기"
        className="relative flex max-h-[85dvh] w-full max-w-97.5 flex-col rounded-t-3xl bg-white transition-transform duration-300 ease-out starting:translate-y-full"
      >
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-[#E3E2E2]" />

        <div className="flex shrink-0 items-center justify-between px-6 pt-4 pb-3">
          <h2 className="text-[20px] font-bold text-black">지문 전체보기</h2>

          <button type="button" onClick={onClose} aria-label="닫기" className="cursor-pointer">
            <X className="size-6 text-black" />
          </button>
        </div>

        {/* 기사 원문 (길면 시트 내부 스크롤) */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8">
          <h3 className="text-[18px] leading-7 font-bold text-black">{news.title}</h3>

          <p className="mt-3 text-[16px] leading-7 whitespace-pre-line text-black">
            {news.content}
          </p>

          {/* 출처 */}
          <div className="mt-6 flex items-center justify-between border-t border-[#E3E2E2] pt-4">
            <p className="text-[14px] font-medium text-[#8F8F8F]">
              출처 {news.publisher} · {formatPublishedDate(news.publishedAt)}
            </p>

            {news.sourceUrl && (
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[14px] font-semibold text-[#2285E3]"
              >
                원문 보기
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
