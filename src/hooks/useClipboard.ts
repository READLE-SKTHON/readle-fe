// 클립보드 복사 및 성공 여부 반환
export default function useClipboard() {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  return { copy };
}
