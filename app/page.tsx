const services = [
  ["01", "Website Building", "Custom sites designed around how your business actually sells, books, communicates, and grows."],
  ["02", "Website Management", "Ongoing updates, fixes, content changes, maintenance, and support after launch."],
  ["03", "Design Services", "Brand direction, graphics, visual systems, and assets that keep everything feeling connected."],
  ["04", "Business Support", "Creative digital support for the pieces around your site when something needs to be built or sharpened."],
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
  ["01", "DISCUSS", "We get clear on the business, the audience, and what the final result needs to do."],
  ["02", "DIRECTION", "We shape the visual and functional direction before building anything heavy."],
  ["03", "BUILD", "We turn the plan into a polished responsive product and handle the details properly."],
  ["04", "RUN", "We launch, keep support close, and stay ready as the business keeps moving."],
];

export default function Home() {
  return (
    <main className="fm-site" id="top">
      <header className="fm-header">
        <a className="fm-brand" href="#top" aria-label="OTR Services home">
          <img src="/OTR.png" alt="OTR" />
        </a>
        <nav className="fm-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a className="fm-header-cta" href="#contact">Work with us <span>↗</span></a>
        <details className="fm-mobile-menu">
          <summary>Menu</summary>
          <nav>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <section className="fm-hero">
        <div className="fm-shell fm-hero-inner">
          <div className="fm-hero-copy">
            <p className="fm-kicker">ON THE RUN / CREATIVE + DIGITAL</p>
            <h1>Simple Ideas.<br />Strong Builds.<br /><span>Real Results.</span></h1>
            <p className="fm-hero-lead">Custom websites, management, branding, and creative support built to represent your business right.</p>
          </div>

          <div className="fm-hero-meta">
            <span>CALIFORNIA</span>
            <span>WORKING EVERYWHERE</span>
            <span>AVAILABLE FOR NEW PROJECTS</span>
          </div>

          <div className="fm-collage" aria-label="OTR creative direction">
            <div className="fm-collage-card fm-collage-type">
              <span>OTR</span>
              <small>Ideas become systems.</small>
            </div>
            <div className="fm-collage-card fm-collage-script">
              <img src="/ScriptW.png" alt="On The Run" />
              <small>More than websites.</small>
            </div>
            <div className="fm-collage-card fm-collage-grid">
              <div className="fm-grid-orb" />
              <span>ON THE RUN</span>
              <small>CREATIVE / DIGITAL / BUSINESS</small>
            </div>
            <a className="fm-collage-card fm-collage-cta" href="#contact">
              <span>LET&apos;S<br />COLLABORATE.</span>
              <b>↗</b>
            </a>
          </div>

          <div className="fm-capability-row">
            {services.map(([number, title]) => (
              <a href="#services" key={number}><span>{number}</span><strong>{title}</strong><i>↗</i></a>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-manifesto" id="about">
        <div className="fm-shell fm-manifesto-grid">
          <div className="fm-manifesto-title">
            <p className="fm-kicker dark">WHY OTR</p>
            <h2>Built for businesses that value clarity over noise.</h2>
          </div>
          <div className="fm-manifesto-copy">
            <p>OTR combines design, development, management, and creative support so the digital side of your business feels intentional from end to end.</p>
            <p>Different industries. Different personalities. One standard: the work should feel like the business it represents.</p>
          </div>
        </div>

        <div className="fm-shell fm-proof-row">
          <div><strong>04</strong><span>LIVE CLIENT BUILDS</span></div>
          <div><strong>100%</strong><span>CUSTOM DIRECTION</span></div>
          <div><strong>01</strong><span>POINT OF CONTACT</span></div>
          <blockquote>“Understand the business first. Then build what actually helps it move.”</blockquote>
        </div>
      </section>

      <section className="fm-services" id="services">
        <div className="fm-shell">
          <div className="fm-section-head">
            <div>
              <p className="fm-kicker">SERVICES / 01</p>
              <h2>What we build<br />around your business.</h2>
            </div>
            <p>Not a menu of random add-ons. A focused set of capabilities that work better together.</p>
          </div>

          <div className="fm-service-list">
            {services.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#contact">Ask about this <b>↗</b></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-work" id="work">
        <div className="fm-shell">
          <div className="fm-section-head fm-section-head-work">
            <div>
              <p className="fm-kicker">SELECTED WORK / 02</p>
              <h2>Real businesses.<br />Live builds.</h2>
            </div>
            <p>Scroll the actual sites. No static mockups hiding the details.</p>
          </div>

          <div className="fm-project-grid">
            {projects.map((project, index) => (
              <article className={`fm-project-card project-card project-card-${index + 1}`} key={project.number}>
                <div className="fm-project-top"><span>PROJECT / {project.number}</span><span>LIVE PREVIEW</span></div>
                <div className="fm-project-visual project-visual" />
                <div className="fm-project-info">
                  <div>
                    <h3>{project.name}</h3>
                    <p className="fm-project-category">{project.category}</p>
                  </div>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-brand-break">
        <div className="fm-shell fm-brand-break-inner">
          <small>IDEAS / BRANDS / WEBSITES / RESULTS</small>
          <img src="/ScriptW.png" alt="On The Run" />
          <small>SAME MENTALITY. DIFFERENT INDUSTRIES.</small>
        </div>
      </section>

      <section className="fm-process">
        <div className="fm-shell">
          <div className="fm-process-head">
            <p className="fm-kicker dark">PROCESS / 03</p>
            <h2>Clear from the first conversation to launch.</h2>
          </div>
          <div className="fm-process-grid">
            {process.map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-contact" id="contact">
        <div className="fm-shell fm-contact-inner">
          <div>
            <p className="fm-kicker">START A PROJECT / 04</p>
            <h2>Got something<br />worth building?</h2>
          </div>
          <div className="fm-contact-copy">
            <p>Website, management, branding, or something that does not fit neatly into a box. Bring the idea.</p>
            <a href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry">otrservicesie@gmail.com <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="fm-footer">
        <div className="fm-shell fm-footer-inner">
          <div className="fm-footer-brand"><img src="/OTR.png" alt="OTR" /><span>ON THE RUN / CREATIVE + DIGITAL</span></div>
          <nav><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
          <small>© 2026 OTR SERVICES</small>
        </div>
      </footer>
    </main>
  );
}
