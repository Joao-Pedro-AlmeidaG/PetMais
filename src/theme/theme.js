export const colors = {
  primaryDark: '#0F5C5E',
  primary: '#1FA7A0',
  primaryLight: '#DDF5EF',
  accent: '#F47C62',
  accentLight: '#FFE5DE',
  assistant: '#F2B84B',
  background: '#FFF9F2',
  surface: '#FFFFFF',

  text: '#24343A',
  textSecondary: '#64747A',
  textInverse: '#FFFFFF',
  placeholder: '#9AA8AA',

  border: '#D9E7E3',
  divider: '#EDF2EF',

  danger: '#C0392B',
  success: '#1FA7A0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 26, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '700' },
  h3: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  bodyStrong: { fontSize: 15, fontWeight: '600' },
  small: { fontSize: 13, fontWeight: '400' },
  price: { fontSize: 18, fontWeight: '700' },
};

const theme = { colors, spacing, radius, typography };

export default theme;
