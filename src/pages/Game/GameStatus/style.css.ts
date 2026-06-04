import { style, keyframes } from "@vanilla-extract/css";
import { font, color } from "../../../style/style.css";

export const header = style([
  font.heading.h1,
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem",
    alignSelf: "stretch",
  },
]);

export const blinkRedKeyframes = keyframes({
  "0%": {
    color: color.danger.default,
    textShadow: `0 0 8px ${color.danger.secondary}`,
    fontWeight: "bold",
    transform: "scale(1)",
  },
  "30%": {
    color: color.danger.default,
    textShadow: `0 0 16px ${color.danger.secondary}`,
    fontWeight: "bolder",
    transform: "scale(1.08)",
  },
  "50%": {
    color: color.white.default,
    textShadow: "none",
    fontWeight: "normal",
    transform: "scale(1)",
  },
  "70%": {
    color: color.danger.default,
    textShadow: `0 0 16px ${color.danger.secondary}`,
    fontWeight: "bolder",
    transform: "scale(1.08)",
  },
  "100%": {
    color: color.danger.default,
    textShadow: `0 0 8px ${color.danger.secondary}`,
    fontWeight: "bold",
    transform: "scale(1)",
  },
});

export const blinkRed = style({
  animation: `${blinkRedKeyframes} 1s linear infinite`,
  transition: "color 0.2s, text-shadow 0.2s, transform 0.2s",
  willChange: "color, text-shadow, transform",
});
