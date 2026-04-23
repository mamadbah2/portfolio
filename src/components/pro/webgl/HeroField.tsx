'use client';
import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { subscribe } from './rafLoop';
import { readPalette } from './util/readPalette';
import { fullscreenVert, heroFieldFrag } from './shaders/heroField';

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(2, window.devicePixelRatio || 1),
        alpha: false,
        antialias: false,
        depth: false,
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const palette = readPalette(document.body);

    const program = new Program(gl, {
      vertex: fullscreenVert,
      fragment: heroFieldFrag,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] as [number, number] },
        uResolution: { value: [1, 1] as [number, number] },
        uScroll: { value: 0 },
        uInk: { value: palette.ink },
        uBg: { value: palette.bg },
        uAccent: { value: palette.accent },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value = [rect.width, rect.height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      target.y = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
    };
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasFinePointer) window.addEventListener('mousemove', onMove);

    const unsub = subscribe((_dt, t) => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uTime.value = t * 0.001;

      const rect = host.getBoundingClientRect();
      const scrolled = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      program.uniforms.uScroll.value = scrolled;

      renderer.render({ scene: mesh });
    });

    const raf = requestAnimationFrame(() => setReady(true));

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      if (hasFinePointer) window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className={`pro-hero-field ${ready ? 'is-ready' : ''}`} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
