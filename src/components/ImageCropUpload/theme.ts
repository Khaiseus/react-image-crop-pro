export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryLight: string;
  secondary: string;
  secondaryHover: string;
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  errorBorder: string;
  warning: string;
  warningLight: string;
  background: string;
  backgroundAlt: string;
  surface: string;
  border: string;
  borderHover: string;
  borderActive: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  textOnPrimary: string;
  dropzoneBackground: string;
  dropzoneBackgroundHover: string;
  dropzoneBackgroundActive: string;
  dropzoneBackgroundReject: string;
  dropzoneBorder: string;
  dropzoneBorderHover: string;
  dropzoneBorderActive: string;
  dropzoneBorderReject: string;
  cropperBackground: string;
  cropperOverlay: string;
  controlBackground: string;
  controlBorder: string;
  sliderTrack: string;
  sliderThumb: string;
  sliderThumbHover: string;
  buttonBackground: string;
  buttonBackgroundHover: string;
  buttonText: string;
  buttonBorder: string;
  buttonBorderHover: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeBorders {
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  width: {
    thin: string;
    normal: string;
    thick: string;
  };
  style: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTransitions {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface ThemeZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
}

export type ThemeConfig = Partial<{
  name: string;
  colors: Partial<ThemeColors>;
  spacing: Partial<ThemeSpacing>;
  borders: Partial<{
    radius: Partial<ThemeBorders['radius']>;
    width: Partial<ThemeBorders['width']>;
    style: string;
  }>;
  typography: Partial<{
    fontFamily: string;
    fontSize: Partial<ThemeTypography['fontSize']>;
    fontWeight: Partial<ThemeTypography['fontWeight']>;
    lineHeight: Partial<ThemeTypography['lineHeight']>;
  }>;
  shadows: Partial<ThemeShadows>;
  transitions: Partial<{
    duration: Partial<ThemeTransitions['duration']>;
    easing: Partial<ThemeTransitions['easing']>;
  }>;
  zIndex: Partial<ThemeZIndex>;
}>;

export type ThemeName = 'light' | 'dark' | 'modern' | 'minimal';
export type ThemeProp = ThemeName | ThemeConfig;
