'use client';
import { PROJECTS } from '@/lib/data';
import { useInView } from './hooks/useInView';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Projects() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  const featured = PROJECTS.filter((p) => p.screenshots && p.screenshots.length > 0);
  const alsoBuilt = PROJECTS.filter((p) => !p.screenshots || p.screenshots.length === 0);

  return (
    <section ref={ref} className={`pro-projects ${inView ? 'is-in' : ''}`} aria-labelledby="projects-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">02</span>
        <h2 id="projects-title" className="pro-section-title">Projets</h2>
      </div>

      <div className="pro-projects-grid">
        {featured.map((p, i) => (
          <article
            key={p.id}
            className="pro-project-card"
            style={{ ['--delay' as string]: `${i * 120}ms` }}
          >
            <div className="pro-project-media">
              <img
                src={`${BASE}${p.screenshots![0]}`}
                alt={`${p.title} — aperçu`}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1000}
              />
            </div>
            <div className="pro-project-body">
              <span className="pro-project-code">{p.code}</span>
              <h3 className="pro-project-title">{p.title}</h3>
              <p className="pro-project-tag">{p.tag}</p>
              <p className="pro-project-desc">{p.desc}</p>
              <ul className="pro-project-stack">
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="pro-project-metric">
                <span className="v">{p.metric.v}</span>
                <span className="u">{p.metric.u}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {alsoBuilt.length > 0 && (
        <aside className="pro-also-built">
          <span className="pro-also-label">Also built</span>
          <ul>
            {alsoBuilt.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong>
                <span> — {p.desc.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
