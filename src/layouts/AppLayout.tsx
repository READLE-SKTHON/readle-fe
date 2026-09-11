import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUserStore } from "@/stores/useUserStore";

// 로그인 전 접근 가능 경로 (스플래시 · 로그인)
const PUBLIC_PATHS = ["/", "/login"];

export default function AppLayout() {
  const { pathname } = useLocation();

  const user = useUserStore((state) => state.user);

  // 로그인 전 다른 페이지 접근 시 로그인 이동
  const isLoginRequired = !user && !PUBLIC_PATHS.includes(pathname);

  return (
    <div className="mx-auto min-h-screen w-full max-w-97.5 bg-white">
      {isLoginRequired ? <Navigate to="/login" replace /> : <Outlet />}
    </div>
  );
}
