import { style } from "@vanilla-extract/css";

const common = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const layout = style([
  common,
  {
    justifyContent: "center",
    height: "100dvh",
    padding: "1.25rem",
    width: "375px",
  },
]);

export const header = style({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
});

export const rankingList = style([common]);

export const footer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "0.5rem",
});
