import { NavLink } from "react-router-dom";

import bookIcon from "@/assets/icons/navigationIcons/bookIcon.png";
import gameIcon from "@/assets/icons/navigationIcons/gameIcon.png";
import trophyIcon from "@/assets/icons/navigationIcons/trophyIcon.png";
import userIcon from "@/assets/icons/navigationIcons/userIcon.png";
import whaleIcon from "@/assets/icons/navigationIcons/whaleIcon.png";

const navigationItems = [
  {
    label: "랭킹",
    path: "/ranking",
    icon: trophyIcon,
  },
  {
    label: "훈련",
    path: "/training",
    icon: bookIcon,
  },
  {
    label: "게임",
    path: "/game",
    icon: gameIcon,
  },
  {
    label: "마이페이지",
    path: "/my",
    icon: userIcon,
  },
];

type NavItemProps = {
  item: {
    label: string;
    path: string;
    icon: string;
  };
};

function NavItem({ item }: NavItemProps) {
  return (
    <NavLink
      to={item.path}
      className="flex w-14 flex-col items-center gap-1 text-xs font-semibold text-[#003F70]"
    >
      <img src={item.icon} alt={item.label} className="h-6 w-6 object-contain" />

      <span>{item.label}</span>
    </NavLink>
  );
}

export default function FooterNavigation() {
  return (
    <footer className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 bg-[#2F8DE4]">
      <nav className="relative flex h-20 items-center justify-around px-3">
        <NavItem item={navigationItems[0]} />

        <NavItem item={navigationItems[1]} />

        <NavLink to="/" className="relative flex w-16 flex-col items-center justify-center">
          <div className="absolute -top-11 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F34E]">
            <img src={whaleIcon} alt="홈" className="h-10 w-10 object-contain" />
          </div>

          <span className="mt-10 rounded-full bg-[#F4F34E] px-2 py-0.5 text-[10px] font-bold text-[#2F8DE4]">
            HOME
          </span>
        </NavLink>

        <NavItem item={navigationItems[2]} />

        <NavItem item={navigationItems[3]} />
      </nav>
    </footer>
  );
}
