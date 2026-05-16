/** @format */

export const Colors = {
  // Primary
  primary: "#2E7D32",
  primaryLight: "#4CAF50",
  primaryDark: "#1B5E20",

  // Neutrals
  white: "#FFFFFF",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  border: "#E0E0E0",
  divider: "#EEEEEE",

  // Text
  textPrimary: "#212121",
  textSecondary: "#757575",
  textDisabled: "#BDBDBD",
  textInverse: "#FFFFFF",

  // Feedback
  success: "#2E7D32",
  warning: "#F57C00",
  error: "#C62828",
  info: "#1565C0",

  // Misc
  overlay: "rgba(0, 0, 0, 0.5)",
  transparent: "transparent",
} as const;

export type ColorKey = keyof typeof Colors;
