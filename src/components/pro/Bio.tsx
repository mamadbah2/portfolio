'use client';
import { DEFINITIONS, IDENTITY } from '@/lib/data';
import { useInView } from './hooks/useInView';

export default function Bio() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`pro-bio ${inView ? 'is-in' : ''}`} aria-labelledby="bio-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">01</span>
        <h2 id="bio-title" className="pro-section-title">À propos</h2>
      </div>

      <div className="pro-bio-grid">
        <div className="pro-bio-text">
          <p className="pro-bio-lede">
            Je livre des produits qui tiennent en prod — <em>{IDENTITY.positioning.toLowerCase()}</em>,
            plus tout ce qu&apos;il faut autour pour que ça fonctionne vraiment.
          </p>
          <p>
            Basé à {IDENTITY.location.toLowerCase().replace('. ', ', ')}. Formation hybride entre
            ISM Dakar, Zone01 (pédagogie 42) et un master MSSI en cours. {IDENTITY.projectsShipped}+
            projets livrés, un penchant pour les architectures propres, la rigueur du peer-review,
            et une obsession modérée pour l&apos;automatisation de tout ce qui s&apos;automatise.
          </p>
          <p className="pro-bio-tagline">
            Disponible pour missions freelance ou opportunités senior.
          </p>
        </div>

        <ul className="pro-definitions">
          {DEFINITIONS.map((d) => (
            <li key={d.n} className="pro-definition">
              <span className="pro-definition-n">{d.n}</span>
              <div>
                <strong>{d.b}</strong>
                <span>{d.t}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
