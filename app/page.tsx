const capabilities = [
  {
    number: "01",
    title: "Website Building",
    icon: "</>",
    copy: "Custom, responsive websites built around how your business actually moves, sells, books, and communicates.",
    tags: ["Custom UI", "Responsive", "Business Systems"],
  },
  {
    number: "02",
    title: "Website Management",
    icon: "▥",
    copy: "Updates, fixes, content changes, maintenance, and ongoing support without disappearing after launch.",
    tags: ["Maintenance", "Updates", "Support"],
  },
  {
    number: "03",
    title: "Design Services",
    icon: "✦",
    copy: "Visual direction, graphics, brand systems, and digital assets made to feel connected instead of pieced together.",
    tags: ["Identity", "Graphics", "Direction"],
  },
  {
    number: "04",
    title: "Business Support",
    icon: "↗",
    copy: "Creative digital support for the pieces around your website when the business needs something built, fixed, or sharpened.",
    tags: ["Creative", "Digital", "Growth"],
  },
];

const projects = [
  {
    number: "001",
    name: "Pressed In Pink",
    category: "E-commerce / Systems / Design",
    description: "A full digital storefront and operating system built for a growing creative product business.",
  },
  {
    number: "002",
    name: "Muerto De Hambre",
    category: "Food / Brand Experience / Catering",
    description: "A high-energy food brand translated into a bold site with motion, personality, and catering flow.",
  },
  {
    number: "003",
    name: "Pacific Stay Properties",
    category: "Hospitality / Web / Booking",
    description: "A polished direct-booking experience shaped around a premium short-term rental brand.",
  },
  {
    number: "004",
    name: "JMB 2 Creations",
    category: "Creative Commerce / Client Tools",
    description: "A custom commerce experience built to make products, orders, and client communication feel easier.",
  },
];

const process = [
  ["01", "DISCUSS", "Tell us the vision, the goals, and what the business actually needs."],
  ["02", "PLAN", "We shape a custom direction and system around the way your business works."],
  ["03", "BUILD", "We turn the direction into a polished, responsive experience and handle the details."],
  ["04", "LAUNCH", "You go live, and OTR stays available as the business keeps moving."],
];

export default function Home() {
  return (
    <main className="otr-site" id="top">
      <div className="otr-noise" aria-hidden="true" />

      <header className="otr-header">
        <div className="otr-shell otr-header-inner">
          <a className="otr-brand" href="#top" aria-label="On The Run Services home">
            <img className="otr-main-logo" src="/OTR.png" alt="OTR" />
          </a>

          <nav className="otr-nav" aria-label="Primary navigation">
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="otr-header-cta" href="#contact">LET&apos;S WORK <span>→</span></a>

          <details className="otr-mobile-menu">
            <summary>MENU</summary>
            <nav>
              <a href="#top">Home</a>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="otr-hero">
        <div className="otr-hero-grid" aria-hidden="true" />
        <div className="otr-hero-glow" aria-hidden="true" />
        <div className="otr-shell otr-hero-inner">
          <div className="otr-hero-layout otr-hero-layout-v2">
            <div className="otr-hero-copy">
              <p className="otr-kicker">WEBSITES / BRANDING / MANAGEMENT</p>
              <h1>
                REAL<br />
                BUSINESSES.<br />
                LASTING<br />
                <span>RESULTS.</span>
              </h1>
              <p className="otr-hero-lead">
                Custom websites, management, branding, and creative support built for entrepreneurs by an entrepreneur.
              </p>
              <div className="otr-hero-actions">
                <a className="otr-button otr-button-solid" href="#contact">GET STARTED <span>→</span></a>
                <a className="otr-button otr-button-ghost" href="#work">VIEW OUR WORK</a>
              </div>
            </div>

            <div className="otr-scene" aria-label="On The Run creative studio">
              <div className="otr-scene-light" />
              <div className="otr-laptop">
                <div className="otr-laptop-screen">
                  <img className="otr-script-logo otr-script-logo-screen" src="/ScriptW.png" alt="On The Run" />
                  <strong>MORE THAN WEBSITES</strong>
                  <small>IDEAS / BRANDS / WEBSITES / RESULTS</small>
                </div>
                <div className="otr-laptop-base" />
              </div>
              <div className="otr-cup">
                <img className="otr-cup-logo" src="/OTR.png" alt="" />
                <small>IDEAS<br />BRANDS<br />WEBSITES<br />RESULTS</small>
              </div>
              <div className="otr-scene-copy">SAME MENTALITY.<br />DIFFERENT INDUSTRIES.</div>
            </div>
          </div>

          <div className="otr-hero-stats otr-hero-stats-v2">
            <div><strong>04</strong><span>FEATURED BUILDS</span></div>
            <div><strong>100%</strong><span>CUSTOM DIRECTION</span></div>
            <div><strong>OTR</strong><span>ON THE RUN</span></div>
          </div>
        </div>
      </section>

      <section className="otr-section otr-shell" id="services">
        <div className="otr-centered-heading">
          <p className="otr-kicker">OUR SERVICES</p>
          <h2>MORE THAN WEBSITES</h2>
          <p>Everything you need to take your business to the next level.</p>
        </div>

        <div className="otr-service-grid otr-service-grid-4">
          {capabilities.map((item) => (
            <article className="otr-service-card otr-service-card-v2" key={item.number}>
              <span className="otr-service-number">{item.number}</span>
              <div className="otr-service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="#contact" aria-label={`Ask about ${item.title}`}>→</a>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-section otr-shell" id="work">
        <div className="otr-work-heading otr-work-heading-v2">
          <div>
            <p className="otr-kicker">FEATURED WORK</p>
            <h2>BUILT FOR REAL PEOPLE</h2>
            <p>A few of the businesses we&apos;ve helped bring to life.</p>
          </div>
        </div>

        <div className="project-grid otr-project-grid otr-project-grid-v2">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1} otr-project-card`} key={project.number}>
              <div className="project-visual otr-project-visual"><div className="project-grid-lines" /></div>
              <div className="project-info otr-project-info">
                <div>
                  <h3>{project.name}</h3>
                  <p className="project-category">{project.category}</p>
                </div>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-wordmark-band" aria-label="On The Run">
        <div className="otr-shell otr-wordmark-band-inner">
          <small>IDEAS<br />BRANDS<br />WEBSITES<br />RESULTS</small>
          <img className="otr-script-logo otr-script-logo-band" src="/ScriptW.png" alt="On The Run" />
          <small>SAME MENTALITY.<br />DIFFERENT INDUSTRIES.</small>
        </div>
      </section>

      <section className="otr-section otr-process-v2 otr-shell" id="about">
        <div className="otr-centered-heading">
          <p className="otr-kicker">THE PROCESS</p>
          <h2>SIMPLE. CLEAR. EFFECTIVE.</h2>
          <p>We keep it straightforward from start to finish.</p>
        </div>
        <div className="otr-process-grid-v2">
          {process.map(([number, title, copy], index) => (
            <article className="otr-process-card-v2" key={number}>
              <span>{number}</span>
              <div className="otr-process-icon">{["◯", "▤", "⚙", "↗"][index]}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-contact otr-contact-v2" id="contact">
        <div className="otr-shell otr-contact-v2-inner">
          <div>
            <p className="otr-kicker">LET&apos;S BUILD SOMETHING</p>
            <h2>TOGETHER.</h2>
            <p>Whether you need a website, branding, management, or just want to talk ideas, OTR is here for it.</p>
            <div className="otr-hero-actions">
              <a className="otr-button otr-button-solid" href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry">GET STARTED <span>→</span></a>
              <a className="otr-button otr-button-ghost" href="mailto:otrservicesie@gmail.com">SEND A MESSAGE</a>
            </div>
          </div>
          <div className="otr-phone-scene" aria-hidden="true">
            <div className="otr-phone">
              <img className="otr-script-logo otr-script-logo-phone" src="/ScriptW.png" alt="" />
            </div>
            <span>BUILT DIFFERENT<br />FOR BUSINESSES</span>
          </div>
        </div>
      </section>

      <footer className="otr-footer-v2">
        <div className="otr-shell otr-footer-v2-inner">
          <img className="otr-footer-logo" src="/OTR.png" alt="OTR" />
          <nav><a href="#top">Home</a><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
          <small>© 2026 ON THE RUN. ALL RIGHTS RESERVED.</small>
        </div>
      </footer>
    </main>
  );
}
