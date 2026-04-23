'use client';
import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';
import { subscribe } from './rafLoop';
import { fullscreenVert } from './shaders/heroField';
import { imageDisplaceFrag } from './shaders/imageDisplace';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ProjectCanvas({ src, alt, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [canvasActive, setCanvasActive] = useState(false);

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

    const imageTexture = new Texture(gl, { generateMipmaps: false });

    const program = new Program(gl, {
      vertex: fullscreenVert,
      fragment: imageDisplaceFrag,
      uniforms: {
        uImage: { value: imageTexture },
        uHover: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: [1, 1] as [number, number] },
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

    let hover = 0;
    let hoverTarget = 0;
    const onEnter = () => { hoverTarget = 1; };
    const onLeave = () => { hoverTarget = 0; };

    let unsub: (() => void) | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !unsub) {
          unsub = subscribe((_dt, t) => {
            hover += (hoverTarget - hover) * 0.08;
            program.uniforms.uHover.value = hover;
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
          });
        } else if (!entry.isIntersecting && unsub) {
          unsub();
          unsub = null;
        }
      },
      { rootMargin: '200px' }
    );

    let disposed = false;
    const img = new Image();
    img.onload = () => {
      if (disposed) return;
      imageTexture.image = img;
      setCanvasActive(true);
      host.addEventListener('mouseenter', onEnter);
      host.addEventListener('mouseleave', onLeave);
      io.observe(host);
    };
    img.onerror = () => {
      /* keep fallback <img> visible */
    };
    img.src = src;

    return () => {
      disposed = true;
      unsub?.();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('mouseenter', onEnter);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, [src]);

  return (
    <div ref={hostRef} className={`pro-project-canvas ${canvasActive ? 'is-active' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
