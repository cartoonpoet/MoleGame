import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  width: "100dvw",
  height: "100dvh",
  alignItems: "center",
  justifyContent: "space-between",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
