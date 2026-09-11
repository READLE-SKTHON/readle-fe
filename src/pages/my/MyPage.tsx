import { ChevronRight, Plus, Settings } from "lucide-react";

import Level1Character from "@/assets/images/level/Level1Character.png";

import useUser from "@/hooks/useUser";
import { mockMyPage } from "@/mocks/mypage";

export default function MyPage() {
  const { stats, friends, accuracyHistory } = mockMyPage;

  // 로그인 사용자 정보·누적 XP 기준 레벨
  const { user, totalXp, levelInfo } = useUser();

  // 레벨별 캐릭터
  const character = levelInfo.character;

  const graphWidth = 300;
  const graphHeight = 100;

  const graphPoints = accuracyHistory
    .map((value, index) => {
      const x = 15 + index * ((graphWidth - 30) / (accuracyHistory.length - 1));
      const y = graphHeight - (value / 100) * graphHeight;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <main className="min-h-screen bg-white">
      {/* 상단 프로필 */}
      <section className="relative h-77.5 overflow-hidden bg-[#2285E3] px-5 pt-8">
        {/* 사용자 정보 */}
        <div className="relative z-10 flex items-center">
          <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#DCEFFF]">
            <img src={character} alt="프로필" className="h-full w-full object-cover" />
          </div>

          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="mt-1 text-lg font-semibold">{user.school}</p>
          </div>

          {/* 설정 */}
          <button
            type="button"
            className="ml-auto flex h-12 w-12 items-center justify-center text-white"
            aria-label="설정"
          >
            <Settings size={34} strokeWidth={1.8} />
          </button>
        </div>

        {/* 레벨별 메인 캐릭터 */}
        <img
          src={character}
          alt={`레벨 ${levelInfo.level} 캐릭터`}
          className="absolute -bottom-5 right-5 w-59 object-contain"
        />
      </section>

      {/* 학습 요약 */}
      <section className="relative z-10 mx-5 -mt-4 rounded-2xl border border-white bg-[#F4F9FD] px-3 py-5 shadow-[0_2px_12px_rgba(34,133,227,0.12)]">
        <div className="grid grid-cols-4">
          <StatItem icon="🔥" value={`${stats.streakDays}일`} label="연속 학습일" />

          <StatItem icon="⚡" value={totalXp} label="누적 XP" border />

          <StatItem icon="📘" value={`${stats.newsCount}개`} label="읽은 뉴스" border />

          <StatItem icon="🎯" value={`${stats.accuracy}%`} label="정답률" border />
        </div>
      </section>

      {/* 친구 목록 */}
      <section className="mx-5 mt-5 rounded-2xl bg-[#F4F9FD] px-5 py-5 shadow-[0_2px_12px_rgba(34,133,227,0.10)]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            친구 목록
            <span className="ml-2 text-base font-medium text-gray-400">{friends.length}</span>
          </h2>

          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-gray-400"
          >
            전체보기
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {/* 친구 추가 */}
          <button type="button" className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4E8F8]">
              <Plus size={28} strokeWidth={1.8} />
            </div>

            <span className="mt-2 text-sm font-semibold">친구 추가</span>
          </button>

          {friends.map((friend) => (
            <div key={friend.id} className="flex flex-col items-center">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-white">
                <img
                  src={Level1Character}
                  alt={friend.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-2 text-sm font-semibold">{friend.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 학습 그래프 */}
      <section className="mx-5 mt-5 rounded-2xl bg-[#F4F9FD] px-5 py-5 shadow-[0_2px_12px_rgba(34,133,227,0.10)]">
        <h2 className="text-xl font-bold">학습 그래프</h2>

        <div className="mt-5 overflow-hidden">
          <svg viewBox={`0 0 ${graphWidth} 145`} className="w-full">
            {/* 가로 가이드 */}
            {[0, 20, 40, 60, 80, 100].map((value) => {
              const y = graphHeight - (value / 100) * graphHeight + 5;

              return (
                <g key={value}>
                  <line
                    x1="15"
                    y1={y}
                    x2={graphWidth - 15}
                    y2={y}
                    stroke="#CFE2F5"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  <text x="0" y={y + 3} fontSize="7" fill="#718096">
                    {value}%
                  </text>
                </g>
              );
            })}

            {/* 그래프 선 */}
            <polyline
              points={graphPoints}
              fill="none"
              stroke="#2285E3"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 각 점 */}
            {accuracyHistory.map((value, index) => {
              const x = 15 + index * ((graphWidth - 30) / (accuracyHistory.length - 1));

              const y = graphHeight - (value / 100) * graphHeight;

              return (
                <g key={index}>
                  <circle cx={x} cy={y} r="3.5" fill="white" stroke="#2285E3" strokeWidth="2" />

                  <text
                    x={x}
                    y={y - 8}
                    fontSize="7"
                    fontWeight="700"
                    fill="#2285E3"
                    textAnchor="middle"
                  >
                    {value}%
                  </text>

                  <text x={x} y="125" fontSize="7" fill="#718096" textAnchor="middle">
                    9/{index + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>
    </main>
  );
}

type StatItemProps = {
  icon: string;
  value: string | number;
  label: string;
  border?: boolean;
};

function StatItem({ icon, value, label, border = false }: StatItemProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        border ? "border-l border-gray-200" : ""
      }`}
    >
      <span className="text-2xl">{icon}</span>

      <strong className="mt-1 text-xl">{value}</strong>

      <span className="mt-1 text-center text-[14px] font-semibold text-gray-400">{label}</span>
    </div>
  );
}
