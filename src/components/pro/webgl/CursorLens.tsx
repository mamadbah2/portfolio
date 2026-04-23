'use client';
import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { subscribe } from './rafLoop';
import { readPalette } from './util/readPalette';
import { cursorBlobFrag } from './shaders/cursorBlob';
import { fullscreenVert } from './shaders/heroField';

export default function CursorLens() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(2, window.devicePixelRatio || 1),
        alpha: true,
        antialias: false,
        depth: false,
        premultipliedAlpha: false,
      });
    } catch {
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const palette = readPalette(document.body);

    const program = new Program(gl, {
      vertex: fullscreenVert,
      fragment: cursorBlobFrag,
      transparent: true,
      uniforms: {
        uResolution: { value: [1, 1] as [number, number] },
        uMouse: { value: [-1000, -1000] as [number, number] },
        uIntensity: { value: 0 },
        uRadius: { value: 180 },
        uTime: { value: 0 },
        uInk: { value: palette.ink },
        uAccent: { value: palette.accent },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, last: 0 };
    let intensity = 0;
    let intensityTarget = 0;
    let radiusTarget = 220;
    let hoveredEl: Element | null = null;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = dx;
      mouse.vy = dy;
      const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 20);
      intensityTarget = Math.max(intensityTarget, 0.55 + speed * 0.45);
      mouse.last = now;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el !== hoveredEl) {
        hoveredEl = el;
        const amp = el?.closest('[data-xp-hover], a, button') ? 1 : 0;
        radiusTarget = amp ? 300 : 180;
      }
    };

    const onLeave = () => {
      intensityTarget = 0;
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    const unsub = subscribe((dt, t) => {
      const idleMs = performance.now() - mouse.last;
      if (idleMs > 180) intensityTarget *= 0.94;
      intensity += (intensityTarget - intensity) * 0.08;
      const currentRadius = program.uniforms.uRadius.value as number;
      program.uniforms.uRadius.value = currentRadius + (radiusTarget - currentRadius) * 0.1;
      program.uniforms.uIntensity.value = intensity;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uTime.value = t * 0.001;

      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.render({ scene: mesh });
    });

    return () => {
      unsub();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} className="pro-cursor-lens" aria-hidden="true" />;
}
