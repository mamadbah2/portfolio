'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from './Scene3D';

export default function HeroSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    setCanRender(true);
  }, []);

  useEffect(() => {
    if (!canRender) return;
    const onScroll = () => {
      const host = hostRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      scrollRef.current = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
    };
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, [canRender]);

  if (!canRender) return null;

  return (
    <div ref={hostRef} className="pro-hero-sculpture" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 35 }}
      >
        <Scene3D scrollRef={scrollRef} mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
