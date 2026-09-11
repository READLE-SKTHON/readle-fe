import PodiumCard, { type PodiumRank } from "@/components/ranking/PodiumCard";
import type { RankingEntry } from "@/types/ranking";

type PodiumProps = {
  image: string;

  // 1~3위 (서버 순위 순서)
  entries: RankingEntry[];
};

// 시상대 배치 순서 (2위 · 1위 · 3위)
const PODIUM_ORDER: PodiumRank[] = [2, 1, 3];

// 1~3위 시상대 일러스트 · 이름 카드
export default function Podium({ image, entries }: PodiumProps) {
  return (
    <section className="relative">
      {/* 일러스트 뒤 연한 파란 원형 그라데이션 */}
      <div
        aria-hidden="true"
        className="absolute -top-7 left-1/2 -z-10 size-70 -translate-x-1/2 bg-radial-[closest-side] from-[#CEE5F8] to-transparent"
      />

      <img
        src={image}
        alt="1~3위 시상대 위의 벨루가들"
        className="mx-auto h-55.5 w-68 object-contain"
      />

      {/* 시상대 숫자 블록 아래 이름 카드 */}
      <div className="relative mx-auto -mt-3 grid w-63 grid-cols-3">
        {PODIUM_ORDER.map((rank) => (
          <PodiumCard key={rank} rank={rank} entry={entries[rank - 1]} />
        ))}
      </div>
    </section>
  );
}
