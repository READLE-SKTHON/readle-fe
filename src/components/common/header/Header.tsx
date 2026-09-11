import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import chevronLeftIcon from "@/assets/icons/header/chevronLeftIcon.png";

type HeaderProps = {
  title: string;
  current?: number;
  total?: number;
  backPath?: string;
  rightElement?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
};

export default function Header({
  title,
  current,
  total,
  backPath,
  rightElement,
  onBack,
  showBack = true,
}: HeaderProps) {
  const navigate = useNavigate();

  const hasProgress = current !== undefined && total !== undefined;

  const handleBack = () => {
    // 뒤로가기 동작 직접 지정 시 우선 처리
    if (onBack) {
      onBack();
      return;
    }

    if (backPath) {
      navigate(backPath);
      return;
    }

    navigate(-1);
  };

  return (
    <header className="w-full bg-white">
      <div className="relative flex h-20 items-center justify-center px-5 pt-5">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-5 cursor-pointer text-2xl"
            aria-label="뒤로가기"
          >
            <img src={chevronLeftIcon} alt="" className="w-3" />
          </button>
        )}

        <h1 className="text-[20px] font-bold">{title}</h1>

        {hasProgress && (
          <span className="absolute right-5 text-[14px] font-semibold">
            {current}/{total}
          </span>
        )}

        {/* 헤더 우측 아이콘 영역 */}
        {rightElement && <div className="absolute right-5">{rightElement}</div>}
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
