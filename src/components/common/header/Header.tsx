import { useNavigate } from "react-router-dom";

import chevronLeftIcon from "@/assets/icons/chevronLeftIcon.png";

type HeaderProps = {
  title: string;
  current?: number;
  total?: number;
};

export default function Header({ title, current, total }: HeaderProps) {
  const navigate = useNavigate();

  const hasProgress = current !== undefined && total !== undefined;

  return (
    <header className="w-full bg-white">
      <div className="relative flex h-20 items-center justify-center px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-5 text-2xl cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={chevronLeftIcon} className="w-3"></img>
        </button>

        <h1 className="text-[20px] text-base font-semibold">{title}</h1>

        {hasProgress && (
          <span className="absolute right-5 text-[14px] font-semibold">
            {current}/{total}
          </span>
        )}
      </div>

      {hasProgress && (
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-black"
            style={{
              width: `${(current / total) * 100}%`,
            }}
          />
        </div>
      )}
    </header>
  );
}
