'use client';
import { IDENTITY } from '@/lib/data';

export default function Hero() {
  return (
    <section className="pro-hero" aria-labelledby="hero-title">
      <div className="pro-hero-meta">
        <span className="pro-eyebrow">Portfolio · 2026</span>
        <span className="pro-badge">
          <span className="pro-dot" />
          OPEN TO FREELANCE
        </span>
      </div>

      <h1 id="hero-title" className="pro-hero-name">
        <span className="pro-hero-word" style={{ ['--delay' as string]: '0ms' }}>Mamadou</span>
        <span className="pro-hero-word" style={{ ['--delay' as string]: '120ms' }}>Bobo</span>
        <span className="pro-hero-word" style={{ ['--delay' as string]: '240ms' }}>Bah<span className="pro-hero-period">.</span></span>
      </h1>

      <div className="pro-hero-sub">
        <p className="pro-hero-role">Senior Full Stack Engineer</p>
        <p className="pro-hero-loc">{IDENTITY.location} · Remote friendly</p>
      </div>

      <div className="pro-hero-scroll" aria-hidden>
        <span className="pro-hero-scroll-label">scroll</span>
        <span className="pro-hero-scroll-line" />
      </div>
    </section>
  );
}
