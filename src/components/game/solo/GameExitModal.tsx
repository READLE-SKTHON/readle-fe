type GameExitModalProps = {
  onClose: () => void;
  onExit: () => void;
};

export default function GameExitModal({ onClose, onExit }: GameExitModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* 배경 */}
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* 모달 */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white px-6 py-7">
        <h2 className="text-center text-[20px] font-bold">게임을 종료할까요?</h2>

        <p className="mt-3 text-center text-[15px] leading-6 text-gray-500">
          지금 나가면 진행 중인
          <br />
          문제 풀이가 저장되지 않아요.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-13 cursor-pointer rounded-2xl bg-[#F1F3F5] text-[16px] font-semibold text-gray-600"
          >
            계속하기
          </button>

          <button
            type="button"
            onClick={onExit}
            className="h-13 cursor-pointer rounded-2xl bg-[#2285E3] text-[16px] font-semibold text-white"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
