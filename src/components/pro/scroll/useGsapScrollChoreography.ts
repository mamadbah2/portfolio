'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScrollChoreography() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ─── Hero split-letter reveal ───
        gsap.to('.pro-hero-name .char', {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.04,
          delay: 0.2,
        });

        gsap.from('.pro-hero-meta, .pro-hero-sub, .pro-hero-scroll', {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.9,
        });

        // ─── Bio section reveal ───
        gsap.to('.pro-bio .pro-definition', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.pro-bio', start: 'top 75%', once: true },
        });

        gsap.from('.pro-bio-text > *', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.pro-bio', start: 'top 75%', once: true },
        });

        // ─── Projects cards fade on enter (mobile stacked only shows these; desktop uses horizontal scroll) ───
        gsap.from('.pro-projects-card-wrapper', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.pro-projects', start: 'top 70%', once: true },
        });

        // ─── Skills section reveal ───
        gsap.to('.pro-skills .pro-skill-group', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.pro-skills', start: 'top 75%', once: true },
        });

        gsap.to('.pro-skills .pro-skill-tag', {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.4)',
          stagger: { each: 0.02, from: 'random' },
          scrollTrigger: { trigger: '.pro-skills', start: 'top 70%', once: true },
          delay: 0.2,
        });

        // ─── Education / Contact fade-ups ───
        gsap.from('.pro-education .pro-edu-item', {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.pro-education', start: 'top 75%', once: true },
        });

        gsap.from('.pro-contact-body > *', {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.pro-contact', start: 'top 75%', once: true },
        });

        // ─── Experience timeline fill (scrub without pin) ───
        gsap.fromTo(
          '.pro-timeline-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.pro-timeline',
              start: 'top 80%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );

        gsap.from('.pro-timeline-item', {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.pro-experience', start: 'top 70%', once: true },
        });
      });

      // ─── Horizontal projects (desktop only + motion-allowed) ───
      mm.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 861px)',
        () => {
          const section = document.querySelector<HTMLElement>('.pro-projects');
          const track = document.querySelector<HTMLElement>('.pro-projects-track');
          if (!section || !track) return;

          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, {
            x: () => `-${getDistance()}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);
}
