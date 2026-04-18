'use client';

let ctx: AudioContext | null = null;
let muted = true;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch { return null; }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function envGain(c: AudioContext, t: number, a: number, s: number, r: number): GainNode {
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(1, t + a);
  g.gain.linearRampToValueAtTime(s, t + a + 0.02);
  g.gain.linearRampToValueAtTime(0, t + a + 0.02 + r);
  return g;
}

export function click() {
  const c = getCtx(); if (!c || muted) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1800, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.04);
  const g = envGain(c, t, 0.001, 0.3, 0.03);
  osc.connect(g).connect(c.destination);
  osc.start(t); osc.stop(t + 0.06);
  const bs = c.createBufferSource();
  const buf = c.createBuffer(1, c.sampleRate * 0.02, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  bs.buffer = buf;
  const ng = c.createGain(); ng.gain.value = 0.15;
  bs.connect(ng).connect(c.destination);
  bs.start(t);
}

export function beep(freq = 880, dur = 0.08) {
  const c = getCtx(); if (!c || muted) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(freq, t);
  const g = envGain(c, t, 0.005, 0.2, dur);
  osc.connect(g).connect(c.destination);
  osc.start(t); osc.stop(t + dur + 0.02);
}

export function confirm() { beep(1320, 0.05); setTimeout(() => beep(1760, 0.08), 60); }
export function tick() { beep(2200, 0.015); }
export function boot() { beep(440, 0.06); setTimeout(() => beep(660, 0.06), 80); setTimeout(() => beep(880, 0.1), 160); }

export function setMuted(v: boolean) { muted = v; if (!muted) getCtx(); }
export function isMuted() { return muted; }
export function enable() { muted = false; getCtx(); }
