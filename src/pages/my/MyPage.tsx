import Level1Character from "@/assets/images/level/Level1Character.png";
import Level2Character from "@/assets/images/level/Level2Character.png";
import Level3Character from "@/assets/images/level/Level3Character.png";

import { mockMyPage } from "@/mocks/mypage";

const levelCharacters = {
  1: Level1Character,
  2: Level2Character,
  3: Level3Character,
};

export default function MyPage() {
  const { user, stats, friends } = mockMyPage;

  const character = levelCharacters[user.level as keyof typeof levelCharacters] ?? Level1Character;

  return (
    <main className="min-h-screen px-5 pt-5">
      {/* 프로필 */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>

          <p className="mt-1 text-sm text-gray-500">{user.school}</p>

          <p className="mt-2 text-sm text-gray-600">{user.introduction}</p>
        </div>

        <img
          src={character}
          alt={`레벨 ${user.level} 캐릭터`}
          className="h-28 w-28 object-contain"
        />
      </section>

      {/* 레벨 */}
      <section className="mt-6">
        <p className="text-sm font-semibold text-[#2285E3]">LEVEL {user.level}</p>
      </section>

      {/* 학습 정보 */}
      <section className="mt-6 grid grid-cols-4 gap-2">
        <div className="text-center">
          <p className="font-bold">{stats.streakDays}일</p>
          <p className="text-xs text-gray-500">연속 학습</p>
        </div>

        <div className="text-center">
          <p className="font-bold">{stats.totalXp}</p>
          <p className="text-xs text-gray-500">누적 XP</p>
        </div>

        <div className="text-center">
          <p className="font-bold">{stats.newsCount}</p>
          <p className="text-xs text-gray-500">읽은 뉴스</p>
        </div>

        <div className="text-center">
          <p className="font-bold">{stats.accuracy}%</p>
          <p className="text-xs text-gray-500">정답률</p>
        </div>
      </section>

      {/* 친구 */}
      <section className="mt-8">
        <h2 className="font-bold">친구</h2>

        <div className="mt-3 flex gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="text-center">
              <div className="h-12 w-12 rounded-full bg-gray-200" />

              <p className="mt-1 text-sm">{friend.name}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
