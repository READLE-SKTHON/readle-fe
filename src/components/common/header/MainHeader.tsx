import readleLogo from "@/assets/icons/header/readleLogo.png";
import bellIcon from "@/assets/icons/header/bellIcon.png";

type MainHeaderProps = {
  userName: string;

  // 알림 개수 (없으면 배지 미표시)
  notificationCount?: number;
};

export default function MainHeader({ userName, notificationCount = 0 }: MainHeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6 pt-15">
      <img src={readleLogo} alt="READLE" className="w-38 object-contain" />

      <div className="flex items-center gap-1 pt-3">
        <span className="text-sm font-semibold">{userName}님</span>

        <button type="button" className="relative">
          <img src={bellIcon} alt="알림" className="h-8 w-8"></img>

          {/* 알림 개수 배지 */}
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
