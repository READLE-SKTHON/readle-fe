import { useState } from "react";

import loginIcon from "@/assets/icons/loginIcon.png";

export default function LoginPage() {
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");

  const isLoginEnabled = nickname.trim() !== "" && school.trim() !== "";

  const handleLogin = () => {
    if (!isLoginEnabled) return;

    // TODO: 데모 계정 로그인 로직 추가
    console.log("로그인", { nickname, school });
  };

  return (
    <main className="min-h-screen px-5 bg-[#F0F8FF]">
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
            onChange={(e) => setNickname(e.target.value)}
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
            onChange={(e) => setSchool(e.target.value)}
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
          로그인 하기
        </button>
      </section>
    </main>
  );
}
