import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  height: "100dvh",
  padding: "1.25rem",
  width: "375px",
});

export const buttonContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.85rem",
  width: "100%",
});
