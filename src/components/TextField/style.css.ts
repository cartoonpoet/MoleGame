import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { font, color } from "../../style/style.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
});

export const label = style([
  font.label.captionSemibold,
  {
    color: color.neutral.label,
  },
]);

export const input = recipe({
  base: {
    display: "flex",
    padding: "1rem",
    borderRadius: "0.75rem",
    borderStyle: "solid",
    borderWidth: "1px",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "140%",
    selectors: {
      "&::placeholder": {
        color: color.neutral.placeholder,
      },
    },
  },
  variants: {
    state: {
      default: {
        borderColor: color.border.default,
      },
      typing: {
        borderColor: color.brand.default,
      },
      filled: {
        borderColor: color.border.default,
      },
      error: {
        borderColor: color.danger.default,
      },
      inactive: {
        borderColor: color.border.default,
        backgroundColor: color.neutral.tertiary,
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
