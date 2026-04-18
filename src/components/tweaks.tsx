'use client';

export type TweakState = {
  theme: string;
  scanlines: string;
  ghosting: number;
  sound: boolean;
  stress: boolean;
};

export const TWEAK_DEFAULTS: TweakState = {
  theme: 'blue',
  scanlines: 'on',
  ghosting: 7,
  sound: false,
  stress: false,
};

const THEMES = [
  { id: 'blue', color: '#2a7cc4' },
  { id: 'green', color: '#2a8a4c' },
  { id: 'amber', color: '#c47a1e' },
  { id: 'red', color: '#c4342a' },
  { id: 'mono', color: '#a8b8a0' },
];

export function Tweaks({ tweaks, setTweaks }: { tweaks: TweakState; setTweaks: (t: TweakState) => void }) {
  const update = (patch: Partial<TweakState>) => setTweaks({ ...tweaks, ...patch });

  return (
    <div className="tweaks">
      <h4>— TWEAKS —</h4>
      <div className="row">
        <span>THEME</span>
        <div className="theme-dots">
          {THEMES.map(t => (
            <div
              key={t.id}
              className={`theme-dot ${tweaks.theme === t.id ? 'active' : ''}`}
              style={{ background: t.color }}
              onClick={() => update({ theme: t.id })}
            />
          ))}
        </div>
      </div>
      <div className="row">
        <span>SCANLINES</span>
        <div
          className={`toggle ${tweaks.scanlines === 'on' ? 'on' : ''}`}
          onClick={() => update({ scanlines: tweaks.scanlines === 'on' ? 'off' : 'on' })}
        />
      </div>
      <div className="row">
        <span>GHOSTING {tweaks.ghosting}%</span>
        <input
          type="range" min="0" max="25" value={tweaks.ghosting}
          onChange={e => update({ ghosting: parseInt(e.target.value) })}
        />
      </div>
      <div className="row">
        <span>SOUND</span>
        <div className={`toggle ${tweaks.sound ? 'on' : ''}`} onClick={() => update({ sound: !tweaks.sound })} />
      </div>
      <div className="row">
        <span>STRESS MODE</span>
        <div className={`toggle ${tweaks.stress ? 'on' : ''}`} onClick={() => update({ stress: !tweaks.stress })} />
      </div>
      <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4, letterSpacing: '0.1em' }}>
        &gt; shortcuts: 1-7 nav · M mute · T tweaks
      </div>
    </div>
  );
}
