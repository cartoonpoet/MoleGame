import "./reset.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("html", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px", //default
  width: "100dvw",
  height: "100dvh",
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  minHeight: "calc(var(--vh, 1vh) * 100)",
  fontFamily: "Pretendard, sans-serif",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
