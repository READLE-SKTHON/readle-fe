// 닉네임+학교 로그인 요청 (학교 이름 줄임·정식 표기 모두 가능, 예: 서경대 / 서경대학교)
export interface LoginByNameRequest {
  nickname: string;
  schoolName: string;
}

// 로그인 응답 (userId는 이후 요청 X-USER-ID 헤더로 사용)
export interface LoginResponse {
  userId: number;
  nickname: string;

  // 학교 미등록 시 null
  schoolId: number | null;
  schoolName: string | null;
}
