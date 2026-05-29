const COMMON_COLORS = {
    primary: '#FDA258',
    secondary: '#9CB380',
    lightSecondary: '#D4E09B',
    tertiary: '#94A89A',

    buttonOn: '#D34A16',
    buttonOff: '#FFFFFF',
    
    warning: '#FF6B6B',
    error: '#FF3B30',

    logo: '#FDFDFD'
} as const;

export const FONTS = {
    inter: 'Inter, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    openSans: 'Open Sans, sans-serif',
    merienda: 'Merienda, cursive',
} as const;

export const FONT_SIZES = {
    mini: 10, // 10
    small: 12, // 12
    medium: 14, // 14
    large: 16, // 16
    headline: 17, // 17
    title: 20, // 20
    titlelarge: 22, // 22
    titlexlarge: 28 // 28
} as const;

export const LIGHT_THEME = {
    colors: {
        ...COMMON_COLORS,
        background: '#FDFDFD',
        textPrimary: '#121212',
        textSecondary: '#4F4F4F',
        icon: '#121212',
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
        icon: '#FFFFFF',
    },
    spacing : LIGHT_THEME.spacing,
    fonts: FONTS,
    fontSizes: FONT_SIZES
} as const;


export type Theme = typeof LIGHT_THEME;
