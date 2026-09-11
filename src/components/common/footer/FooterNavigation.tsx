import type { CSSProperties } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./FooterNavigation.css";

import bookIcon from "@/assets/icons/navigationIcons/bookIcon.png";
import bookActiveIcon from "@/assets/icons/navigationIcons/bookActiveIcon.png";

import gameIcon from "@/assets/icons/navigationIcons/gameIcon.png";
import gameActiveIcon from "@/assets/icons/navigationIcons/gameActiveIcon.png";

import trophyIcon from "@/assets/icons/navigationIcons/trophyIcon.png";
import trophyActiveIcon from "@/assets/icons/navigationIcons/trophyActiveIcon.png";

import userIcon from "@/assets/icons/navigationIcons/userIcon.png";
import userActiveIcon from "@/assets/icons/navigationIcons/userActiveIcon.png";

import whaleIcon from "@/assets/icons/navigationIcons/whaleIcon.png";
import whaleActiveIcon from "@/assets/icons/navigationIcons/whaleActiveIcon.png";

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  activeIcon: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "랭킹",
    path: "/ranking",
    icon: trophyIcon,
    activeIcon: trophyActiveIcon,
  },
  {
    label: "복습",
    path: "/review",
    icon: bookIcon,
    activeIcon: bookActiveIcon,
  },
  {
    label: "HOME",
    path: "/home",
    icon: whaleIcon,
    activeIcon: whaleActiveIcon,
  },
  {
    label: "게임",
    path: "/game",
    icon: gameIcon,
    activeIcon: gameActiveIcon,
  },
  {
    label: "마이페이지",
    path: "/my",
    icon: userIcon,
    activeIcon: userActiveIcon,
  },
];

export default function FooterNavigation() {
  const { pathname } = useLocation();

  // 현재 주소와 일치하는 네비게이션 메뉴 index 찾기
  const matchedIndex = navigationItems.findIndex(({ path }) => {
    // HOME은 정확히 "/"일 때만 활성화
    if (path === "/") {
      return pathname === "/";
    }

    // 하위 페이지에서도 해당 메뉴 활성화
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  // 일치하는 메뉴가 없으면 HOME을 기본 활성화
  const activeIndex = matchedIndex >= 0 ? matchedIndex : 2;

  // 현재 선택된 메뉴
  const activeItem = navigationItems[activeIndex];

  // 각 메뉴의 중앙 위치
  const notchPositions = ["10%", "30%", "50%", "70%", "90%"] as const;

  // 현재 선택된 메뉴 위치를 CSS에 전달
  const footerBackgroundStyle = {
    "--footer-notch-x": notchPositions[activeIndex],
  } as CSSProperties;

  return (
    <nav
      aria-label="하단 네비게이션"
      className="
        fixed bottom-0 left-1/2 z-50
        h-20 w-full max-w-97.5
        -translate-x-1/2
        overflow-visible
        bg-transparent
        pb-[env(safe-area-inset-bottom)]
      "
    >
      {/* 선택된 메뉴 주변이 곡선으로 파이는 푸터 배경 */}
      <div
        aria-hidden="true"
        className="
          footer-navigation-background
          pointer-events-none
          absolute inset-0 z-0
          bg-[#2F8DE4]
        "
        style={footerBackgroundStyle}
      />

      {/* 활성 원이 움직이는 영역 */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -top-7 left-0 z-20
          grid w-full grid-cols-5
        "
      >
        {/* 선택된 메뉴 위치로 활성 원 이동 */}
        <div
          className="
            col-start-1
            flex justify-center
            transition-transform duration-1100
            ease-[cubic-bezier(0.22,1,0.36,1)]
            will-change-transform
          "
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        >
          {/* 활성 메뉴 원형 도형 */}
          <div
            className="
              flex size-17
              items-center justify-center
              rounded-full
              bg-[#F4F34E]
              shadow-lg
            "
          >
            <img
              src={activeItem.activeIcon}
              alt=""
              aria-hidden="true"
              className="size-10 object-contain"
            />
          </div>
        </div>
      </div>

      {/* 메뉴 전체 영역 */}
      <div className="relative z-10 grid h-full w-full grid-cols-5">
        {navigationItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              aria-label={`${item.label} 페이지로 이동`}
              aria-current={isActive ? "page" : undefined}
              className="
                flex h-full flex-col
                items-center justify-end
                gap-1 pb-3
                outline-none
              "
            >
              {/* 비활성 메뉴 아이콘 */}
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className={`
                  size-7 object-contain
                  transition-opacity duration-200
                  ${isActive ? "opacity-0" : "opacity-100"}
                `}
              />

              <span
                className={`
                  text-xs
                  transition-colors duration-1000
                  ${isActive ? "font-bold text-[#F4F34E]" : "font-medium text-[#003F70]"}
                `}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
