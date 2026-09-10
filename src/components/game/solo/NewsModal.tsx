import type { News } from "@/types/news";

type NewsModalProps = {
  news: News;
  onClose: () => void;
};

export default function NewsModal({ news, onClose }: NewsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="mx-auto flex min-h-screen w-full max-w-97.5 items-center px-5">
        <div className="w-full rounded-3xl bg-white p-6">
          {/* 상단 */}
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold">지문 전체보기</h2>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-2xl"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          {/* 뉴스 본문 */}
          <div className="mt-4 max-h-[55vh] overflow-y-auto rounded-2xl bg-[#F5F6FC] p-5">
            <p className="whitespace-pre-line text-[16px] leading-7 text-gray-700">
              {news.content.trim()}
            </p>
          </div>

          {/* 닫기 */}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 h-14 w-full cursor-pointer rounded-2xl bg-black text-[18px] font-bold text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
