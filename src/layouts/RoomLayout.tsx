import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useRoomStore } from "@/stores/useRoomStore";

// 참여 중인 방 정보가 필요한 페이지 (초대·대기방·게임 진행·결과)
export default function RoomLayout() {
  const room = useRoomStore((state) => state.room);

  // 진입 시점 방 정보 유무 (방 나가기 처리 중 이동 경로 덮어쓰기 방지)
  const [hasRoomOnEnter] = useState(() => room !== null);

  // 방 정보 없이 진입 시 친구와 함께 화면 이동
  if (!hasRoomOnEnter) return <Navigate to="/game/friend" replace />;

  // 방 나가기 후 화면 이동 전 빈 화면
  return room ? <Outlet /> : null;
}
