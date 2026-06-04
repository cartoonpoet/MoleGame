import { style, keyframes } from "@vanilla-extract/css";

export const board = style({
  padding: "1rem 2.5rem",
  display: "grid",
  width: "80dvw",
  boxSizing: "border-box",
  gap: "1rem", // 칸 사이 여백
  background: "#10b81a", // 진한 초록 잔디
  borderRadius: "2rem",
  gridTemplateRows: "repeat(var(--row), 1fr)",
  gridTemplateColumns: "repeat(var(--col), 1fr)",
});

export const hole = style({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
});

export const holeSection = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const popBounce = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(40%) scaleY(0.7)",
  },
  "40%": {
    opacity: 1,
    transform: "translateY(-10%) scaleY(1.1)",
  },
  "60%": {
    opacity: 1,
    transform: "translateY(5%) scaleY(0.95)",
  },
  "80%": {
    opacity: 1,
    transform: "translateY(-2%) scaleY(1.02)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0) scaleY(1)",
  },
});

export const moleSection = style({
  padding: "2rem",
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  transition: "opacity 0.2s",
  animation: `${popBounce} 0.5s cubic-bezier(0.4,0,0.2,1)`,
  willChange: "transform, opacity",
});

export const moleContainer = style({
  position: "relative",
  cursor: "pointer",
  background: "linear-gradient(180deg, #1e9c2f 0%, #2ecc40 100%)", // 잔디 느낌의 초록색 그라데이션
  padding: "2rem",
  borderRadius: "2rem",
  boxShadow: "0 8px 24px 0 rgba(0,0,0,0.25)",
});

export const holeCover = style({
  padding: "2rem",
  position: "absolute",
  left: 0,
  bottom: 0,
  zIndex: 3,
  pointerEvents: "none", // 클릭 방지
});
