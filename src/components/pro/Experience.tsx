import { EXPERIENCE } from '@/lib/data';

export default function Experience() {
  return (
    <section className="pro-experience" aria-labelledby="experience-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">03</span>
        <h2 id="experience-title" className="pro-section-title">Parcours</h2>
      </div>

      <div className="pro-timeline">
        <div className="pro-timeline-rail" aria-hidden>
          <span className="pro-timeline-fill" />
        </div>

        <ol className="pro-timeline-list">
          {EXPERIENCE.map((xp, i) => (
            <li key={i} className="pro-timeline-item">
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
