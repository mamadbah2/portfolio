'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Screw, TopRail, StatusBar, BottomBar, BottomRail, Boot } from './chrome';
import { HomeScreen, AboutScreen, ProjectsScreen, SkillsScreen, ExpScreen, EduScreen, ContactScreen } from './screens';
import { Tweaks, TWEAK_DEFAULTS, TweakState } from './tweaks';
import { SECTIONS, PROJECTS } from '@/lib/data';
import * as audio from './audio';

const THEMES = ['blue', 'green', 'amber', 'red', 'mono'] as const;

export default function App() {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState('HOME');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectFocus, setProjectFocus] = useState(0);
  const [flicker, setFlicker] = useState(false);
  const [tweaks, setTweaks] = useState<TweakState>({ ...TWEAK_DEFAULTS });
  const [intensity, setIntensityRaw] = useState(80);
  const [showTweaks, setShowTweaks] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setIntensity = (v: number) => {
    setIntensityRaw(v);
    if (typeof localStorage !== 'undefined') localStorage.setItem('mbb.intensity', String(v));
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mbb.section');
      if (saved) setSection(saved);
      const savedInt = parseInt(localStorage.getItem('mbb.intensity') || '');
      if (!isNaN(savedInt)) setIntensityRaw(savedInt);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.scanlines = tweaks.scanlines;
    document.body.dataset.stress = tweaks.stress ? 'on' : 'off';
    document.documentElement.style.setProperty('--ghost', (tweaks.ghosting / 100).toFixed(3));
    document.documentElement.style.setProperty('--scanline', tweaks.scanlines === 'on' ? '0.08' : '0');
    if (tweaks.sound) { audio.enable(); audio.setMuted(false); }
    else { audio.setMuted(true); }
  }, [tweaks]);

  useEffect(() => {
    const k = intensity / 100;
    document.documentElement.style.setProperty('--lcd-brightness', (0.2 + k * 1.0).toFixed(2));
    document.documentElement.style.setProperty('--lcd-contrast', (0.7 + k * 0.5).toFixed(2));
  }, [intensity]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('mbb.section', section);
  }, [section]);

  const goTo = useCallback((id: string) => {
    if (id === section) return;
    setFlicker(true);
    setSelectedProject(null);
    setProjectFocus(0);
    setTimeout(() => {
      setSection(id);
      requestAnimationFrame(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; });
      setTimeout(() => setFlicker(false), 30);
    }, 180);
  }, [section]);

  const goPrev = useCallback(() => {
    audio.tick();
    if (section === 'PROJECTS' && selectedProject) {
      const i = PROJECTS.findIndex(p => p.id === selectedProject);
      setSelectedProject(PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length].id);
      return;
    }
    const i = SECTIONS.findIndex(s => s.id === section);
    goTo(SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length].id);
  }, [section, selectedProject, goTo]);

  const goNext = useCallback(() => {
    audio.tick();
    if (section === 'PROJECTS' && selectedProject) {
      const i = PROJECTS.findIndex(p => p.id === selectedProject);
      setSelectedProject(PROJECTS[(i + 1) % PROJECTS.length].id);
      return;
    }
    const i = SECTIONS.findIndex(s => s.id === section);
    goTo(SECTIONS[(i + 1) % SECTIONS.length].id);
  }, [section, selectedProject, goTo]);

  const animScroll = (el: HTMLDivElement | null, delta: number) => {
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    el.scrollTop = Math.max(0, Math.min(max, el.scrollTop + delta));
  };

  const goUp = useCallback(() => {
    audio.tick();
    if (section === 'PROJECTS' && !selectedProject) {
      const next = Math.max(0, projectFocus - 1);
      setProjectFocus(next);
      setTimeout(() => {
        const card = scrollRef.current?.querySelector(`.proj-card:nth-child(${next + 1})`) as HTMLElement | null;
        if (card && scrollRef.current) {
          const er = card.getBoundingClientRect(), cr = scrollRef.current.getBoundingClientRect();
          let delta = 0;
          if (er.top < cr.top) delta = er.top - cr.top - 8;
          else if (er.bottom > cr.bottom) delta = er.bottom - cr.bottom + 8;
          if (delta !== 0) scrollRef.current.scrollTop += delta;
        }
      }, 0);
      return;
    }
    animScroll(scrollRef.current, -90);
  }, [section, selectedProject, projectFocus]);

  const goDown = useCallback(() => {
    audio.tick();
    if (section === 'PROJECTS' && !selectedProject) {
      const next = Math.min(PROJECTS.length - 1, projectFocus + 1);
      setProjectFocus(next);
      setTimeout(() => {
        const card = scrollRef.current?.querySelector(`.proj-card:nth-child(${next + 1})`) as HTMLElement | null;
        if (card && scrollRef.current) {
          const er = card.getBoundingClientRect(), cr = scrollRef.current.getBoundingClientRect();
          let delta = 0;
          if (er.top < cr.top) delta = er.top - cr.top - 8;
          else if (er.bottom > cr.bottom) delta = er.bottom - cr.bottom + 8;
          if (delta !== 0) scrollRef.current.scrollTop += delta;
        }
      }, 0);
      return;
    }
    animScroll(scrollRef.current, 90);
  }, [section, selectedProject, projectFocus]);

  const cycleTheme = useCallback(() => {
    audio.click();
    setTweaks(t => {
      const i = THEMES.indexOf(t.theme as typeof THEMES[number]);
      const next = THEMES[(i === -1 ? 0 : i + 1) % THEMES.length];
      return { ...t, theme: next };
    });
  }, []);

  const onEnter = useCallback(() => {
    if (section === 'PROJECTS') {
      if (selectedProject) { setSelectedProject(null); return; }
      const p = PROJECTS[projectFocus];
      if (p) setSelectedProject(p.id);
      return;
    }
    if (section === 'CONTACT') {
      window.location.href = 'mailto:bahmamadoubobosewa@gmail.com';
      return;
    }
    setFlicker(true);
    setTimeout(() => setFlicker(false), 280);
  }, [section, selectedProject, projectFocus]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      const key = e.key.toLowerCase();
      if (key >= '1' && key <= '7') {
        const idx = parseInt(key) - 1;
        if (SECTIONS[idx]) goTo(SECTIONS[idx].id);
      } else if (key === 'arrowleft') { goPrev(); }
      else if (key === 'arrowright') { goNext(); }
      else if (key === 'arrowup') { e.preventDefault(); goUp(); }
      else if (key === 'arrowdown') { e.preventDefault(); goDown(); }
      else if (key === 'enter' || key === ' ') { onEnter(); }
      else if (key === '+' || key === '=') { setIntensity(Math.min(100, intensity + 5)); }
      else if (key === '-' || key === '_') { setIntensity(Math.max(0, intensity - 5)); }
      else if (key === 'm') { setTweaks(t => ({ ...t, sound: !t.sound })); }
      else if (key === 't') { cycleTheme(); }
      else if (key === 'y') { setShowTweaks(v => !v); }
      else if (key === 'escape') { setSelectedProject(null); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [section, selectedProject, projectFocus, intensity, goTo, goPrev, goNext, goUp, goDown, onEnter, cycleTheme]);

  const renderScreen = () => {
    switch (section) {
      case 'HOME': return <HomeScreen />;
      case 'ABOUT': return <AboutScreen />;
      case 'PROJECTS': return <ProjectsScreen selected={selectedProject} focusIdx={projectFocus} scrollRef={scrollRef} />;
      case 'SKILLS': return <SkillsScreen scrollRef={scrollRef} />;
      case 'EXP': return <ExpScreen scrollRef={scrollRef} />;
      case 'EDU': return <EduScreen scrollRef={scrollRef} />;
      case 'CONTACT': return <ContactScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      <div className="chassis">
        <div className="pcb">
          <Screw cls="tl" /><Screw cls="tr" /><Screw cls="bl" /><Screw cls="br" />
          <TopRail />
          <div className="lcd-wrap">
            <div className="lcd">
              <div className={`screen ${flicker ? 'flicker' : ''}`}>
                <StatusBar current={section} />
                <div className="screen-body">
                  {renderScreen()}
                </div>
                <BottomBar current={section} selectedProject={selectedProject} />
              </div>
            </div>
          </div>
          <BottomRail
            goPrev={goPrev}
            goNext={goNext}
            goUp={goUp}
            goDown={goDown}
            goHome={() => goTo('HOME')}
            onEnter={onEnter}
            toggleMute={() => setTweaks(t => ({ ...t, sound: !t.sound }))}
            muted={!tweaks.sound}
            intensity={intensity}
            setIntensity={setIntensity}
            theme={tweaks.theme}
            onTheme={cycleTheme}
          />
        </div>
        {showTweaks && <Tweaks tweaks={tweaks} setTweaks={setTweaks} />}
      </div>
    </>
  );
}
