import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginIcon from "@/assets/icons/loginIcon.png";
import useLoginMutation from "@/queries/auth/useLoginMutation";
import { getApiError } from "@/utils/getApiError";

// 로그인 실패 안내 문구 (에러 코드별, 없으면 서버 메시지)
const LOGIN_ERROR_MESSAGES: Partial<Record<string, string>> = {
  A003: "등록되지 않은 사용자입니다.",
  A004: "닉네임과 학교 정보가 일치하지 않습니다.",
};

// 로그인 실패 안내 문구 변환
const getLoginErrorMessage = (error: Error) => {
  const { code, message } = getApiError(error);

  return (code ? LOGIN_ERROR_MESSAGES[code] : undefined) ?? message;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate: login, isPending, error, reset } = useLoginMutation();

  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");

  const isLoginEnabled = nickname.trim() !== "" && school.trim() !== "" && !isPending;

  // 로그인 처리 (앞뒤 공백 제거 후 요청, 성공 시 메인 페이지 이동)
  const handleLogin = () => {
    if (!isLoginEnabled) return;

    login(
      { nickname: nickname.trim(), schoolName: school.trim() },
      { onSuccess: () => navigate("/home") },
    );
  };

  return (
    <main className="min-h-screen bg-[#F0F8FF] px-5">
      {/* 로그인 로고 */}
      <img src={loginIcon} alt="Login" className="mx-auto w-60 pt-[20vh] object-contain" />

      {/* 로그인 폼 */}
      <section className="mt-10">
        <div>
          <label htmlFor="nickname" className="mb-3 block text-lg font-medium text-[#555555]">
            닉네임 / ID
          </label>

          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              reset();
            }}
            placeholder="닉네임을 입력하시오"
            className="
              h-16 w-full rounded-xl
              border border-[#5E5E5E]
              bg-white px-5
              text-base outline-none
              placeholder:text-[#B5B5B5]
              focus:border-[#2285E3]
            "
          />
        </div>

        <div className="mt-4">
          <label htmlFor="school" className="mb-3 block text-lg font-medium text-[#555555]">
            학교 / School
          </label>

          <input
            id="school"
            type="text"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              reset();
            }}
            placeholder="학교명을 입력하시오"
            className="
              h-16 w-full rounded-xl
              border border-[#555555]
              bg-white px-5
              text-base outline-none
              placeholder:text-[#B5B5B5]
              focus:border-[#2285E3]
            "
          />
        </div>

        {/* 로그인 실패 메시지 */}
        {error && <p className="mt-2 text-sm text-red-500">{getLoginErrorMessage(error)}</p>}

        <button
          type="button"
          disabled={!isLoginEnabled}
          onClick={handleLogin}
          className={`
            mt-12 h-16 w-full rounded-xl
            border border-[#555555]
            text-lg font-bold
            transition-colors
            ${
              isLoginEnabled
                ? "cursor-pointer bg-[#2285E3] text-white"
                : "cursor-not-allowed bg-[#E5E5E5] text-[#555555]"
            }
          `}
        >
          {isPending ? "로그인 중..." : "로그인 하기"}
        </button>
      </section>
    </main>
  );
}
