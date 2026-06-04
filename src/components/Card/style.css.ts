import { style } from "@vanilla-extract/css";
import { color, font } from "../../style/style.css";

export const card = style({
  background: color.white.default,
  border: `1px solid ${color.border.secondary}`,
  borderRadius: "1rem",
  display: "flex",
  padding: "1.25rem",
  flexDirection: "row",
  gap: "0.25rem",
  alignSelf: "stretch",
  justifyContent: "space-between",
  alignItems: "center",
});

export const cardInfo = style([
  font.body.mediumBold,
  {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    alignItems: "center",
  },
]);

export const cardAddInfo = style([
  font.body.small,
  {
    color: color.neutral.default,
  },
]);
