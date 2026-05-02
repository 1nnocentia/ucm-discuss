const COMMON_COLORS = {
    primary: '#FDA258',
    secondary: '#9CB380',
    lightSecondary: '#D4E09B',
    tertiary: '#94A89A',
} as const;

export const FONTS = {
    inter: 'Inter, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    openSans: 'Open Sans, sans-serif',
    merienda: 'Merienda, cursive',
} as const;

export const FONT_SIZES = {
    mini: '0.625rem', // 10
    small: '0.75rem', // 12
    medium: '0.875rem', // 14
    large: '1rem', // 16
    headline: '1.063rem', // 17
    title: '1.25rem', // 20
    titlelarge: '1.375rem', // 22
    titlexlarge: '1.75rem' // 28
} as const;

export const LIGHT_THEME = {
    colors: {
        ...COMMON_COLORS,
        background: '#FDFDFD',
        textPrimary: '#121212',
        textSecondary: '#4F4F4F',
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
    },
    fonts: FONTS,
    fontSizes: FONT_SIZES
} as const;

export const DARK_THEME = {
    colors: {
        ...COMMON_COLORS,
        background: '#121212',
        textPrimary: '#FDFDFD',
        textSecondary: '#AFAFAF',
    },
    spacing : LIGHT_THEME.spacing,
    fonts: FONTS,
    fontSizes: FONT_SIZES
} as const;


export type Theme = typeof LIGHT_THEME;
