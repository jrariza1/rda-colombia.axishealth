import React, { useEffect, createContext, useContext, ReactNode } from 'react';
import { PartnerConfig, DEFAULT_CONFIG } from '@/types/partner';

interface ThemeContextValue {
  config: PartnerConfig;
  isDistributor: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  config: DEFAULT_CONFIG,
  isDistributor: false,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  config: PartnerConfig;
  children: ReactNode;
}

export function ThemeProvider({ config, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    
    const applyColor = (variable: string, hex: string) => {
      if (!hex || hex === 'transparent') return;
      if (hex.includes(' ') && !hex.includes('#')) {
        root.style.setProperty(variable, hex);
        return;
      }

      let r = 0, g = 0, b = 0;
      if (hex.startsWith('#')) {
        if (hex.length === 4) {
          r = parseInt(hex[1] + hex[1], 16);
          g = parseInt(hex[2] + hex[2], 16);
          b = parseInt(hex[3] + hex[3], 16);
        } else {
          r = parseInt(hex.substring(1, 3), 16);
          g = parseInt(hex.substring(3, 5), 16);
          b = parseInt(hex.substring(5, 7), 16);
        }
      } else return;

      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s, l = (max + min) / 2;

      if (max === min) h = s = 0;
      else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      root.style.setProperty(variable, `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`);
    };

    applyColor('--primary', config.primary_color);
    applyColor('--secondary', config.secondary_color);
    applyColor('--accent', config.accent_color || config.primary_color);

    if (config.border_radius) {
      root.style.setProperty('--radius', config.border_radius.includes('px') || config.border_radius.includes('rem') ? config.border_radius : `${config.border_radius}px`);
    }

    if (config.font_main) {
      root.style.setProperty('--font-main', config.font_main);
    }
    
  }, [config]);

  return (
    <ThemeContext.Provider value={{ config, isDistributor: config.type === 'distributor' }}>
      {children}
    </ThemeContext.Provider>
  );
}
