// Removing `as const` so values are typed as `string` (not string literals).
// This allows ColorMap to be shared between dark and light themes.
export const colors = {
  dark: {
    textPrimary:   '#fafafa',
    textSecondary: '#d4d4d8',
    textMuted:     '#a1a1aa',
    bgBase:        '#09090b',
    bgSurface:     '#18181b',
    bgElevated:    '#27272a',
    border:        '#27272a',
    accent:        '#67e8f9',
    accentHover:   '#22d3ee',
    accentBg:      'rgba(103,232,249,0.08)',
    accentBorder:  'rgba(103,232,249,0.2)',
  },
  light: {
    textPrimary:   '#09090b',
    textSecondary: '#3f3f46',
    textMuted:     '#71717a',
    bgBase:        '#ffffff',
    bgSurface:     '#f4f4f5',
    bgElevated:    '#e4e4e7',
    border:        '#e4e4e7',
    accent:        '#0891b2',
    accentHover:   '#0e7490',
    accentBg:      'rgba(8,145,178,0.08)',
    accentBorder:  'rgba(8,145,178,0.2)',
  },
};

// ColorMap: the shape shared by both themes (all values are strings)
export type ColorMap = typeof colors.dark;
