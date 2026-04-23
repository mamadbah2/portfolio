'use client';
import { SKILL_GROUPS } from '@/lib/data';
import { useInView } from './hooks/useInView';

export default function Skills() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`pro-skills ${inView ? 'is-in' : ''}`} aria-labelledby="skills-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">04</span>
        <h2 id="skills-title" className="pro-section-title">Compétences</h2>
      </div>

      <div className="pro-skills-grid">
        {SKILL_GROUPS.map((g, gi) => (
          <div key={g.title} className="pro-skill-group" style={{ ['--delay' as string]: `${gi * 80}ms` }}>
            <h3 className="pro-skill-group-title">{g.title}</h3>
            <ul className="pro-skill-tags">
              {g.items.map((it, ii) => (
                <li
                  key={it.name}
                  className={`pro-skill-tag ${it.s >= 90 ? 'is-top' : ''}`}
                  style={{ ['--tag-delay' as string]: `${ii * 35}ms` }}
                >
                  {it.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
