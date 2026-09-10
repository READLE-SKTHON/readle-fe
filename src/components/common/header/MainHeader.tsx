import readleLogo from "@/assets/icons/header/readleLogo.png";
import bellIcon from "@/assets/icons/header/bellIcon.png";

type MainHeaderProps = {
  userName: string;
};

export default function MainHeader({ userName }: MainHeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6 pt-20">
      <img src={readleLogo} alt="READLE" className="w-38 object-contain" />

      <div className="flex items-center gap-1 pt-3">
        <span className="text-sm font-semibold">{userName}님</span>

        <button type="button">
          <img src={bellIcon} alt="알림" className="h-8 w-8"></img>
        </button>
      </div>
    </header>
  );
}
