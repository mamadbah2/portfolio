import { IDENTITY } from '@/lib/data';

export default function Contact() {
  return (
    <section className="pro-contact" aria-labelledby="contact-title">
      <div className="pro-section-rail">
        <span className="pro-section-num">06</span>
        <h2 id="contact-title" className="pro-section-title">Contact</h2>
      </div>

      <div className="pro-contact-body">
        <p className="pro-contact-lede">
          Un projet à faire aboutir, une mission freelance, un poste confirmé —
          la meilleure façon de me joindre, c&apos;est l&apos;email.
        </p>

        <a className="pro-contact-mailto" href={`mailto:${IDENTITY.email}`}>
          <span className="pro-contact-label">Écrire à</span>
          <span className="pro-contact-email">
            {IDENTITY.email}
            <svg width="100%" height="6" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden>
              <line x1="0" y1="3" x2="100" y2="3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </a>

        <ul className="pro-contact-side">
          <li>
            <span className="pro-contact-sidelabel">Téléphone</span>
            <a href={`tel:${IDENTITY.phone.replace(/\s+/g, '')}`}>{IDENTITY.phone}</a>
          </li>
          <li>
            <span className="pro-contact-sidelabel">GitHub</span>
            <a href={`https://${IDENTITY.github}`} target="_blank" rel="noreferrer">@{IDENTITY.githubHandle}</a>
          </li>
          <li>
            <span className="pro-contact-sidelabel">Basé à</span>
            <span>{IDENTITY.location}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
