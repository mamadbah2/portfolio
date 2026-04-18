'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Seg7, Clock } from './primitives';
import { SECTIONS, PROJECTS } from '@/lib/data';
import * as audio from './audio';

export function Screw({ cls }: { cls: string }) {
  return <div className={`screw ${cls}`} />;
}

export function TopRail() {
  return (
    <div className="top-rail">
      <div className="pins">
        {Array.from({ length: 16 }).map((_, i) => <div className="pin" key={i} />)}
      </div>
      <span className="pin-label">VSS VDD V0 RS RW E D0-D7 A K</span>
      <div className="spacer" />
      <span className="brand">MBB-LCD / REV.03 / 16X02 RETROFIT</span>
      <div className="spacer" />
      <span className="silk">PWR</span>
      <div className="led on" />
      <span className="silk">ACT</span>
      <div className="led green on glow-pulse" />
      <span className="silk">COM</span>
      <div className="led amber on" />
    </div>
  );
}

export function StatusBar({ current }: { current: string }) {
  return (
    <div className="statusbar lit">
      <div className="tags">
        {SECTIONS.map(s => (
          <div key={s.id} className={`tag ${s.id === current ? 'active' : ''}`}>
            <span className="glyph" />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="clock lit"><Clock /></div>
    </div>
  );
}

function Uptime() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS(x => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return <Seg7 value={`${pad(h)}:${pad(m)}:${pad(sec)}`} width={8} />;
}

export function BottomBar({ current, selectedProject }: { current: string; selectedProject: number | null }) {
  const sectionNum = String(SECTIONS.findIndex(s => s.id === current) + 1).padStart(2, '0');
  const total = SECTIONS.length;
  return (
    <div className="bottombar lit">
      <div className="readout">
        <div className="label">▸ MODE</div>
        <div className="value"><Seg7 value={current} width={8} /></div>
      </div>
      <div className="readout">
        <div className="label">▸ PAGE</div>
        <div className="value"><Seg7 value={sectionNum} width={2} />/<Seg7 value={total} width={2} /></div>
      </div>
      <div className="readout">
        <div className="label">▸ ITEM</div>
        <div className="value"><Seg7 value={selectedProject ? String(selectedProject).padStart(2, '0') : '--'} width={2} /></div>
      </div>
      <div className="readout">
        <div className="label">▸ UPTIME</div>
        <div className="value"><Uptime /></div>
      </div>
      <div className="readout">
        <div className="label">▸ BATT</div>
        <div className="value"><Seg7 value={97} width={3} />%</div>
      </div>
      <div className="readout">
        <div className="label">▸ SIGNAL</div>
        <div className="value">
          <span style={{ letterSpacing: '0.3em' }}>
            {'|'.repeat(4)}<span style={{ opacity: 0.2 }}>|</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function IntensityDial({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startY: 0, startVal: 0 });
  const angle = (value / 100) * 270 - 135;

  const begin = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    drag.current = { active: true, startY: y, startVal: value };
    audio.tick();
    e.preventDefault();
  }, [value]);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drag.current.active) return;
      const y = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const dy = drag.current.startY - y;
      const next = Math.max(0, Math.min(100, Math.round(drag.current.startVal + dy * 0.6)));
      if (next !== value) { onChange(next); if (next % 10 === 0) audio.tick(); }
    };
    const end = () => { drag.current.active = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [value, onChange]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const next = Math.max(0, Math.min(100, value + (e.deltaY < 0 ? 3 : -3)));
    if (next !== value) { onChange(next); audio.tick(); }
  };

  const onClick = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const delta = (dx > 0 || dy < 0) ? 10 : -10;
    onChange(Math.max(0, Math.min(100, value + delta)));
    audio.click();
  };

  return (
    <div className="dial-wrap">
      <div
        ref={ref}
        className="dial"
        style={{ transform: `rotate(${angle}deg)`, transition: drag.current.active ? 'none' : 'transform 0.15s' }}
        onMouseDown={begin}
        onTouchStart={begin}
        onWheel={onWheel}
        onClick={onClick}
        title="Drag up/down or scroll to adjust backlight intensity"
      />
      <span className="dial-val"><Seg7 value={value} width={3} />%</span>
    </div>
  );
}

export function BottomRail({
  goPrev, goNext, goUp, goDown, goHome, onEnter,
  toggleMute, muted, intensity, setIntensity,
}: {
  goPrev: () => void; goNext: () => void; goUp: () => void; goDown: () => void;
  goHome: () => void; onEnter: () => void; toggleMute: () => void;
  muted: boolean; intensity: number; setIntensity: (v: number) => void;
}) {
  return (
    <div className="bottom-rail">
      <span className="rail-label">SECTION</span>
      <button className="btn arrow" onClick={() => { audio.click(); goPrev(); }}>◀</button>
      <button className="btn arrow" onClick={() => { audio.click(); goNext(); }}>▶</button>
      <span className="rail-label">SCROLL</span>
      <button className="btn arrow" onClick={() => { audio.click(); goUp(); }}>▲</button>
      <button className="btn arrow" onClick={() => { audio.click(); goDown(); }}>▼</button>
      <button className="btn" onClick={() => { audio.click(); goHome(); }}>MENU</button>
      <button className="btn enter" onClick={() => { audio.confirm(); onEnter(); }}>ENTER</button>
      <div className="rail-spacer" />
      <span className="rail-label">INTENSITY</span>
      <IntensityDial value={intensity} onChange={setIntensity} />
      <button className="btn" onClick={toggleMute}>{muted ? 'MUTE' : 'SOUND'}</button>
      <span className="rail-label">FW.v3.2 / 2026</span>
    </div>
  );
}

export function Boot({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => { setPhase(1); audio.beep(440, 0.05); }, 400));
    t.push(setTimeout(() => { setPhase(2); audio.beep(660, 0.05); }, 900));
    t.push(setTimeout(() => setPhase(3), 1400));
    const barId = setInterval(() => setBar(b => b < 20 ? b + 1 : b), 80);
    t.push(setTimeout(() => { clearInterval(barId); audio.boot(); onDone(); }, 3400));
    return () => { t.forEach(clearTimeout); clearInterval(barId); };
  }, [onDone]);

  return (
    <div className="boot" id="boot-screen">
      <div style={{
        width: 'min(900px,90vw)',
        padding: 'clamp(20px,3vw,48px)',
        borderRadius: 6,
        background: 'radial-gradient(ellipse at center, var(--bl-top) 0%, var(--bl-mid) 60%, var(--bl-bot) 100%)',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), 0 0 120px rgba(40,120,200,0.3)',
        fontFamily: 'var(--font-seg14)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.08) 0,rgba(0,0,0,0.08) 1px,transparent 1px,transparent 3px)' }} />
        <div className="label-small lit" style={{ marginBottom: 16 }}>▸ MBB-OS BOOT SEQUENCE</div>
        <div className="lit" style={{ fontSize: 'clamp(48px,8vw,110px)', lineHeight: 1, fontFamily: 'var(--font-seg7)', letterSpacing: '0.04em' }}>
          <span className="seg-stack">
            <span className="ghost" aria-hidden>8888</span>
            <span>{phase >= 1 ? (phase >= 3 ? 'MBB.' : phase >= 2 ? 'MB..' : 'M...') : '....'}</span>
          </span>
        </div>
        <div className="lit" style={{ fontSize: 'clamp(14px,1.5vw,18px)', marginTop: 18, fontFamily: 'var(--font-seg14)', letterSpacing: '0.08em', opacity: 0.85 }}>
          {phase === 0 && 'POWER ON SELF TEST...'}
          {phase === 1 && 'INITIALIZING DISPLAY CONTROLLER...'}
          {phase === 2 && 'LOADING PORTFOLIO KERNEL v3.2...'}
          {phase >= 3 && 'MOUNTING /DEV/BRAIN — OK'}
        </div>
        <div className="lit" style={{ marginTop: 24, fontSize: 11, opacity: 0.7, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          [{Array.from({ length: 20 }).map((_, i) => i < bar ? '█' : '░').join('')}] {bar * 5}%
        </div>
        <div className="lit" style={{ marginTop: 14, fontSize: 11, opacity: 0.6, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <span>&gt; MEM.CHECK.......OK</span>
          <span>&gt; BACKLIGHT.......OK</span>
          <span>&gt; SEG.MATRIX.....OK</span>
          <span>&gt; IO.BUS.........OK</span>
          <span>&gt; PROJECTS.DB...{PROJECTS.length} LOADED</span>
          <span>&gt; READY.........{phase >= 3 ? 'YES' : '...'}</span>
        </div>
      </div>
    </div>
  );
}
