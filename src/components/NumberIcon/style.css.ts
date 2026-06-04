import { style } from "@vanilla-extract/css";
import { color } from "../../style/style.css";

export const numberIcon = style({
  color: color.brand.default,
  textAlign: "center",
  fontSize: "1.1rem",
  fontWeight: 700,
  lineHeight: "160%",
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%",
  background: color.brand.secondary,
});
