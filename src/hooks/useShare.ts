import useClipboard from "@/hooks/useClipboard";

type ShareResult = "shared" | "cancelled" | "copied" | "failed";

// 링크 공유 (Web Share API 미지원 시 클립보드 복사)
export default function useShare() {
  const { copy } = useClipboard();

  const share = async (url: string): Promise<ShareResult> => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ url });
        return "shared";
      } catch (error) {
        // 사용자 공유 취소
        if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
      }
    }

    const isCopied = await copy(url);

    return isCopied ? "copied" : "failed";
  };

  return { share };
}
