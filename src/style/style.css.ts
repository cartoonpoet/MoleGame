import { createGlobalTheme, style } from "@vanilla-extract/css";

export const color = createGlobalTheme(":root", {
  white: {
    default: "#FFFFFF",
  },
  black: {
    default: "#000000",
  },
  brand: {
    default: "#007BFF",
    onTertiary: "#0062CC",
    secondary: "#E6F2FF",
  },
  success: {
    default: "#28A745",
    secondary: "#EAF6EC",
  },
  caution: {
    default: "#FF8C00",
    secondary: "#FFF4E6",
  },
  neutral: {
    secondary: "#B0B8C1",
    label: "#4E5968",
    default: "#6B7684",
    placeholder: "#8B95A1",
    tertiary: "#B0B8C1",
    on: "#FAFAFB",
  },
  warning: {
    default: "#FFD700",
    secondary: "#FFFBE6",
  },
  danger: {
    default: "#DC3545",
    secondary: "#FBEBEC",
  },
  border: {
    default: "#D6DBE1",
    secondary: "#E5E8EB",
  },
});

const createFontStyle = ({
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
}: {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: string;
}) =>
  style({
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    fontFamily,
  });

export const font = {
  heading: {
    h1: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.108rem",
    }),
    h2: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.25rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.084rem",
    }),
    h3: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1rem",
      fontWeight: "600",
      lineHeight: "120%",
      letterSpacing: "-0.072rem",
    }),
  },
  body: {
    largeBold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.5rem",
      fontWeight: "700",
      lineHeight: "160%",
      letterSpacing: "-0.036rem",
    }),
    large: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "160%",
      letterSpacing: "-0.036rem",
    }),
    mediumBold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.25rem",
      fontWeight: "700",
      lineHeight: "160%",
      letterSpacing: "-0.036rem",
    }),
    medium: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.25rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.032rem",
    }),
    smallBold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "140%",
      letterSpacing: "-0.028rem",
    }),
    small: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: "150%",
      letterSpacing: "-0.028rem",
    }),
    caption: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: "140%",
      letterSpacing: "-0.028rem",
    }),
  },
  label: {
    mediumSemibold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.4rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.028rem",
    }),
    smallSemibold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1.2rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.028rem",
    }),
    captionSemibold: createFontStyle({
      fontFamily: "Pretendard",
      fontSize: "1rem",
      fontWeight: "600",
      lineHeight: "140%",
      letterSpacing: "-0.028rem",
    }),
  },
};
