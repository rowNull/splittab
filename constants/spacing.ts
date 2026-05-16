/** @format */

export const Spacing = {
  // Base unit: 4px
  px: 1,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Semantic
  screenPadding: 16,
  cardPadding: 16,
  sectionGap: 24,
  itemGap: 12,
  inputHeight: 48,
  buttonHeight: 48,
  tabBarHeight: 64,
  headerHeight: 56,
} as const;

export type SpacingKey = keyof typeof Spacing;
