'use client';
import { useRef, useEffect, useState, RefObject } from 'react';
import { Seg7, Seg14, Bar, MiniBar, CountUp } from './primitives';
import { IDENTITY, KPIS, GAUGES, PROJECTS, SKILL_GROUPS, EXPERIENCE, EDUCATION, CERTS, DEFINITIONS } from '@/lib/data';

type Project = typeof PROJECTS[number];

function TuningStatic({ channel }: { channel: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#060606', overflow: 'hidden' }}>
      {/* Chunky B&W snow base */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }} preserveAspectRatio="none">
        <defs>
          <filter id="crt-snow" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch">
              <animate attributeName="seed" from="0" to="200" dur="0.12s" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix type="matrix" values="1.4 0 0 0 -0.15  0 1.4 0 0 -0.15  0 0 1.4 0 -0.15  0 0 0 1 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#crt-snow)" opacity="0.95" />
      </svg>
      {/* Faint color speckle overlay (warm/cool cast) */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block', mixBlendMode: 'screen', opacity: 0.25 }} preserveAspectRatio="none">
        <defs>
          <filter id="crt-color" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch">
              <animate attributeName="seed" from="10" to="110" dur="0.22s" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix type="matrix" values="2.5 0 0 0 -0.3  0.2 0.4 0 0 -0.1  0 0 1.8 0 -0.2  0 0 0 0.8 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#crt-color)" />
      </svg>
      {/* V-hold dark band sweeping vertically (classic 80s out-of-sync wave) */}
      <div className="crt-vhold" />
      {/* Fast vertical tuning sweep */}
      <div className="crt-sweep" />
      {/* Rolling horizontal scanlines */}
      <div className="crt-rolling" />
      {/* Screen flicker */}
      <div className="crt-flicker" />
      <div className="crt-caption">▸ TUNING CH.{String(channel).padStart(2, '0')}...</div>
    </div>
  );
}

function withAlpha(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function WireframeMockup({ type, color, frame }: { type: string; color: string; frame: number }) {
  const a = color;
  const W = 320, H = 240;
  const bg = '#0a0a10';
  const dim = 'rgba(255,255,255,0.07)';
  const mid = 'rgba(255,255,255,0.16)';

  const Browser = (
    <g>
      <rect x={0} y={0} width={W} height={18} fill="rgba(255,255,255,0.05)" />
      <circle cx={9} cy={9} r={3.5} fill={withAlpha(a, 0.7)} />
      <circle cx={20} cy={9} r={3.5} fill={mid} />
      <circle cx={31} cy={9} r={3.5} fill={mid} />
      <rect x={48} y={5.5} width={200} height={7} rx={3} fill={dim} />
      <rect x={258} y={5.5} width={56} height={7} rx={3} fill={dim} />
    </g>
  );

  const NavBar = (
    <g>
      <rect x={0} y={18} width={W} height={22} fill="rgba(255,255,255,0.03)" />
      <rect x={10} y={26} width={48} height={6} rx={2} fill={withAlpha(a, 0.85)} />
      {[80, 118, 152, 184].map((x, i) => (
        <rect key={i} x={x} y={27} width={[28, 24, 26, 22][i]} height={5} rx={2} fill={mid} />
      ))}
      <circle cx={W - 14} cy={29} r={5} fill={withAlpha(a, 0.5)} />
    </g>
  );

  if (type === 'ecommerce') {
    if (frame === 0) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}{NavBar}
          <rect x={0} y={42} width={W} height={86} fill={withAlpha(a, 0.08)} />
          <rect x={20} y={56} width={130} height={11} rx={3} fill={mid} />
          <rect x={20} y={72} width={100} height={6} rx={2} fill={dim} />
          <rect x={20} y={84} width={75} height={6} rx={2} fill={dim} />
          <rect x={20} y={100} width={70} height={18} rx={3} fill={withAlpha(a, 0.7)} />
          <rect x={196} y={52} width={108} height={70} rx={4} fill={withAlpha(a, 0.18)} />
          <circle cx={250} cy={87} r={18} fill={withAlpha(a, 0.4)} />
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={10 + i * 102} y={140} width={92} height={70} rx={3} fill={dim} stroke={withAlpha(a, 0.25)} strokeWidth={0.5} />
              <rect x={10 + i * 102} y={140} width={92} height={32} fill={withAlpha(a, 0.12)} />
              <rect x={18 + i * 102} y={180} width={70} height={4} rx={2} fill={mid} />
              <rect x={18 + i * 102} y={188} width={50} height={4} rx={2} fill={dim} />
              <rect x={18 + i * 102} y={196} width={36} height={6} rx={2} fill={withAlpha(a, 0.7)} />
            </g>
          ))}
        </svg>
      );
    }
    if (frame === 1) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}{NavBar}
          <rect x={0} y={42} width={56} height={H - 42} fill="rgba(255,255,255,0.025)" />
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={6} y={50 + i * 18} width={[42, 36, 44, 32, 38][i]} height={5} rx={2}
              fill={i === 0 ? withAlpha(a, 0.85) : dim} />
          ))}
          {[0, 1, 2].map(c => [0, 1].map(r => (
            <g key={`${c}-${r}`}>
              <rect x={62 + c * 84} y={48 + r * 92} width={78} height={84} rx={3}
                fill="rgba(255,255,255,0.04)" stroke={withAlpha(a, 0.2)} strokeWidth={0.5} />
              <rect x={62 + c * 84} y={48 + r * 92} width={78} height={44} fill={withAlpha(a, 0.13)} />
              <circle cx={101 + c * 84} cy={70 + r * 92} r={11} fill={withAlpha(a, 0.4)} />
              <rect x={68 + c * 84} y={100 + r * 92} width={50} height={4} rx={2} fill={mid} />
              <rect x={68 + c * 84} y={108 + r * 92} width={32} height={4} rx={2} fill={withAlpha(a, 0.7)} />
              <rect x={108 + c * 84} y={106 + r * 92} width={26} height={10} rx={2} fill={withAlpha(a, 0.45)} />
            </g>
          )))}
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
        {Browser}{NavBar}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <circle cx={70 + i * 80} cy={56} r={9} fill={i <= 1 ? withAlpha(a, 0.8) : dim} />
            {i < 2 && <rect x={80 + i * 80} y={54} width={62} height={3} fill={i === 0 ? withAlpha(a, 0.6) : dim} />}
          </g>
        ))}
        <rect x={10} y={78} width={185} height={148} rx={3} fill="rgba(255,255,255,0.03)" />
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x={20} y={90 + i * 32} width={50} height={4} rx={2} fill={dim} />
            <rect x={20} y={98 + i * 32} width={165} height={16} rx={2}
              fill="rgba(255,255,255,0.05)" stroke={i === 1 ? withAlpha(a, 0.8) : 'rgba(255,255,255,0.1)'} strokeWidth={0.7} />
          </g>
        ))}
        <rect x={205} y={78} width={105} height={148} rx={3} fill="rgba(255,255,255,0.03)" />
        <rect x={205} y={78} width={105} height={22} fill={withAlpha(a, 0.12)} />
        <rect x={213} y={86} width={60} height={6} rx={2} fill={mid} />
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={213} y={108 + i * 18} width={60} height={4} rx={2} fill={dim} />
            <rect x={282} y={108 + i * 18} width={20} height={4} rx={2} fill={withAlpha(a, 0.6)} />
          </g>
        ))}
        <rect x={213} y={170} width={90} height={16} rx={3} fill={withAlpha(a, 0.7)} />
        <rect x={213} y={194} width={90} height={14} rx={3} fill={dim} stroke={withAlpha(a, 0.4)} strokeWidth={0.5} />
      </svg>
    );
  }

  if (type === 'dashboard') {
    if (frame === 0) {
      const nodes: [number, number, number][] = [
        [165, 105, 13], [215, 135, 8], [125, 145, 9], [205, 75, 7],
        [245, 165, 6], [105, 175, 7], [235, 55, 5], [85, 120, 6],
      ];
      const edges: [number, number, number, number][] = [
        [165, 105, 215, 135], [165, 105, 125, 145], [165, 105, 205, 75],
        [215, 135, 245, 165], [125, 145, 105, 175], [205, 75, 235, 55],
        [165, 105, 85, 120],
      ];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}{NavBar}
          <rect x={0} y={42} width={50} height={H - 42} fill="rgba(255,255,255,0.03)" />
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x={6} y={52 + i * 30} width={8} height={8} rx={2} fill={i === 0 ? withAlpha(a, 0.85) : dim} />
              <rect x={18} y={54 + i * 30} width={28} height={4} rx={2} fill={i === 0 ? withAlpha(a, 0.7) : dim} />
            </g>
          ))}
          {edges.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={withAlpha(a, 0.35)} strokeWidth={1} />
          ))}
          {nodes.map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r + 2} fill={withAlpha(a, 0.15)} />
              <circle cx={cx} cy={cy} r={r} fill={withAlpha(a, 0.55 + (i === 0 ? 0.25 : 0))} />
            </g>
          ))}
          <rect x={55} y={200} width={250} height={28} rx={3} fill="rgba(255,255,255,0.04)" />
          {[0, 1, 2].map(i => (
            <g key={i}>
              <circle cx={70 + i * 82} cy={214} r={4} fill={withAlpha(a, 0.7 - i * 0.18)} />
              <rect x={78 + i * 82} y={211} width={50} height={5} rx={2} fill={dim} />
            </g>
          ))}
        </svg>
      );
    }
    if (frame === 1) {
      const heights = [42, 30, 58, 38, 64, 48, 70];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}{NavBar}
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <rect x={10 + i * 76} y={48} width={68} height={48} rx={3}
                fill="rgba(255,255,255,0.04)" stroke={withAlpha(a, 0.2)} strokeWidth={0.5} />
              <rect x={18 + i * 76} y={56} width={40} height={4} rx={2} fill={dim} />
              <rect x={18 + i * 76} y={64} width={50} height={11} rx={2} fill={withAlpha(a, 0.55 + i * 0.06)} />
              <rect x={18 + i * 76} y={80} width={28} height={4} rx={2} fill={dim} />
            </g>
          ))}
          <rect x={10} y={104} width={195} height={104} rx={3} fill="rgba(255,255,255,0.03)" />
          {heights.map((h, i) => (
            <rect key={i} x={20 + i * 25} y={196 - h} width={16} height={h} rx={2} fill={withAlpha(a, 0.55 + i * 0.04)} />
          ))}
          <line x1={10} y1={196} x2={205} y2={196} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
          <rect x={215} y={104} width={95} height={104} rx={3} fill="rgba(255,255,255,0.03)" />
          {[0, 1, 2, 3, 4].map(i => (
            <g key={i}>
              <rect x={222} y={112 + i * 18} width={6} height={6} rx={1} fill={withAlpha(a, 0.7)} />
              <rect x={232} y={113 + i * 18} width={50} height={4} rx={2} fill={dim} />
              <rect x={286} y={113 + i * 18} width={18} height={4} rx={2} fill={withAlpha(a, 0.5)} />
            </g>
          ))}
          <rect x={10} y={216} width={300} height={16} rx={2} fill="rgba(255,255,255,0.02)" />
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
        {Browser}{NavBar}
        <rect x={10} y={48} width={300} height={20} fill={withAlpha(a, 0.18)} />
        {[10, 80, 150, 220, 270].map((x, i) => (
          <rect key={i} x={x + 4} y={55} width={[55, 55, 55, 40, 30][i]} height={5} rx={2} fill={mid} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map(r => (
          <g key={r}>
            <rect x={10} y={68 + r * 22} width={300} height={20}
              fill={r % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'} />
            <circle cx={22} cy={78 + r * 22} r={4} fill={withAlpha(a, 0.6)} />
            {[34, 80, 150, 220, 270].map((x, c) => (
              <rect key={c} x={x + 4} y={75 + r * 22} width={[40, 55, 55, 36, 30][c] - (r % 3) * 2} height={5} rx={2}
                fill={c === 4 ? withAlpha(a, 0.7) : dim} />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  if (type === 'terminal') {
    if (frame === 0) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#080d08' }} preserveAspectRatio="none">
          <rect x={0} y={0} width={W} height={20} fill="rgba(255,255,255,0.06)" />
          <circle cx={9} cy={10} r={3.5} fill="#ff5f56" opacity={0.85} />
          <circle cx={20} cy={10} r={3.5} fill="#ffbd2e" opacity={0.85} />
          <circle cx={31} cy={10} r={3.5} fill="#27c93f" opacity={0.85} />
          <rect x={80} y={6.5} width={160} height={7} rx={3} fill="rgba(255,255,255,0.1)" />
          {[
            [200, 0.95], [160, 0.7], [220, 1], [210, 1], [180, 0.7],
            [200, 0.6], [225, 1], [195, 0.65], [50, 0.9],
          ].map(([w, op], i) => (
            <rect key={i} x={10} y={32 + i * 22} width={w} height={5} rx={2}
              fill={i % 3 === 0 ? withAlpha(a, op) : 'rgba(255,255,255,0.6)'} opacity={op * 0.85} />
          ))}
          <rect x={10} y={232} width={6} height={6} fill={withAlpha(a, 0.9)}>
            <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    }
    if (frame === 1) {
      const bubbles = [
        { x: 10, y: 36, w: 165, h: 28, right: false },
        { x: 130, y: 72, w: 145, h: 22, right: true },
        { x: 10, y: 102, w: 185, h: 22, right: false },
        { x: 100, y: 132, w: 175, h: 28, right: true },
        { x: 10, y: 170, w: 155, h: 22, right: false },
      ];
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#080d08' }} preserveAspectRatio="none">
          <rect x={0} y={0} width={W} height={22} fill={withAlpha(a, 0.22)} />
          <circle cx={16} cy={11} r={6} fill={withAlpha(a, 0.7)} />
          <rect x={28} y={8} width={80} height={6} rx={2} fill={mid} />
          {bubbles.map((b, i) => (
            <g key={i}>
              <rect x={b.right ? W - b.x - b.w : b.x} y={b.y} width={b.w} height={b.h} rx={6}
                fill={b.right ? withAlpha(a, 0.5) : 'rgba(255,255,255,0.07)'} />
              <rect x={(b.right ? W - b.x - b.w : b.x) + 8} y={b.y + 7} width={b.w - 24} height={4} rx={2}
                fill={b.right ? 'rgba(255,255,255,0.6)' : mid} />
              {b.h > 25 && (
                <rect x={(b.right ? W - b.x - b.w : b.x) + 8} y={b.y + 16} width={b.w - 50} height={4} rx={2}
                  fill={b.right ? 'rgba(255,255,255,0.4)' : dim} />
              )}
            </g>
          ))}
          <rect x={0} y={210} width={W} height={30} fill="rgba(255,255,255,0.05)" />
          <rect x={8} y={218} width={250} height={14} rx={7} fill="rgba(255,255,255,0.07)" />
          <circle cx={295} cy={225} r={10} fill={withAlpha(a, 0.6)} />
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#080d08' }} preserveAspectRatio="none">
        {Browser}{NavBar}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={10 + i * 102} y={48} width={92} height={52} rx={3}
              fill="rgba(255,255,255,0.04)" stroke={withAlpha(a, 0.25)} strokeWidth={0.5} />
            <rect x={18 + i * 102} y={56} width={50} height={4} rx={2} fill={dim} />
            <rect x={18 + i * 102} y={64} width={60} height={12} rx={2} fill={withAlpha(a, 0.55)} />
            <rect x={18 + i * 102} y={80} width={40} height={4} rx={2} fill={dim} />
          </g>
        ))}
        <rect x={10} y={108} width={300} height={104} rx={3} fill="rgba(255,255,255,0.03)" />
        <polyline
          points="20,194 50,170 80,178 110,150 140,158 170,138 200,148 230,118 260,128 290,98"
          fill="none" stroke={withAlpha(a, 0.85)} strokeWidth={1.5}
        />
        <polygon
          points="20,194 50,170 80,178 110,150 140,158 170,138 200,148 230,118 260,128 290,98 290,212 20,212"
          fill={withAlpha(a, 0.12)}
        />
        {[20, 80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1={108} x2={x} y2={212} stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        ))}
        {[130, 160, 190].map(y => (
          <line key={y} x1={10} y1={y} x2={310} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
        ))}
        <rect x={10} y={220} width={300} height={14} rx={2} fill="rgba(255,255,255,0.02)" />
      </svg>
    );
  }

  if (type === 'social') {
    if (frame === 0) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}{NavBar}
          <rect x={0} y={42} width={50} height={H - 42} fill="rgba(255,255,255,0.025)" />
          {[0, 1, 2, 3].map(i => (
            <g key={i}>
              <circle cx={12} cy={56 + i * 26} r={6} fill={i === 0 ? withAlpha(a, 0.7) : dim} />
              <rect x={22} y={53 + i * 26} width={22} height={5} rx={2} fill={i === 0 ? withAlpha(a, 0.7) : dim} />
            </g>
          ))}
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={56} y={50 + i * 64} width={160} height={58} rx={3}
                fill="rgba(255,255,255,0.04)" stroke={withAlpha(a, 0.12)} strokeWidth={0.5} />
              <circle cx={68} cy={62 + i * 64} r={6} fill={withAlpha(a, 0.45)} />
              <rect x={80} y={58 + i * 64} width={70} height={4} rx={2} fill={mid} />
              <rect x={80} y={66 + i * 64} width={45} height={3} rx={2} fill={dim} />
              <rect x={64} y={78 + i * 64} width={140} height={4} rx={2} fill={dim} />
              <rect x={64} y={86 + i * 64} width={120} height={4} rx={2} fill={dim} />
              <rect x={64} y={98 + i * 64} width={28} height={5} rx={2} fill={withAlpha(a, 0.4)} />
              <rect x={98} y={98 + i * 64} width={28} height={5} rx={2} fill={dim} />
              <rect x={132} y={98 + i * 64} width={28} height={5} rx={2} fill={dim} />
            </g>
          ))}
          <rect x={224} y={50} width={88} height={186} rx={3} fill="rgba(255,255,255,0.025)" />
          <rect x={232} y={58} width={60} height={5} rx={2} fill={withAlpha(a, 0.65)} />
          {[0, 1, 2, 3, 4].map(i => (
            <g key={i}>
              <circle cx={236} cy={76 + i * 22} r={4} fill={dim} />
              <rect x={246} y={73 + i * 22} width={50} height={4} rx={2} fill={mid} />
              <rect x={246} y={80 + i * 22} width={32} height={3} rx={2} fill={dim} />
            </g>
          ))}
        </svg>
      );
    }
    if (frame === 1) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
          {Browser}
          <rect x={0} y={18} width={W} height={70} fill={withAlpha(a, 0.18)} />
          <rect x={0} y={18} width={W} height={70} fill={withAlpha(a, 0.05)} />
          <circle cx={50} cy={88} r={26} fill="#000" />
          <circle cx={50} cy={88} r={22} fill={withAlpha(a, 0.3)} stroke={withAlpha(a, 0.7)} strokeWidth={1.5} />
          <circle cx={50} cy={82} r={8} fill={withAlpha(a, 0.6)} />
          <rect x={84} y={92} width={110} height={10} rx={3} fill={mid} />
          <rect x={84} y={106} width={75} height={5} rx={2} fill={dim} />
          <rect x={84} y={114} width={60} height={5} rx={2} fill={dim} />
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={210 + i * 36} y={92} width={32} height={12} rx={2} fill={withAlpha(a, 0.6 - i * 0.1)} />
              <rect x={210 + i * 36} y={108} width={32} height={5} rx={2} fill={dim} />
            </g>
          ))}
          <rect x={10} y={130} width={60} height={5} rx={2} fill={withAlpha(a, 0.7)} />
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={10 + (i % 3) * 100} y={144 + Math.floor(i / 3) * 50}
              width={92} height={44} rx={2} fill={withAlpha(a, 0.05 + (i % 4) * 0.05)} />
          ))}
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
        {Browser}
        <rect x={0} y={18} width={84} height={H - 18} fill="rgba(255,255,255,0.025)" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <rect x={0} y={20 + i * 42} width={84} height={42} fill={i === 1 ? withAlpha(a, 0.18) : 'transparent'} />
            <circle cx={18} cy={40 + i * 42} r={11} fill={i === 1 ? withAlpha(a, 0.6) : dim} />
            <rect x={34} y={32 + i * 42} width={42} height={5} rx={2} fill={i === 1 ? mid : dim} />
            <rect x={34} y={42 + i * 42} width={32} height={4} rx={2} fill={dim} />
          </g>
        ))}
        <rect x={84} y={18} width={W - 84} height={26} fill="rgba(255,255,255,0.04)" />
        <circle cx={98} cy={31} r={8} fill={withAlpha(a, 0.6)} />
        <rect x={112} y={28} width={80} height={6} rx={2} fill={mid} />
        {[
          { w: 100, right: false, y: 52 },
          { w: 124, right: true, y: 80 },
          { w: 142, right: false, y: 110 },
          { w: 92, right: true, y: 138 },
          { w: 112, right: false, y: 166 },
        ].map((b, i) => (
          <rect key={i} x={b.right ? W - b.w - 10 : 92} y={b.y} width={b.w} height={20} rx={9}
            fill={b.right ? withAlpha(a, 0.55) : 'rgba(255,255,255,0.07)'} />
        ))}
        <rect x={84} y={208} width={W - 84} height={32} fill="rgba(255,255,255,0.04)" />
        <rect x={92} y={216} width={180} height={16} rx={8} fill="rgba(255,255,255,0.06)" />
        <circle cx={290} cy={224} r={9} fill={withAlpha(a, 0.6)} />
      </svg>
    );
  }

  if (type === 'game') {
    if (frame === 0) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#070708' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="game-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={a} stopOpacity={0.35} />
              <stop offset="100%" stopColor={a} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={W} height={138} fill="url(#game-sky)" />
          <rect x={0} y={138} width={W} height={102} fill="rgba(255,255,255,0.04)" />
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1={0} y1={138 + i * 22} x2={W} y2={138 + i * 22} stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
          ))}
          {[-2, -1, 0, 1, 2].map(i => (
            <line key={i} x1={160 + i * 38} y1={138} x2={160 + i * 130} y2={240} stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
          ))}
          {[[120, 110], [180, 105], [240, 115]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 8} y={y - 18} width={16} height={20} rx={2} fill={withAlpha(a, 0.4)} />
              <circle cx={x} cy={y - 24} r={6} fill={withAlpha(a, 0.4)} />
            </g>
          ))}
          <line x1={154} y1={118} x2={166} y2={118} stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} />
          <line x1={160} y1={112} x2={160} y2={124} stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} />
          <circle cx={160} cy={118} r={9} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1} />
          <rect x={5} y={216} width={92} height={18} rx={2} fill="rgba(0,0,0,0.7)" />
          <rect x={9} y={221} width={70} height={5} rx={2} fill="rgba(255,80,80,0.4)" />
          <rect x={9} y={221} width={48} height={5} rx={2} fill="rgba(255,80,80,0.95)" />
          <rect x={9} y={228} width={50} height={3} rx={1} fill={withAlpha(a, 0.8)} />
          <rect x={225} y={214} width={88} height={20} rx={2} fill="rgba(0,0,0,0.7)" />
          <rect x={232} y={219} width={14} height={10} rx={1} fill={withAlpha(a, 0.75)} />
          <rect x={250} y={219} width={6} height={10} rx={1} fill={withAlpha(a, 0.45)} />
          <rect x={260} y={219} width={6} height={10} rx={1} fill={withAlpha(a, 0.3)} />
          <rect x={272} y={222} width={36} height={5} rx={2} fill={mid} />
          <rect x={258} y={20} width={56} height={56} rx={3} fill="rgba(0,0,0,0.7)" stroke={withAlpha(a, 0.5)} strokeWidth={0.6} />
          <circle cx={286} cy={48} r={3} fill={withAlpha(a, 0.95)} />
          <line x1={286} y1={48} x2={295} y2={42} stroke={withAlpha(a, 0.9)} strokeWidth={1} />
          {[[273, 36], [300, 52], [280, 62]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2} fill="rgba(255,80,80,0.8)" />
          ))}
        </svg>
      );
    }
    if (frame === 1) {
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#06070a' }} preserveAspectRatio="none">
          <rect x={0} y={0} width={W} height={H} fill={withAlpha(a, 0.04)} />
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={`v${i}`} x1={i * 64} y1={0} x2={i * 64} y2={H} stroke={withAlpha(a, 0.05)} strokeWidth={1} />
          ))}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`h${i}`} x1={0} y1={i * 60} x2={W} y2={i * 60} stroke={withAlpha(a, 0.05)} strokeWidth={1} />
          ))}
          <rect x={50} y={26} width={220} height={26} rx={3} fill={withAlpha(a, 0.18)} />
          <rect x={70} y={34} width={180} height={10} rx={2} fill={withAlpha(a, 0.7)} />
          {['PLAY', 'OPTIONS', 'LOBBY', 'EXIT'].map((_, i) => (
            <g key={i}>
              <rect x={106} y={76 + i * 36} width={108} height={26} rx={2}
                fill={i === 0 ? withAlpha(a, 0.55) : 'rgba(255,255,255,0.05)'}
                stroke={i === 0 ? a : 'rgba(255,255,255,0.12)'} strokeWidth={0.6} />
              <rect x={124} y={86 + i * 36} width={72} height={6} rx={2}
                fill={i === 0 ? 'rgba(255,255,255,0.7)' : mid} />
            </g>
          ))}
          <circle cx={64} cy={196} r={36} fill={withAlpha(a, 0.05)} />
          <circle cx={256} cy={56} r={24} fill={withAlpha(a, 0.05)} />
        </svg>
      );
    }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: '#06070a' }} preserveAspectRatio="none">
        <rect x={0} y={0} width={W} height={H} fill={withAlpha(a, 0.04)} />
        <rect x={0} y={0} width={W} height={32} fill={withAlpha(a, 0.18)} />
        <rect x={10} y={11} width={120} height={10} rx={3} fill={withAlpha(a, 0.85)} />
        <rect x={230} y={11} width={80} height={10} rx={3} fill={mid} />
        <rect x={10} y={38} width={300} height={18} fill="rgba(255,255,255,0.06)" />
        {[10, 80, 138, 198, 252].map((x, i) => (
          <rect key={i} x={x} y={43} width={[60, 45, 50, 45, 55][i]} height={5} rx={2} fill={mid} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map(r => (
          <g key={r}>
            <rect x={10} y={58 + r * 24} width={300} height={20}
              fill={r === 0 ? withAlpha(a, 0.18) : r % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'} />
            <circle cx={22} cy={68 + r * 24} r={6} fill={r === 0 ? withAlpha(a, 0.7) : dim} />
            {[36, 100, 158, 218, 268].map((x, c) => (
              <rect key={c} x={x} y={65 + r * 24} width={[50, 30, 30, 25, 35][c]} height={5} rx={2}
                fill={c === 0 && r === 0 ? withAlpha(a, 0.85) : dim} />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', background: bg }} preserveAspectRatio="none">
      {Browser}{NavBar}
      <rect x={10} y={50} width={300} height={170} rx={4} fill={withAlpha(a, 0.1)} />
    </svg>
  );
}

function CRTViewer({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const FRAMES = shots.length > 0 ? shots.length : 3;
  const [phase, setPhase] = useState<'tuning' | 'stable'>('tuning');
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    setPhase('tuning');
    setFrameIdx(0);
  }, [project.id]);

  useEffect(() => {
    if (phase !== 'tuning') return;
    const t = setTimeout(() => setPhase('stable'), 1200);
    return () => clearTimeout(t);
  }, [phase, frameIdx, project.id]);

  useEffect(() => {
    if (phase !== 'stable') return;
    const t = setTimeout(() => {
      setFrameIdx(i => (i + 1) % FRAMES);
      setPhase('tuning');
    }, 3200);
    return () => clearTimeout(t);
  }, [phase, FRAMES]);

  return (
    <div className="crt-tv">
      <div className="crt-label lit">
        ▸ PREVIEW / CH.{String(frameIdx + 1).padStart(2, '0')} / {project.title}
      </div>
      <div className="crt-screen">
        {phase === 'tuning'
          ? <TuningStatic channel={frameIdx + 1} />
          : shots.length > 0
            ? <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${shots[frameIdx]}`} alt={`${project.title} screenshot ${frameIdx + 1}`} className="crt-img" />
            : <WireframeMockup type={project.mockup} color={project.color} frame={frameIdx} />}
        <div className="crt-scanlines" />
        <div className="crt-vignette" />
      </div>
      <div className="crt-dots">
        {Array.from({ length: FRAMES }).map((_, i) => (
          <span key={i} className={`crt-dot${i === frameIdx ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="hero">
      <div className="hero-left">
        <div className="label-small lit">NOW RUNNING — MBB/OS v3.2</div>
        <div className="hero-title lit">
          <Seg14>BUILD</Seg14><br />
          <Seg14>PRODUCTS</Seg14><br />
          <Seg14>THAT.SHIP</Seg14>
        </div>
        <div className="hero-sub lit">
          Full Stack Engineer. Java/Spring Boot, Angular, React/Next, Go, Rust —
          Automatisation, IA appliquee, Cybersecurite.
          Des besoins reels. Des livrables concrets.
        </div>
        <div className="label-small lit" style={{ marginTop: 14, opacity: 0.55 }}>
          ▸ USE PHYSICAL CONTROLS BELOW — ◀ ▶ NAV / ENTER INSPECT
        </div>
      </div>
      <div className="hero-right">
        <div className="gauge-row">
          <div className="label-small lit" style={{ marginBottom: 6 }}>▸ OPERATING PROFILE</div>
          {GAUGES.map(g => (
            <div className="gauge" key={g.name}>
              <span className="gauge-label lit">{g.name}</span>
              <Bar value={g.val} />
              <span className="gauge-val lit"><Seg7 value={g.val} width={3} /></span>
            </div>
          ))}
        </div>
        <div className="kpi-grid" style={{ marginTop: 6 }}>
          {KPIS.map(k => (
            <div className="kpi-cell" key={k.label}>
              <div className="kpi-label lit">{k.label}</div>
              <div className="kpi-val lit">
                <span className="seg-stack">
                  <span className="ghost" aria-hidden>{'8'.repeat(String(Math.floor(k.val)).length)}</span>
                  <CountUp to={k.val} decimals={k.val % 1 ? 1 : 0} />
                </span>{k.suffix}
              </div>
              <div className="kpi-unit lit">{k.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutScreen() {
  return (
    <div className="about">
      <div className="about-left">
        <div className="label-small lit">▸ SUBJECT PROFILE / 01</div>
        <h2 className="lit">
          <Seg14>MAMADOU</Seg14><br />
          <Seg14>BOBO.BAH</Seg14>
        </h2>
        <p className="lit">
          Selectionne parmi 100+ a la piscine Zone01 Dakar (pedagogie 42).
          Tronc commun Go / Rust / JS — specialisation Java Full Stack / Angular / React.
          30+ projets livres sous contrainte reelle. Bocalien, admin Linux, automatisation.
          Freelance : e-commerce, IA, automatisation. Master MSSI (securite) en cours.
          Je construis des systemes solides, securises et orientes resultats concrets.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
          <div className="kpi-cell" style={{ minWidth: 110 }}>
            <div className="kpi-label lit">LOCATION</div>
            <div className="kpi-val lit" style={{ fontSize: 18 }}>DAKAR</div>
            <div className="kpi-unit lit">SENEGAL</div>
          </div>
          <div className="kpi-cell" style={{ minWidth: 110 }}>
            <div className="kpi-label lit">STATUS</div>
            <div className="kpi-val lit" style={{ fontSize: 18 }}>READY</div>
            <div className="kpi-unit lit">FOR.WORK</div>
          </div>
        </div>
      </div>
      <div className="about-right">
        <div className="label-small lit">▸ CORE DEFINITIONS</div>
        {DEFINITIONS.map(d => (
          <div className="def-row lit" key={d.n}>
            <div className="n"><Seg7 value={d.n} width={2} /></div>
            <div className="t"><b>{d.b}</b> — {d.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsScreen({
  selected, focusIdx, scrollRef,
}: {
  selected: number | null;
  focusIdx: number;
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  if (selected) {
    const p = PROJECTS.find(x => x.id === selected)!;
    return (
      <div className="proj-detail">
        <div className="proj-detail-left">
          <div className="label-small lit">◀ PROJECT.{p.code} / {p.tag} — PRESS ENTER TO RETURN</div>
          <h2 className="lit"><Seg14>{p.title}</Seg14></h2>
          <div className="block">
            <div className="block-label lit">▸ PROBLEM</div>
            <div className="block-body lit">{p.problem}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ SOLUTION</div>
            <div className="block-body lit">{p.solution}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ VALUE CREATED</div>
            <div className="block-body lit">{p.value}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <div className="kpi-cell" style={{ padding: '16px 18px' }}>
            <div className="kpi-label lit">IMPACT METRIC</div>
            <div className="big-readout lit">
              <Seg7 value={p.metric.v} width={String(p.metric.v).length} />
            </div>
            <div className="kpi-unit lit">{p.metric.u}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ TECH STACK</div>
            <div className="proj-stack lit" style={{ marginTop: 6, opacity: 1 }}>
              {p.stack.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
          <CRTViewer project={p} />
          <div className="label-small lit" style={{ opacity: 0.55, textAlign: 'center' }}>
            ◀ ▶ CYCLE PROJECTS / ENTER TO EXIT
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ PROJECTS DATABASE — {PROJECTS.length} ENTRIES — ▲ ▼ TO SELECT / ENTER TO INSPECT</div>
      <div ref={scrollRef} className="projects scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {PROJECTS.map((p, i) => (
          <div className={`proj-card lit ${i === focusIdx ? 'focused' : ''}`} key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="proj-num"><Seg7 value={p.code} width={2} /></div>
              <div className="label-small lit" style={{ fontSize: 9, opacity: 0.6 }}>{p.tag}</div>
            </div>
            <div className="proj-title"><Seg14>{p.title}</Seg14></div>
            <div className="proj-desc">{p.desc}</div>
            <div className="proj-stack">
              {p.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}
            </div>
            <div className="proj-impact">
              <span className="v"><Seg7 value={p.metric.v} width={String(p.metric.v).length} /></span>
              <span className="u">{p.metric.u}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollHint({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const [state, setState] = useState({ top: true, bottom: false, pct: 0 });
  useEffect(() => {
    const el = targetRef.current; if (!el) return;
    const upd = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 2) { setState({ top: true, bottom: true, pct: 100 }); return; }
      setState({ top: el.scrollTop <= 2, bottom: el.scrollTop >= max - 2, pct: Math.round(el.scrollTop / max * 100) });
    };
    upd();
    el.addEventListener('scroll', upd);
    return () => el.removeEventListener('scroll', upd);
  }, [targetRef]);
  return (
    <div className="scroll-hint lit" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-seg14)', fontSize: 10, letterSpacing: '0.15em', opacity: 0.75 }}>
      <span style={{ opacity: state.top ? 0.25 : 1 }}>▲</span>
      <div style={{ flex: 1, height: 6, display: 'flex', gap: 1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ flex: 1, background: (i / 30 * 100 <= state.pct) ? 'var(--seg-on)' : 'var(--seg-off)', borderRadius: 1 }} />
        ))}
      </div>
      <span className={state.bottom ? '' : 'scroll-arrow-pulse'} style={{ opacity: state.bottom ? 0.25 : 1 }}>▼</span>
      <span style={{ minWidth: 38, textAlign: 'right' }}><Seg7 value={state.pct} width={3} />%</span>
    </div>
  );
}

export function SkillsScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', minHeight: 0, position: 'relative' }}>
      <div className="label-small lit">▸ COMPETENCY MATRIX — {SKILL_GROUPS.length} GROUPS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="skills-grid">
          {SKILL_GROUPS.map(g => (
            <div className="skill-group" key={g.title}>
              <div className="skill-group-title lit">
                <span><Seg14>{g.title}</Seg14></span>
                <span className="n"><Seg7 value={g.items.length} width={2} /></span>
              </div>
              {g.items.map(it => (
                <div className="skill-row lit" key={it.name}>
                  <span className="name">{it.name}</span>
                  <MiniBar value={it.s} cells={8} />
                  <span className="score"><Seg7 value={it.s} width={3} /></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function ExpScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ CAREER LOG — {EXPERIENCE.length} POSITIONS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <div className="exp-item lit" key={i}>
              <div>
                <div className="exp-period"><Seg7 value={e.period} width={e.period.length} /></div>
                <div className="exp-periodL">{e.periodLong}</div>
              </div>
              <div>
                <div className="exp-title"><Seg14>{e.title}</Seg14></div>
                <div className="exp-org">{e.org}</div>
                <ul className="exp-mission">
                  {e.missions.map((m, j) => <li key={j}>{m}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function EduScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ EDUCATION & CERTIFICATIONS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="certs" style={{ height: 'auto' }}>
          <div className="cert-col">
            <h3 className="lit">FORMATION</h3>
            {EDUCATION.map((e, i) => (
              <div className="cert-item lit" key={i}>
                <div>
                  <div className="cert-title"><Seg14>{e.title}</Seg14></div>
                  <div className="cert-org">{e.org} · {e.periodLong}</div>
                </div>
                <div className="cert-period"><Seg7 value={e.period} width={e.period.length} /></div>
              </div>
            ))}
          </div>
          <div className="cert-col">
            <h3 className="lit">CERTIFICATIONS</h3>
            {CERTS.map((c, i) => (
              <div className="cert-item lit" key={i}>
                <div>
                  <div className="cert-title"><Seg14>{c.title}</Seg14></div>
                  <div className="cert-org">{c.org}</div>
                </div>
                <div className="cert-period"><Seg7 value={c.period} width={4} /></div>
              </div>
            ))}
            <div className="cert-item lit">
              <div>
                <div className="cert-title"><Seg14>REFERENCE</Seg14></div>
                <div className="cert-org">SIKA MORONIKE — DIR. DELEGUEE ZONE01</div>
              </div>
              <div className="cert-period"><Seg7 value="REF" width={3} /></div>
            </div>
          </div>
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function ContactScreen() {
  const rows = [
    { k: 'email', l: 'EMAIL', v: IDENTITY.email },
    { k: 'phone', l: 'PHONE', v: IDENTITY.phone },
    { k: 'github', l: 'GITHUB', v: IDENTITY.github },
    { k: 'location', l: 'LOCATION', v: IDENTITY.location },
  ];
  return (
    <div className="contact">
      <div className="contact-left">
        <div className="label-small lit">▸ INCOMING CHANNEL — STATUS: OPEN</div>
        <h2 className="lit" style={{ fontFamily: 'var(--font-seg14)', fontSize: 'clamp(28px,3.8vw,56px)', fontWeight: 700, lineHeight: 1, letterSpacing: '0.01em', marginTop: 14 }}>
          <Seg14>LETS</Seg14><br />
          <Seg14>BUILD</Seg14><br />
          <Seg14>SOMETHING</Seg14>
        </h2>
        <div className="pitch lit" style={{ marginTop: 14 }}>
          Discutons de votre produit : objectif, contraintes, impact attendu.
          Freelance ou mission longue — je reponds vite.
        </div>
      </div>
      <div className="contact-right">
        {rows.map(r => (
          <div className="contact-row lit" key={r.k}>
            <div className="l">{r.l}</div>
            <div className="v">{r.v}</div>
            <div className="c">◉</div>
          </div>
        ))}
        <div className="label-small lit" style={{ marginTop: 12, opacity: 0.55 }}>
          ▸ PRESS ENTER TO OPEN MAIL CLIENT
        </div>
      </div>
    </div>
  );
}
