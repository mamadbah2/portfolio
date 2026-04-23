'use client';
import { EXPERIENCE } from '@/lib/data';
import { useScrollProgress } from './hooks/useScrollProgress';

export default function Experience() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  return (
    <section ref={ref} className="pro-experience" aria-labelledby="experience-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">03</span>
        <h2 id="experience-title" className="pro-section-title">Parcours</h2>
      </div>

      <div className="pro-timeline">
        <div className="pro-timeline-rail" aria-hidden>
          <span
            className="pro-timeline-fill"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>

        <ol className="pro-timeline-list">
          {EXPERIENCE.map((xp, i) => (
            <li key={i} className="pro-timeline-item" style={{ ['--delay' as string]: `${i * 100}ms` }}>
              <div className="pro-timeline-period">
                <span className="pro-timeline-year">{xp.period}</span>
                <span className="pro-timeline-longperiod">{xp.periodLong}</span>
              </div>
              <div className="pro-timeline-body">
                <h3 className="pro-timeline-title">{xp.title}</h3>
                <p className="pro-timeline-org">{xp.org}</p>
                <ul className="pro-timeline-missions">
                  {xp.missions.map((m, j) => (
                    <li key={j}>{m}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
