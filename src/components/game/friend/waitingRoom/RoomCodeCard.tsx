type RoomCodeCardProps = {
  roomCode: string;
  onCopy: () => void;
};

export default function RoomCodeCard({ roomCode, onCopy }: RoomCodeCardProps) {
  return (
    <div className="flex h-22 items-center justify-between rounded-2xl bg-[#E8F1F9] pr-4 pl-12">
      <div className="flex flex-col items-center">
        <p className="text-[16px] font-semibold text-[#5E5E5E]">방 코드</p>

        <p className="text-[32px] leading-tight font-extrabold text-black">{roomCode}</p>
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="h-8 cursor-pointer rounded-full bg-[#CEE5F8] px-5 text-[16px] font-bold text-[#0083FF]"
      >
        복사
      </button>
    </div>
  );
}
