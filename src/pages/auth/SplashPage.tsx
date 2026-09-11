import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import splashLogo from "@/assets/icons/splashLogo.png";
import splashBeluga from "@/assets/images/splashBeluga.png";
import splashText from "@/assets/icons/splashText.png";

import { useUserStore } from "@/stores/useUserStore";

export default function SplashPage() {
  const navigate = useNavigate();

  // 로그인 사용자 (로그인 상태면 홈 이동)
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(user ? "/home" : "/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2285E3]">
      {/* 로고 + 문구 */}
      <section className="absolute top-[25%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
        <img src={splashLogo} alt="READLE" className="w-90 max-w-none object-contain" />

        <img
          src={splashText}
          alt="세상에서 가장 재미있는 문해력 훈련, 이거 코드로 해봤는데 효과가 많이 들어간 글씨라서 이미지 넣은게 더 나음"
          className="mt-5 w-63 object-contain"
        />
      </section>

      {/* 벨루가 */}
      <img
        src={splashBeluga}
        alt="귀여운 벨루가 키키"
        className="absolute bottom-0 left-1/2 w-full max-w-none -translate-x-1/2 object-contain"
      />
    </main>
  );
}
