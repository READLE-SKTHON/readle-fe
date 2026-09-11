import { CaseSensitive, FileText, Lightbulb, Pencil, Scale, type LucideIcon } from "lucide-react";

import type { AbilityKey, AbilityScore } from "@/types/review";

type AbilityChartProps = {
  abilities: AbilityScore[];
};

type Point = {
  x: number;
  y: number;
};

// 차트 영역 크기 (h-54 w-75 컨테이너와 동일)
const CHART_WIDTH = 300;
const CHART_HEIGHT = 216;
const CENTER_X = CHART_WIDTH / 2;
const CENTER_Y = 106;
const RADIUS = 68;

// 축 끝 배지 위치 / 배지 절반 크기 (size-6)
const BADGE_RADIUS = RADIUS + 24;
const BADGE_HALF_SIZE = 12;

// 그리드 단계 비율
const GRID_LEVELS = [1 / 3, 2 / 3, 1];

const abilityIcons: Record<AbilityKey, LucideIcon> = {
  VOCABULARY: CaseSensitive,
  READING: FileText,
  INFERENCE: Lightbulb,
  CRITICAL_THINKING: Scale,
  EXPRESSION: Pencil,
};

// 축 순서별 좌표 (상단부터 시계 방향)
const getPoint = (index: number, count: number, radius: number): Point => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;

  return {
    x: CENTER_X + radius * Math.cos(angle),
    y: CENTER_Y + radius * Math.sin(angle),
  };
};

// 점수(0~100)별 꼭짓점 좌표
const getScorePoints = (scores: number[]) =>
  scores.map((score, index) => getPoint(index, scores.length, (RADIUS * score) / 100));

const toPolygonPoints = (points: Point[]) => points.map(({ x, y }) => `${x},${y}`).join(" ");

// 5축 문해력 능력치 레이더 차트 (나의 점수 · 전체 평균)
export default function AbilityChart({ abilities }: AbilityChartProps) {
  const count = abilities.length;
  const myPoints = getScorePoints(abilities.map((ability) => ability.myScore));
  const averagePoints = getScorePoints(abilities.map((ability) => ability.averageScore));

  return (
    <div>
      <div className="relative mx-auto h-54 w-75">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          {/* 그리드 */}
          {GRID_LEVELS.map((level) => (
            <polygon
              key={level}
              points={toPolygonPoints(getScorePoints(abilities.map(() => level * 100)))}
              fill="none"
              stroke="#E3E2E2"
              strokeWidth="1"
            />
          ))}

          {abilities.map((ability, index) => {
            const { x, y } = getPoint(index, count, RADIUS);

            return (
              <line
                key={ability.key}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={x}
                y2={y}
                stroke="#E3E2E2"
                strokeWidth="1"
              />
            );
          })}

          {/* 전체 평균 */}
          <polygon
            points={toPolygonPoints(averagePoints)}
            fill="#CEE5F8"
            fillOpacity="0.6"
            stroke="#CEE5F8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* 나의 점수 */}
          <polygon
            points={toPolygonPoints(myPoints)}
            fill="#2285E3"
            fillOpacity="0.2"
            stroke="#2285E3"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {myPoints.map(({ x, y }, index) => (
            <circle key={abilities[index].key} cx={x} cy={y} r="3" fill="#2285E3" />
          ))}
        </svg>

        {/* 축 끝 아이콘 배지 · 라벨 */}
        {abilities.map((ability, index) => {
          const Icon = abilityIcons[ability.key];
          const { x, y } = getPoint(index, count, BADGE_RADIUS);

          return (
            <div
              key={ability.key}
              className="absolute flex -translate-x-1/2 flex-col items-center gap-1"
              style={{ left: x, top: y - BADGE_HALF_SIZE }}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#CEE5F8]">
                <Icon className="size-3.5 text-[#2285E3]" />
              </span>

              <span className="text-[11px] font-semibold whitespace-nowrap text-[#0A2A43]">
                {ability.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-2 flex justify-center gap-6">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#0A2A43]">
          <span className="size-3 rounded-full bg-[#2285E3]" />
          나의 점수
        </span>

        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#8F8F8F]">
          <span className="size-3 rounded-full bg-[#CEE5F8]" />
          전체 평균
        </span>
      </div>
    </div>
  );
}
