'use client';
import { useState, useEffect } from 'react';

export function Seg7({ value, width, ghostChar = '8' }: { value: string | number; width?: number; ghostChar?: string }) {
  const str = String(value);
  const w = width ?? str.length;
  const padded = str.padStart(w, ' ');
  const ghost = ghostChar.repeat(w);
  return (
    <span className="seg-stack lit">
      <span className="ghost" aria-hidden>{ghost}</span>
      <span>{padded}</span>
    </span>
  );
}

export function Seg14({ children, ghostFill = true }: { children: string; ghostFill?: boolean }) {
  const str = String(children);
  const ghost = ghostFill ? str.replace(/[A-Z0-9]/g, '8').replace(/[a-z]/g, 'a') : '';
  return (
    <span className="seg-stack lit" style={{ fontFamily: 'var(--font-seg14)' }}>
      {ghostFill && <span className="ghost" aria-hidden>{ghost}</span>}
      <span>{str}</span>
    </span>
  );
}

export function Bar({ value, max = 100, cells = 14 }: { value: number; max?: number; cells?: number }) {
  const filled = Math.round((value / max) * cells);
  return (
    <div className="bar">
      {Array.from({ length: cells }).map((_, i) => (
        <div key={i} className={`seg ${i < filled ? 'on' : ''}`} />
      ))}
    </div>
  );
}

export function MiniBar({ value, max = 100, cells = 8 }: { value: number; max?: number; cells?: number }) {
  const filled = Math.round((value / max) * cells);
  return (
    <div className="mini-bar">
      {Array.from({ length: cells }).map((_, i) => (
        <div key={i} className={`s ${i < filled ? 'on' : ''}`} />
      ))}
    </div>
  );
}

export function CountUp({ to, duration = 900, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{decimals ? val.toFixed(decimals) : Math.round(val)}</>;
}

export function Clock() {
  const [t, setT] = useState<Date | null>(null);
  useEffect(() => {
    setT(new Date());
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const str = t ? `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}` : '00:00:00';
  return (
    <span className="seg-stack lit clock" style={{ fontFamily: 'var(--font-seg7)', letterSpacing: '0.08em' }}>
      <span className="ghost" aria-hidden>88:88:88</span>
      <span>{str}</span>
    </span>
  );
}
