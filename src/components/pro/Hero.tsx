'use client';
import { IDENTITY } from '@/lib/data';
import HeroField from './webgl/HeroField';
import HeroSculpture from './webgl/HeroSculpture';
import SplitChars from './scroll/SplitChars';

export default function Hero() {
  return (
    <section className="pro-hero" aria-labelledby="hero-title">
      <HeroField />
      <HeroSculpture />
      <div className="pro-hero-meta">
        <span className="pro-eyebrow">Portfolio · 2026</span>
        <span className="pro-badge">
          <span className="pro-dot" />
          OPEN TO FREELANCE
        </span>
      </div>

      <h1 id="hero-title" className="pro-hero-name" aria-label="Mamadou Bobo Bah.">
        <span className="pro-hero-word"><SplitChars text="Mamadou" startIndex={0} /></span>
        <span className="pro-hero-word"><SplitChars text="Bobo" startIndex={7} /></span>
        <span className="pro-hero-word">
          <SplitChars text="Bah" startIndex={11} />
          <span className="pro-hero-period char" aria-hidden="true" style={{ ['--i' as string]: 14 }}>.</span>
        </span>
      </h1>

      <div className="pro-hero-sub">
        <p className="pro-hero-role">Full Stack Engineer Confirmé</p>
        <p className="pro-hero-loc">{IDENTITY.location} · Remote friendly</p>
      </div>

      <div className="pro-hero-scroll" aria-hidden>
        <span className="pro-hero-scroll-label">scroll</span>
        <span className="pro-hero-scroll-line" />
      </div>
    </section>
  );
}
