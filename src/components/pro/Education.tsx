'use client';
import { EDUCATION, CERTS } from '@/lib/data';
import { useInView } from './hooks/useInView';

export default function Education() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`pro-education ${inView ? 'is-in' : ''}`} aria-labelledby="education-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">05</span>
        <h2 id="education-title" className="pro-section-title">Formation &amp; certifications</h2>
      </div>

      <div className="pro-education-grid">
        <div className="pro-edu-col">
          <h3 className="pro-edu-subhead">Diplômes</h3>
          <ul className="pro-edu-list">
            {EDUCATION.map((e, i) => (
              <li key={i} className="pro-edu-item">
                <div className="pro-edu-title">{e.title}</div>
                <div className="pro-edu-meta">
                  <span>{e.org}</span>
                  <span>{e.periodLong}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="pro-edu-col">
          <h3 className="pro-edu-subhead">Certifications</h3>
          <ul className="pro-edu-list">
            {CERTS.map((c, i) => (
              <li key={i} className="pro-edu-item">
                <div className="pro-edu-title">{c.title}</div>
                <div className="pro-edu-meta">
                  <span>{c.org}</span>
                  <span>{c.period}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
