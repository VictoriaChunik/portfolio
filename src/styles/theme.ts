export const theme = {
  colors: {
    background: "#202020",
    surface: "#1a1f24",
    border: "#2a2f36",
    foreground: "#DEDEDE",
    muted: "#888888",
    brand: "#7C3AED", // hsl(264 87% 60%) approx
    brandForeground: "#ffffff",
  },
  radii: {
    md: "12px",
    lg: "16px",
    round: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,.2)",
  },
} as const;

export type AppTheme = typeof theme;
