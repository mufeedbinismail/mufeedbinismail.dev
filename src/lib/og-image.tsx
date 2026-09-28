import { readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

// Dark Console palette as hex; satori does not understand oklch().
const BG = '#0e1110';
const INK = '#e3e8e5';
const MUTED = '#8d9792';
const LINE = '#262b29';
const ACCENT = '#68d7a1';

const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);

const fonts = [
  { name: 'Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500 as const },
  { name: 'Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'), weight: 400 as const },
];

interface Card {
  eyebrow: string;
  title: string;
  /** Large figure bottom-left, e.g. a case study's headline metric. */
  metric?: { value: string; label: string };
}

/** The 1200×630 link-preview image for a page, as PNG bytes. */
export async function ogImageFor({ eyebrow, title, metric }: Card): Promise<Buffer> {
  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: BG,
        color: INK,
        fontFamily: 'Plex Mono',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: ACCENT, letterSpacing: 2, textTransform: 'uppercase' }}>
          {eyebrow}
        </div>
        <div style={{ fontSize: title.length > 48 ? 56 : 68, fontWeight: 500, lineHeight: 1.1, letterSpacing: -2 }}>
          {title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: `2px solid ${LINE}`,
          paddingTop: 28,
        }}
      >
        {metric ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 44, fontWeight: 500 }}>{metric.value}</div>
            <div style={{ fontSize: 20, color: MUTED, fontFamily: 'Plex Sans' }}>{metric.label}</div>
          </div>
        ) : (
          <div style={{ fontSize: 30, fontWeight: 500 }}>Mohamed Mufeed</div>
        )}
        <div style={{ fontSize: 22, color: MUTED }}>{metric ? 'Mohamed Mufeed · mufeedbinismail.dev' : 'mufeedbinismail.dev'}</div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts },
  );
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

/** The touch icon: the favicon's `m_` mark on the dark background, as PNG bytes. */
export async function touchIcon(size: number): Promise<Buffer> {
  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: BG,
        fontFamily: 'Plex Mono',
        fontWeight: 500,
        fontSize: size * 0.5,
        letterSpacing: -size * 0.02,
      }}
    >
      <span style={{ color: INK }}>m</span>
      <span style={{ color: ACCENT }}>_</span>
    </div>,
    { width: size, height: size, fonts },
  );
  return new Resvg(svg).render().asPng();
}
