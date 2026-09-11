type CharacterShadowProps = {
  className?: string;
};

// 캐릭터 발밑 타원 그림자
export default function CharacterShadow({ className = "" }: CharacterShadowProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-4 rounded-[50%] bg-radial-[closest-side] from-[#A9A9A9] to-[#FBFBFB] ${className}`}
    />
  );
}
