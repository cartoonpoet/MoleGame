import { recipe } from "@vanilla-extract/recipes";
import { color } from "../../style/style.css";

export const button = recipe({
  base: {
    display: "flex-inline",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    lineHeight: "100%",
    width: "100%",
  },
  variants: {
    type: {
      outline: {
        border: `1px solid ${color.border.default}`,
      },
      fill: {
        backgroundColor: color.brand.default,
        color: color.white.default,
      },
      soft: {
        backgroundColor: color.brand.secondary,
        color: color.brand.default,
      },
    },
    status: {
      default: {},
      disabled: {
        opacity: 0.5,
      },
      subtle: {},
    },
    size: {
      small: {
        fontSize: "1rem",
      },
      medium: { fontSize: "1.2rem" },
      large: { fontSize: "1.2rem" },
    },
  },
  defaultVariants: {
    type: "outline",
    status: "default",
    size: "small",
  },
});
