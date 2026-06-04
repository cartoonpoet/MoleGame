import { style } from "@vanilla-extract/css";
import { font } from "../../style/style.css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  justifyContent: "center",
  height: "100dvh",
  padding: "1.25rem",
  width: "375px",
});

export const header = style([
  font.heading.h2,
  {
    textAlign: "center",
  },
]);

export const main = style([
  font.body.largeBold,
  {
    textAlign: "center",
  },
]);

export const footer = style({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
});
