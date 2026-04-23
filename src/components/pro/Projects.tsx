'use client';
import { PROJECTS } from '@/lib/data';
import ProjectCanvas from './webgl/ProjectCanvas';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.screenshots && p.screenshots.length > 0);
  const alsoBuilt = PROJECTS.filter((p) => !p.screenshots || p.screenshots.length === 0);

  return (
    <section className="pro-projects" aria-labelledby="projects-title">
      <div className="pro-projects-pin">
        <div className="pro-projects-track">
          <header className="pro-projects-intro">
            <div className="pro-section-rail">
              <span className="pro-section-num">02</span>
              <h2 id="projects-title" className="pro-section-title">Projets</h2>
            </div>
            <p className="pro-projects-lede">
              Cinq livraisons clés — du streaming full-stack au e-commerce multi-rôle.
              Chaque carte est un système complet, pas une maquette.
            </p>
          </header>

          {featured.map((p) => (
            <article key={p.id} className="pro-projects-card-wrapper">
              <div className="pro-project-card">
                <div className="pro-project-media" data-xp-hover>
                  <ProjectCanvas
                    src={`${BASE}${p.screenshots![0]}`}
                    alt={`${p.title} — aperçu`}
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
              </div>
            </article>
          ))}

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
        </div>
      </div>
    </section>
  );
}
