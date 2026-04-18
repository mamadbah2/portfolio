'use client';
import { useRef, useEffect, useState, RefObject } from 'react';
import { Seg7, Seg14, Bar, MiniBar, CountUp } from './primitives';
import { IDENTITY, KPIS, GAUGES, PROJECTS, SKILL_GROUPS, EXPERIENCE, EDUCATION, CERTS, DEFINITIONS } from '@/lib/data';

export function HomeScreen() {
  return (
    <div className="hero">
      <div className="hero-left">
        <div className="label-small lit">NOW RUNNING — MBB/OS v3.2</div>
        <div className="hero-title lit">
          <Seg14>BUILD</Seg14><br />
          <Seg14>PRODUCTS</Seg14><br />
          <Seg14>THAT.SHIP</Seg14>
        </div>
        <div className="hero-sub lit">
          Senior Full Stack Engineer. React/Node, automatisation, IA appliquee.
          Je transforme des besoins business en resultats mesurables.
        </div>
        <div className="label-small lit" style={{ marginTop: 14, opacity: 0.55 }}>
          ▸ USE PHYSICAL CONTROLS BELOW — ◀ ▶ NAV / ENTER INSPECT
        </div>
      </div>
      <div className="hero-right">
        <div className="gauge-row">
          <div className="label-small lit" style={{ marginBottom: 6 }}>▸ OPERATING PROFILE</div>
          {GAUGES.map(g => (
            <div className="gauge" key={g.name}>
              <span className="gauge-label lit">{g.name}</span>
              <Bar value={g.val} />
              <span className="gauge-val lit"><Seg7 value={g.val} width={3} /></span>
            </div>
          ))}
        </div>
        <div className="kpi-grid" style={{ marginTop: 6 }}>
          {KPIS.map(k => (
            <div className="kpi-cell" key={k.label}>
              <div className="kpi-label lit">{k.label}</div>
              <div className="kpi-val lit">
                <span className="seg-stack">
                  <span className="ghost" aria-hidden>{'8'.repeat(String(Math.floor(k.val)).length)}</span>
                  <CountUp to={k.val} decimals={k.val % 1 ? 1 : 0} />
                </span>{k.suffix}
              </div>
              <div className="kpi-unit lit">{k.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutScreen() {
  return (
    <div className="about">
      <div className="about-left">
        <div className="label-small lit">▸ SUBJECT PROFILE / 01</div>
        <h2 className="lit">
          <Seg14>MAMADOU</Seg14><br />
          <Seg14>BOBO.BAH</Seg14>
        </h2>
        <p className="lit">
          Developpeur Full Stack avec plus de 3 ans d&apos;experience. Je conçois,
          developpe et optimise des plateformes web orientees usage reel, en
          combinant execution technique rapide avec une logique produit orientee
          conversion et performance.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
          <div className="kpi-cell" style={{ minWidth: 110 }}>
            <div className="kpi-label lit">LOCATION</div>
            <div className="kpi-val lit" style={{ fontSize: 18 }}>DAKAR</div>
            <div className="kpi-unit lit">SENEGAL</div>
          </div>
          <div className="kpi-cell" style={{ minWidth: 110 }}>
            <div className="kpi-label lit">STATUS</div>
            <div className="kpi-val lit" style={{ fontSize: 18 }}>READY</div>
            <div className="kpi-unit lit">FOR.WORK</div>
          </div>
        </div>
      </div>
      <div className="about-right">
        <div className="label-small lit">▸ CORE DEFINITIONS</div>
        {DEFINITIONS.map(d => (
          <div className="def-row lit" key={d.n}>
            <div className="n"><Seg7 value={d.n} width={2} /></div>
            <div className="t"><b>{d.b}</b> — {d.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsScreen({
  selected, focusIdx, scrollRef,
}: {
  selected: number | null;
  focusIdx: number;
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  if (selected) {
    const p = PROJECTS.find(x => x.id === selected)!;
    return (
      <div className="proj-detail">
        <div className="proj-detail-left">
          <div className="label-small lit">◀ PROJECT.{p.code} / {p.tag} — PRESS ENTER TO RETURN</div>
          <h2 className="lit"><Seg14>{p.title}</Seg14></h2>
          <div className="block">
            <div className="block-label lit">▸ PROBLEM</div>
            <div className="block-body lit">{p.problem}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ SOLUTION</div>
            <div className="block-body lit">{p.solution}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ VALUE CREATED</div>
            <div className="block-body lit">{p.value}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="kpi-cell" style={{ padding: '16px 18px' }}>
            <div className="kpi-label lit">IMPACT METRIC</div>
            <div className="big-readout lit">
              <Seg7 value={p.metric.v} width={String(p.metric.v).length} />
            </div>
            <div className="kpi-unit lit">{p.metric.u}</div>
          </div>
          <div className="block">
            <div className="block-label lit">▸ TECH STACK</div>
            <div className="proj-stack lit" style={{ marginTop: 6, opacity: 1 }}>
              {p.stack.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
          <div className="label-small lit" style={{ marginTop: 'auto', opacity: 0.55 }}>
            ◀ ▶ CYCLE PROJECTS / ENTER TO EXIT
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ PROJECTS DATABASE — {PROJECTS.length} ENTRIES — ▲ ▼ TO SELECT / ENTER TO INSPECT</div>
      <div ref={scrollRef} className="projects scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {PROJECTS.map((p, i) => (
          <div className={`proj-card lit ${i === focusIdx ? 'focused' : ''}`} key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="proj-num"><Seg7 value={p.code} width={2} /></div>
              <div className="label-small lit" style={{ fontSize: 9, opacity: 0.6 }}>{p.tag}</div>
            </div>
            <div className="proj-title"><Seg14>{p.title}</Seg14></div>
            <div className="proj-desc">{p.desc}</div>
            <div className="proj-stack">
              {p.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}
            </div>
            <div className="proj-impact">
              <span className="v"><Seg7 value={p.metric.v} width={String(p.metric.v).length} /></span>
              <span className="u">{p.metric.u}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollHint({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const [state, setState] = useState({ top: true, bottom: false, pct: 0 });
  useEffect(() => {
    const el = targetRef.current; if (!el) return;
    const upd = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 2) { setState({ top: true, bottom: true, pct: 100 }); return; }
      setState({ top: el.scrollTop <= 2, bottom: el.scrollTop >= max - 2, pct: Math.round(el.scrollTop / max * 100) });
    };
    upd();
    el.addEventListener('scroll', upd);
    return () => el.removeEventListener('scroll', upd);
  }, [targetRef]);
  return (
    <div className="scroll-hint lit" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-seg14)', fontSize: 10, letterSpacing: '0.15em', opacity: 0.75 }}>
      <span style={{ opacity: state.top ? 0.25 : 1 }}>▲</span>
      <div style={{ flex: 1, height: 6, display: 'flex', gap: 1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ flex: 1, background: (i / 30 * 100 <= state.pct) ? 'var(--seg-on)' : 'var(--seg-off)', borderRadius: 1 }} />
        ))}
      </div>
      <span className={state.bottom ? '' : 'scroll-arrow-pulse'} style={{ opacity: state.bottom ? 0.25 : 1 }}>▼</span>
      <span style={{ minWidth: 38, textAlign: 'right' }}><Seg7 value={state.pct} width={3} />%</span>
    </div>
  );
}

export function SkillsScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', minHeight: 0, position: 'relative' }}>
      <div className="label-small lit">▸ COMPETENCY MATRIX — {SKILL_GROUPS.length} GROUPS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px' }}>
          {SKILL_GROUPS.map(g => (
            <div className="skill-group" key={g.title}>
              <div className="skill-group-title lit">
                <span><Seg14>{g.title}</Seg14></span>
                <span className="n"><Seg7 value={g.items.length} width={2} /></span>
              </div>
              {g.items.map(it => (
                <div className="skill-row lit" key={it.name}>
                  <span className="name">{it.name}</span>
                  <MiniBar value={it.s} cells={8} />
                  <span className="score"><Seg7 value={it.s} width={3} /></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function ExpScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ CAREER LOG — {EXPERIENCE.length} POSITIONS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <div className="exp-item lit" key={i}>
              <div>
                <div className="exp-period"><Seg7 value={e.period} width={e.period.length} /></div>
                <div className="exp-periodL">{e.periodLong}</div>
              </div>
              <div>
                <div className="exp-title"><Seg14>{e.title}</Seg14></div>
                <div className="exp-org">{e.org}</div>
                <ul className="exp-mission">
                  {e.missions.map((m, j) => <li key={j}>{m}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function EduScreen({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', minHeight: 0 }}>
      <div className="label-small lit">▸ EDUCATION & CERTIFICATIONS — ▲ ▼ TO SCROLL</div>
      <div ref={scrollRef} className="scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="certs" style={{ height: 'auto' }}>
          <div className="cert-col">
            <h3 className="lit">FORMATION</h3>
            {EDUCATION.map((e, i) => (
              <div className="cert-item lit" key={i}>
                <div>
                  <div className="cert-title"><Seg14>{e.title}</Seg14></div>
                  <div className="cert-org">{e.org} · {e.periodLong}</div>
                </div>
                <div className="cert-period"><Seg7 value={e.period} width={e.period.length} /></div>
              </div>
            ))}
          </div>
          <div className="cert-col">
            <h3 className="lit">CERTIFICATIONS</h3>
            {CERTS.map((c, i) => (
              <div className="cert-item lit" key={i}>
                <div>
                  <div className="cert-title"><Seg14>{c.title}</Seg14></div>
                  <div className="cert-org">{c.org}</div>
                </div>
                <div className="cert-period"><Seg7 value={c.period} width={4} /></div>
              </div>
            ))}
            <div className="cert-item lit">
              <div>
                <div className="cert-title"><Seg14>REFERENCE</Seg14></div>
                <div className="cert-org">SIKA MORONIKE — DIR. DELEGUEE ZONE01</div>
              </div>
              <div className="cert-period"><Seg7 value="REF" width={3} /></div>
            </div>
          </div>
        </div>
      </div>
      <ScrollHint targetRef={scrollRef} />
    </div>
  );
}

export function ContactScreen() {
  const rows = [
    { k: 'email', l: 'EMAIL', v: IDENTITY.email },
    { k: 'phone', l: 'PHONE', v: IDENTITY.phone },
    { k: 'github', l: 'GITHUB', v: IDENTITY.github },
    { k: 'location', l: 'LOCATION', v: IDENTITY.location },
  ];
  return (
    <div className="contact">
      <div className="contact-left">
        <div className="label-small lit">▸ INCOMING CHANNEL — STATUS: OPEN</div>
        <h2 className="lit" style={{ fontFamily: 'var(--font-seg14)', fontSize: 'clamp(28px,3.8vw,56px)', fontWeight: 700, lineHeight: 1, letterSpacing: '0.01em', marginTop: 14 }}>
          <Seg14>LETS</Seg14><br />
          <Seg14>BUILD</Seg14><br />
          <Seg14>SOMETHING</Seg14>
        </h2>
        <div className="pitch lit" style={{ marginTop: 14 }}>
          Discutons de votre produit : objectif, contraintes, impact attendu.
          Freelance ou mission longue — je reponds vite.
        </div>
      </div>
      <div className="contact-right">
        {rows.map(r => (
          <div className="contact-row lit" key={r.k}>
            <div className="l">{r.l}</div>
            <div className="v">{r.v}</div>
            <div className="c">◉</div>
          </div>
        ))}
        <div className="label-small lit" style={{ marginTop: 12, opacity: 0.55 }}>
          ▸ PRESS ENTER TO OPEN MAIL CLIENT
        </div>
      </div>
    </div>
  );
}
