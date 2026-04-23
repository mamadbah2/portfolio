'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type Choice = 'retro' | 'pro';

const PIXEL_PATTERN = [
  // 3×3 phosphor grid, echoing the favicon (on = 1, off = 0)
  [1, 0, 1],
  [0, 1, 0],
  [1, 1, 0],
];

export default function Chooser() {
  const router = useRouter();
  const retroRef = useRef<HTMLAnchorElement>(null);
  const proRef = useRef<HTMLAnchorElement>(null);
  const [focused, setFocused] = useState<Choice | null>(null);

  const pick = useCallback((choice: Choice, e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    try { localStorage.setItem('mbb.experience', choice); } catch {}
    router.replace(`/${choice}/`);
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); retroRef.current?.focus(); setFocused('retro'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); proRef.current?.focus(); setFocused('pro'); }
      else if (e.key === 'Enter' && focused) { e.preventDefault(); pick(focused); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, pick]);

  return (
    <>
      <header className="chooser-header" aria-hidden>
        <span>M.B.B.</span>
        <span>DAKAR · SENEGAL · 2026</span>
      </header>
      <main className="chooser">
        <a
          ref={retroRef}
          href="/retro/"
          className="panel panel-retro"
          aria-label="Enter retro console experience"
          onClick={(e) => pick('retro', e)}
          onFocus={() => setFocused('retro')}
          onMouseEnter={() => setFocused('retro')}
        >
          <span className="panel-label">PORT:A — RETRO CONSOLE</span>
          <div className="panel-crt" aria-hidden>
            <div className="panel-pixels">
              {PIXEL_PATTERN.flat().map((on, i) => (
                <span key={i} className={on ? 'on' : ''} />
              ))}
            </div>
            <div className="panel-idle">BUILD.PRODUCTS.THAT.SHIP</div>
            <div className="panel-scanlines" />
            <div className="panel-vignette" />
            <div className="panel-sweep" />
          </div>
          <span className="panel-cta">▸ BOOT SYSTEM</span>
        </a>
        <a
          ref={proRef}
          href="/pro/"
          className="panel panel-pro"
          aria-label="Enter editorial experience"
          onClick={(e) => pick('pro', e)}
          onFocus={() => setFocused('pro')}
          onMouseEnter={() => setFocused('pro')}
        >
          <span className="panel-label">PORT:B — EDITORIAL</span>
          <span className="panel-mark" aria-hidden>M</span>
          <span className="panel-sub">
            The editorial side. Typo, blanc, air. Fullstack engineer · 2026.
          </span>
          <span className="panel-cta">Enter →</span>
          <div className="panel-grain" aria-hidden />
        </a>
      </main>
    </>
  );
}
