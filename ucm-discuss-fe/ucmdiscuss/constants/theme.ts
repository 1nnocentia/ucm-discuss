const COMMON_COLORS = {
    primary: '#FDA258',
    secondary: '#9CB380',
    lightSecondary: '#D4E09B',
    tertiary: '#94A89A',
}

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
    }
}

export const DARK_THEME = {
    colors: {
        ...COMMON_COLORS,
        background: '#121212',
        textPrimary: '#FDFDFD',
        textSecondary: '#AFAFAF',
    },
    spacing : LIGHT_THEME.spacing
}

export const FONTS = {
    inter: 'Inter, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    openSans: 'Open Sans, sans-serif',
    merienda: 'Merienda, cursive',
}

export const FONT_SIZES = {
    mini: '0.625rem', // 10
    small: '0.75rem', // 12
    medium: '0.875rem', // 14
    large: '1rem', // 16
    headline: '1.063rem', // 17
    title: '1.25rem', // 20
    titlelarge: '1.375rem', // 22
    titlexlarge: '1.75rem' // 28
}

