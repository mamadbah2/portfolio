'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
): { ref: RefObject<T | null>; inView: boolean } {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
