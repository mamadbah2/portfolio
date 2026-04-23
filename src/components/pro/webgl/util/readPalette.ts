export type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  return [r, g, b];
}

export interface Palette {
  ink: RGB;
  bg: RGB;
  accent: RGB;
  muted: RGB;
}

export function readPalette(el?: HTMLElement): Palette {
  if (typeof window === 'undefined') {
    return {
      ink: hexToRgb('#0E0E0C'),
      bg: hexToRgb('#F5F1EB'),
      accent: hexToRgb('#D94F2E'),
      muted: hexToRgb('#5C5A55'),
    };
  }
  const root = el ?? document.body;
  const s = getComputedStyle(root);
  const read = (name: string, fallback: string) => {
    const raw = s.getPropertyValue(name).trim();
    return hexToRgb(raw || fallback);
  };
  return {
    ink: read('--ink', '#0E0E0C'),
    bg: read('--bg', '#F5F1EB'),
    accent: read('--accent', '#D94F2E'),
    muted: read('--muted', '#5C5A55'),
  };
}
