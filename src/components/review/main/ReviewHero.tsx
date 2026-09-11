import reviewCharacter from "@/assets/images/Review/reviewCharacter.png";

// 복습 메인 타이틀 · 캐릭터 영역 (캐릭터 하단이 아래 배너에 걸침)
export default function ReviewHero() {
  return (
    <section className="relative">
      {/* 캐릭터 뒤 연한 파란 원형 그라데이션 (페이지 콘텐츠 뒤 배경) */}
      <div
        aria-hidden="true"
        className="absolute -top-13 -left-17 -z-10 size-64 bg-radial-[closest-side] from-[#CEE5F8] to-transparent"
      />

      <h1 className="pr-4 text-right text-[24px] leading-8 font-extrabold text-black">
        틀린 문제를 다시 풀며 문해력을
        <br />더 단단하게!
      </h1>

      <p className="mt-5 pr-4 text-right text-[16px] leading-5 font-medium text-[#5E5E5E]">
        틀렸던 문제를 분석해 나에게
        <br />
        필요한 훈련을 모았어요
      </p>

      <img
        src={reviewCharacter}
        alt="복습 머리띠를 한 벨루가"
        className="absolute top-7 left-0 z-10 w-46 object-contain"
      />
    </section>
  );
}
