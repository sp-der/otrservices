const services = [
  {
    number: "01",
    icon: "</>",
    title: "Website Building",
    copy: "Custom websites built around how your business sells, books, communicates, and grows.",
  },
  {
    number: "02",
    icon: "▥",
    title: "Website Management",
    copy: "Ongoing updates, fixes, content changes, maintenance, and support after launch.",
  },
  {
    number: "03",
    icon: "✦",
    title: "Design Services",
    copy: "Brand direction, graphics, visual systems, and assets that keep the business looking connected.",
  },
  {
    number: "04",
    icon: "↗",
    title: "Business Support",
    copy: "Creative digital support for the pieces around your website when the business needs something built or sharpened.",
  },
];

const projects = [
  {
    number: "001",
    name: "Pressed In Pink",
    category: "E-commerce / Systems / Design",
    description: "A product-heavy storefront and custom workflow built to support a growing creative business.",
  },
  {
    number: "002",
    name: "Pacific Stay Properties",
    category: "Hospitality / Web / Booking",
    description: "A premium short-term rental experience designed around trust, clarity, and direct booking.",
  },
  {
    number: "003",
    name: "JMB 2 Creations",
    category: "Creative Commerce / Client Tools",
    description: "A custom commerce experience built around products, orders, invoices, and client communication.",
  },
  {
    number: "004",
    name: "Muerto De Hambre",
    category: "Food / Brand Experience / Catering",
    description: "A bold food brand translated into a high-energy site with motion, personality, locations, and catering.",
  },
];

const process = [
  ["01", "DISCUSS", "We get clear on the business, the audience, the problem, and what the final result needs to do."],
  ["02", "PLAN", "We shape a custom direction so design and function are moving toward the same goal."],
  ["03", "BUILD", "We turn the plan into a polished, responsive experience and handle the details properly."],
  ["04", "LAUNCH", "We go live, keep support close, and stay ready as the business changes."],
];

export default function Home() {
  return (
    <main className="nr-site" id="top">
      <div className="nr-noise" aria-hidden="true" />

      <header className="nr-header">
        <div className="nr-shell nr-header-inner">
          <a className="nr-brand" href="#top" aria-label="OTR Services home">
            <img src="/OTR.png" alt="OTR" />
          </a>

          <nav className="nr-nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nr-header-cta" href="#contact">START A PROJECT <span>↗</span></a>

          <details className="nr-mobile-menu">
            <summary>MENU</summary>
            <nav>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="nr-hero">
        <div className="nr-hero-grid" aria-hidden="true" />
        <div className="nr-hero-orb nr-hero-orb-a" aria-hidden="true" />
        <div className="nr-hero-orb nr-hero-orb-b" aria-hidden="true" />

        <div className="nr-shell nr-hero-inner">
          <div className="nr-hero-meta">
            <span>ON THE RUN / CREATIVE + DIGITAL</span>
            <span className="nr-status"><i /> ACCEPTING NEW PROJECTS</span>
          </div>

          <div className="nr-hero-layout">
            <div className="nr-hero-copy">
              <p className="nr-eyebrow">WEBSITES / MANAGEMENT / DESIGN</p>
              <h1>
                REAL BUSINESSES.<br />
                LASTING <span>RESULTS.</span>
              </h1>
              <p className="nr-hero-lead">
                Custom websites, management, branding, and creative support built to make your business look as serious as the work behind it.
              </p>
              <div className="nr-hero-actions">
                <a className="nr-button nr-button-primary" href="#contact">LET&apos;S BUILD IT <span>↗</span></a>
                <a className="nr-button nr-button-secondary" href="#work">VIEW OUR WORK <span>↓</span></a>
              </div>
            </div>

            <div className="nr-brand-stage" aria-label="On The Run brand system">
              <div className="nr-stage-grid" />
              <div className="nr-stage-scan" />
              <div className="nr-stage-corner nr-stage-corner-a" />
              <div className="nr-stage-corner nr-stage-corner-b" />
              <div className="nr-stage-top">OTR / STUDIO SYSTEM / 2026</div>
              <img className="nr-stage-script" src="/ScriptW.png" alt="On The Run" />
              <p>MORE THAN WEBSITES</p>
              <small>IDEAS / BRANDS / WEBSITES / RESULTS</small>
            </div>
          </div>

          <div className="nr-stats">
            <div><strong>04</strong><span>FEATURED BUILDS</span></div>
            <div><strong>100%</strong><span>CUSTOM DIRECTION</span></div>
            <div><strong>01</strong><span>POINT OF CONTACT</span></div>
            <div className="nr-stat-brand"><strong>OTR</strong><span>ON THE RUN</span></div>
          </div>
        </div>
      </section>

      <section className="nr-marquee" aria-label="OTR services">
        <div className="nr-marquee-track">
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN SERVICES ✦ BUSINESS SUPPORT ✦ ON THE RUN ✦ </span>
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN SERVICES ✦ BUSINESS SUPPORT ✦ ON THE RUN ✦ </span>
        </div>
      </section>

      <section className="nr-section nr-shell" id="services">
        <div className="nr-section-head nr-section-head-centered">
          <p className="nr-eyebrow">OUR SERVICES / 01</p>
          <h2>MORE THAN WEBSITES.</h2>
          <p>Build the digital foundation, keep it sharp, and give the business room to grow without collecting disconnected vendors.</p>
        </div>

        <div className="nr-service-grid">
          {services.map((service) => (
            <article className="nr-service-card" key={service.number}>
              <div className="nr-service-top"><span>{service.number}</span><span>↗</span></div>
              <div className="nr-service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#contact">ASK ABOUT THIS <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="nr-work nr-shell" id="work">
        <div className="nr-section-head nr-work-head">
          <div>
            <p className="nr-eyebrow">FEATURED WORK / 02</p>
            <h2>BUILT IN THE REAL WORLD.</h2>
          </div>
          <p>Scroll the actual live sites. Different industries, different personalities, one standard: the build should feel like the business it represents.</p>
        </div>

        <div className="nr-project-grid">
          {projects.map((project, index) => (
            <article className={`nr-project-card project-card project-card-${index + 1}`} key={project.number}>
              <div className="nr-project-bar">
                <span>PROJECT / {project.number}</span>
                <span>LIVE PREVIEW</span>
              </div>
              <div className="nr-project-visual project-visual" />
              <div className="nr-project-info">
                <div>
                  <span>{project.number}</span>
                  <h3>{project.name}</h3>
                  <p className="nr-project-category">{project.category}</p>
                </div>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nr-brand-band" aria-label="On The Run">
        <div className="nr-shell nr-brand-band-inner">
          <small>IDEAS<br />BRANDS<br />WEBSITES<br />RESULTS</small>
          <img src="/ScriptW.png" alt="On The Run" />
          <small>SAME MENTALITY.<br />DIFFERENT INDUSTRIES.</small>
        </div>
      </section>

      <section className="nr-section nr-shell" id="process">
        <div className="nr-section-head nr-section-head-centered">
          <p className="nr-eyebrow">THE PROCESS / 03</p>
          <h2>SIMPLE. CLEAR. EFFECTIVE.</h2>
          <p>No mystery process. No disappearing act. Just a clean path from idea to launch.</p>
        </div>

        <div className="nr-process-grid">
          {process.map(([number, title, copy]) => (
            <article className="nr-process-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="nr-contact" id="contact">
        <div className="nr-contact-grid" aria-hidden="true" />
        <div className="nr-shell nr-contact-inner">
          <div>
            <p className="nr-eyebrow">START A PROJECT / 04</p>
            <h2>LET&apos;S BUILD<br />SOMETHING <span>REAL.</span></h2>
          </div>
          <div className="nr-contact-copy">
            <p>Website, management, branding, or something that does not fit neatly into a box. Bring the idea. We&apos;ll figure out the right build.</p>
            <a href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry">otrservicesie@gmail.com <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="nr-footer">
        <div className="nr-shell nr-footer-inner">
          <div className="nr-footer-brand">
            <img src="/OTR.png" alt="OTR" />
            <span>ON THE RUN / CREATIVE + DIGITAL</span>
          </div>
          <nav>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <small>© 2026 OTR SERVICES</small>
        </div>
      </footer>
    </main>
  );
}
