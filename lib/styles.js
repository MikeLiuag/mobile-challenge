export const colors = {
  light: '#f0f0f0',
  neutral: '#757575',
  black: '#000000',
  white: '#ffffff',
  primary: '#0d9488'
}

export const fontWeights = {
  normal: '400',
  bold: '700'
}

export const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24
}

export const textStyles = {
  small: {
    fontSize: sizes.sm,
    color: colors.neutral
  },
  paragraph: {
    fontSize: sizes.md,
    color: colors.neutral,
    marginBottom: 5
  },
  h1: {
    fontSize: sizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginBottom: 8
  },
  h2: {
    fontSize: sizes.xl,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 16
  },
  h3: {
    fontSize: sizes.lg,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 8
  },
  h4: {
    fontSize: sizes.md,
    color: colors.black,
    fontWeight: fontWeights.normal,
    marginBottom: 8
  }
}

export const containerStyles = {
  flex: 1,
  backgroundColor: '#ffffff'
}
