import logoUrl from "@/assets/images/goat-interview-logo.png";

interface LogoProps {
  width?: number;
  height?: number;
  alt?: string;
  /** 어두운 배경(푸터 등)에서 흰색으로 표시 */
  white?: boolean;
}

// 고트면접 가로형 이미지 로고(투명 PNG).
// width 기준으로 표시하고 height는 비율 유지를 위해 auto.
export default function Logo({
  width = 140,
  height,
  alt = "고트면접",
  white = false,
}: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt={alt}
      draggable={false}
      style={{
        width: `${width}px`,
        height: height ? `${height}px` : "auto",
        objectFit: "contain",
        display: "block",
        userSelect: "none",
        ...(white ? { filter: "brightness(0) invert(1)" } : {}),
      }}
    />
  );
}
