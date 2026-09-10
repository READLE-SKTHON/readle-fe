import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";

import chartIcon from "@/assets/icons/game/chartIcon.png";
import newsIcon from "@/assets/icons/game/newsIcon.png";
import quizIcon from "@/assets/icons/game/quizIcon.png";
import newsWhale from "@/assets/images/newsWhale.png";

export default function SoloIntroPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="혼자 문제풀기" />
      <main className="flex min-h-screen flex-col px-5 pb-8">
        {/* 캐릭터 및 소개 */}
        <section className="mt-8 flex flex-col items-center">
          <img src={newsWhale} alt="신문을 읽는 고래 캐릭터" className="w-55 object-contain" />

          <h2 className="mt-6 text-3xl font-extrabold">오늘의 뉴스</h2>

          <p className="mt-5 text-center text-[18px] font-semibold leading-7 text-gray-400">
            오늘은 어떤 뉴스가 나올까?
            <br />
            뉴스를 읽고 다양한 문제에 도전해보세요
          </p>
        </section>

        {/* 안내 */}
        <section className="mt-7 overflow-hidden rounded-3xl bg-[#E8F2FA]">
          <InfoItem icon={quizIcon} text="10 문제로 가볍게 !" />

          <div className="h-px bg-[#D4E0E9]" />

          <InfoItem icon={newsIcon} text="다양한 주제의 최신 뉴스" />

          <div className="h-px bg-[#D4E0E9]" />

          <InfoItem icon={chartIcon} text="어제보다 발전한 나의 실력 확인" />
        </section>

        {/* 시작하기 */}
        <button
          type="button"
          onClick={() => navigate("/game/solo/reading")}
          className="mt-7 h-16 w-full cursor-pointer rounded-2xl bg-[#168CF2] text-xl font-bold text-white"
        >
          시작하기
        </button>
      </main>
    </div>
  );
}

type InfoItemProps = {
  icon: string;
  text: string;
};

function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div className="flex h-17 items-center gap-5 px-6">
      <img src={icon} className="h-8 w-8 shrink-0 object-contain" />

      <p className="text-base text-[16px] font-semibold text-gray-500">{text}</p>
    </div>
  );
}
