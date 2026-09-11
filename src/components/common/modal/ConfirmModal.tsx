type ConfirmModalProps = {
  message: string;

  // 확인 버튼 문구
  confirmLabel?: string;

  // 취소 버튼 문구 (없으면 확인 버튼만 표시)
  cancelLabel?: string;

  onConfirm: () => void;
  onCancel?: () => void;
};

// 안내·확인 모달 (게임 종료 경고 모달과 같은 구성)
export default function ConfirmModal({
  message,
  confirmLabel = "확인",
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // 배경·취소 클릭 처리 (취소 동작 없으면 확인 동작)
  const handleCancel = onCancel ?? onConfirm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* 배경 */}
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={handleCancel}
        className="absolute inset-0 bg-black/40"
      />

      {/* 모달 */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white px-6 py-7">
        <p className="text-center text-[18px] leading-7 font-bold break-keep whitespace-pre-line text-black">
          {message}
        </p>

        <div className={`mt-7 grid gap-3 ${cancelLabel ? "grid-cols-2" : "grid-cols-1"}`}>
          {cancelLabel && (
            <button
              type="button"
              onClick={handleCancel}
              className="h-13 cursor-pointer rounded-2xl bg-[#F1F3F5] text-[16px] font-semibold text-gray-600"
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className="h-13 cursor-pointer rounded-2xl bg-[#2285E3] text-[16px] font-semibold text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
