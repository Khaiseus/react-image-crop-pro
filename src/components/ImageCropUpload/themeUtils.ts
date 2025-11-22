import { Theme, ThemeConfig, ThemeName, ThemeProp } from './theme';
import { themes, defaultTheme } from './themes';

const CSS_VAR_PREFIX = '--ricu';

export function cssVarName(...keys: string[]): string {
  return `${CSS_VAR_PREFIX}-${keys.join('-')}`;
}

export function cssVar(...keys: string[]): string {
  return `var(${cssVarName(...keys)})`;
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target } as T;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = output[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        output[key] = deepMerge(targetValue as any, sourceValue as any);
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return output;
}

export function mergeTheme(baseTheme: Theme, customTheme: ThemeConfig): Theme {
  return deepMerge<Theme>(baseTheme, customTheme as Partial<Theme>);
}

export function resolveTheme(themeProp?: ThemeProp): Theme {
  if (!themeProp) return defaultTheme;

  if (typeof themeProp === 'string') {
    const theme = themes[themeProp as ThemeName];
    if (!theme) {
      console.warn(`Theme "${themeProp}" not found. Using default theme.`);
      return defaultTheme;
    }
    return theme;
  }

  return mergeTheme(defaultTheme, themeProp);
}

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  const cssVars: Record<string, string> = {};

  Object.entries(theme.colors).forEach(([key, value]) => {
    cssVars[cssVarName('colors', key)] = value;
  });

  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[cssVarName('spacing', key)] = value;
  });

  Object.entries(theme.borders.radius).forEach(([key, value]) => {
    cssVars[cssVarName('borders', 'radius', key)] = value;
  });
  Object.entries(theme.borders.width).forEach(([key, value]) => {
    cssVars[cssVarName('borders', 'width', key)] = value;
  });
  cssVars[cssVarName('borders', 'style')] = theme.borders.style;

  cssVars[cssVarName('typography', 'fontFamily')] = theme.typography.fontFamily;
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars[cssVarName('typography', 'fontSize', key)] = value;
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    cssVars[cssVarName('typography', 'fontWeight', key)] = value;
  });
  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    cssVars[cssVarName('typography', 'lineHeight', key)] = value;
  });

  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVars[cssVarName('shadows', key)] = value;
  });

  Object.entries(theme.transitions.duration).forEach(([key, value]) => {
    cssVars[cssVarName('transitions', 'duration', key)] = value;
  });
  Object.entries(theme.transitions.easing).forEach(([key, value]) => {
    cssVars[cssVarName('transitions', 'easing', key)] = value;
  });

  Object.entries(theme.zIndex).forEach(([key, value]) => {
    cssVars[cssVarName('zIndex', key)] = String(value);
  });

  return cssVars;
}

export function applyTheme(element: HTMLElement, theme: Theme): void {
  const cssVars = themeToCSSVariables(theme);
  Object.entries(cssVars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

export function removeTheme(element: HTMLElement): void {
  const cssVars = themeToCSSVariables(defaultTheme);
  Object.keys(cssVars).forEach((key) => {
    element.style.removeProperty(key);
  });
}

export function themeToInlineStyle(theme: Theme): React.CSSProperties {
  return themeToCSSVariables(theme) as React.CSSProperties;
}

export function getThemeColor(theme: Theme, colorKey: keyof Theme['colors']): string {
  return theme.colors[colorKey];
}

export function isDarkTheme(theme: Theme): boolean {
  const bg = theme.colors.background;
  if (bg.startsWith('#')) {
    const hex = bg.substring(1);
    const r = parseInt(hex.substring(0, 2), 16);
    return r < 128;
  }
  return theme.name === 'dark';
}

export function createCustomTheme(baseThemeName: ThemeName, customizations: ThemeConfig): Theme {
  const baseTheme = themes[baseThemeName] || defaultTheme;
  return mergeTheme(baseTheme, customizations);
}
