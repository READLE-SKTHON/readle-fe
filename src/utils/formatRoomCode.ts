import { ROOM_CODE_LENGTH } from "@/config/roomConfig";

// 방 코드 표시 형식 (4자리 문자열, 예: 17 → 0017)
export const formatRoomCode = (roomCode: number) =>
  String(roomCode).padStart(ROOM_CODE_LENGTH, "0");
