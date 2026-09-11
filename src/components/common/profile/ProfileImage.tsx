import { useState } from "react";

import defaultProfileIcon from "@/assets/icons/game/profileIcon.svg";

type ProfileImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export default function ProfileImage({ src = null, alt, className = "" }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);

  // 이미지가 없거나 불러오기 실패 시 기본 프로필 표시
  const imageSrc = src && !hasError ? src : defaultProfileIcon;

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={() => setHasError(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
