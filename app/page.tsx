const capabilities = [
  {
    number: "01",
    title: "Website Building",
    copy: "Custom, responsive websites built around how your business actually moves, sells, books, and communicates.",
    tags: ["Custom UI", "Responsive", "Business Systems"],
  },
  {
    number: "02",
    title: "Website Management",
    copy: "Updates, fixes, content changes, maintenance, and ongoing support without disappearing after launch.",
    tags: ["Maintenance", "Updates", "Support"],
  },
  {
    number: "03",
    title: "Design + Branding",
    copy: "Visual direction, graphics, brand systems, and digital assets made to feel connected instead of pieced together.",
    tags: ["Identity", "Graphics", "Direction"],
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
    name: "Pacific Stay Properties",
    category: "Hospitality / Web / Booking",
    description: "A polished direct-booking experience shaped around a premium short-term rental brand.",
  },
  {
    number: "003",
    name: "JMB 2 Creations",
    category: "Creative Commerce / Client Tools",
    description: "A custom commerce experience built to make products, orders, and client communication feel easier.",
  },
  {
    number: "004",
    name: "Muerto De Hambre",
    category: "Food / Brand Experience / Catering",
    description: "A high-energy food brand translated into a bold site with motion, personality, and catering flow.",
  },
];

const process = [
  ["01", "DISCUSS", "We get clear on the business, the audience, the problems, and what success should actually look like."],
  ["02", "DESIGN", "We shape the direction around your identity so the experience feels owned, not borrowed."],
  ["03", "BUILD", "We turn the concept into a fast, responsive, working product with the details handled properly."],
  ["04", "STAY READY", "Launch is not the finish line. OTR stays available as the business changes and grows."],
];

export default function Home() {
  return (
    <main className="otr-site" id="top">
      <div className="otr-noise" aria-hidden="true" />

      <header className="otr-header">
        <div className="otr-shell otr-header-inner">
          <a className="otr-brand" href="#top" aria-label="OTR Services home">
            <img src="/otr-mark.svg" alt="OTR" />
            <span>OTR SERVICES<small>CREATIVE / DIGITAL / BUSINESS</small></span>
          </a>

          <nav className="otr-nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="otr-header-cta" href="#contact">START A PROJECT <span>↗</span></a>

          <details className="otr-mobile-menu">
            <summary>MENU</summary>
            <nav>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="mailto:otrservicesie@gmail.com">Start a project ↗</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="otr-hero">
        <div className="otr-hero-grid" aria-hidden="true" />
        <div className="otr-hero-glow" aria-hidden="true" />
        <div className="otr-shell otr-hero-inner">
          <div className="otr-hero-topline">
            <span>CALIFORNIA / WORKING EVERYWHERE</span>
            <span className="otr-live"><i /> AVAILABLE FOR NEW PROJECTS</span>
          </div>

          <div className="otr-hero-layout">
            <div className="otr-hero-copy">
              <p className="otr-kicker">WEBSITES / MANAGEMENT / BRANDING</p>
              <h1>
                BUILT TO<br />
                REPRESENT<br />
                <span>YOUR BUSINESS RIGHT.</span>
              </h1>
              <p className="otr-hero-lead">
                Custom digital work for businesses that want to look established, move cleaner, and stop blending in with everybody else.
              </p>
              <div className="otr-hero-actions">
                <a className="otr-button otr-button-solid" href="#contact">LET&apos;S BUILD IT <span>↗</span></a>
                <a className="otr-button otr-button-ghost" href="#work">VIEW THE WORK <span>↓</span></a>
              </div>
            </div>

            <div className="otr-hero-panel" aria-hidden="true">
              <div className="otr-panel-corner otr-panel-corner-a" />
              <div className="otr-panel-corner otr-panel-corner-b" />
              <div className="otr-scan-line" />
              <div className="otr-panel-code">OTR / 001 / SYSTEM ONLINE</div>
              <div className="otr-panel-word">ORIGINAL</div>
              <div className="otr-panel-word otr-panel-word-2">TECHNICAL</div>
              <div className="otr-panel-word otr-panel-word-3">RELENTLESS</div>
              <div className="otr-panel-mark">OTR</div>
              <div className="otr-panel-bottom">
                <span>IDEAS → SYSTEMS</span>
                <span>BRANDS → EXPERIENCES</span>
              </div>
            </div>
          </div>

          <div className="otr-hero-stats">
            <div><strong>04</strong><span>FEATURED BUILDS</span></div>
            <div><strong>01</strong><span>POINT OF CONTACT</span></div>
            <div><strong>100%</strong><span>CUSTOM DIRECTION</span></div>
            <div className="otr-stat-wide"><strong>OTR</strong><span>ORIGINAL / TECHNICAL / RELENTLESS</span></div>
          </div>
        </div>
      </section>

      <section className="otr-marquee" aria-label="OTR capabilities">
        <div className="otr-marquee-track">
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN + BRANDING ✦ DIGITAL SUPPORT ✦ BUILT TO REPRESENT YOUR BUSINESS RIGHT ✦ </span>
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN + BRANDING ✦ DIGITAL SUPPORT ✦ BUILT TO REPRESENT YOUR BUSINESS RIGHT ✦ </span>
        </div>
      </section>

      <section className="otr-section otr-shell" id="services">
        <div className="otr-section-heading">
          <div>
            <p className="otr-kicker">CAPABILITIES / 01</p>
            <h2>MORE THAN<br />A WEBSITE.</h2>
          </div>
          <div className="otr-heading-copy">
            <p>Build the digital foundation. Keep it sharp. Give the business room to grow without collecting five disconnected vendors along the way.</p>
            <span>More capabilities are being built behind the scenes.</span>
          </div>
        </div>

        <div className="otr-service-grid">
          {capabilities.map((item) => (
            <article className="otr-service-card" key={item.number}>
              <div className="otr-service-top"><span>{item.number}</span><span>↗</span></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="otr-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-band">
        <div className="otr-shell otr-band-inner">
          <p className="otr-kicker">THE BIGGER PICTURE / 02</p>
          <h2>YOUR BUSINESS DOESN&apos;T STOP<br />AT A WEBSITE. <span>NEITHER DO WE.</span></h2>
          <div className="otr-band-bottom">
            <p>OTR is being built into a long-term creative and digital resource for businesses. Fewer random pieces. Better execution. One direction.</p>
            <a href="#about">SEE THE APPROACH <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="otr-section otr-shell" id="work">
        <div className="otr-work-heading">
          <div>
            <p className="otr-kicker">SELECTED WORK / 03</p>
            <h2>THE WORK<br />SPEAKS LIVE.</h2>
          </div>
          <p>These are not screenshots. Scroll the actual sites below and see how each build carries its own identity.</p>
        </div>

        <div className="project-grid otr-project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1} otr-project-card`} key={project.number}>
              <div className="otr-project-meta-top">
                <span>PROJECT / {project.number}</span>
                <span>LIVE PREVIEW</span>
              </div>
              <div className="project-visual otr-project-visual">
                <div className="project-grid-lines" />
              </div>
              <div className="project-info otr-project-info">
                <div>
                  <span className="project-number">{project.number}</span>
                  <h3>{project.name}</h3>
                  <p className="project-category">{project.category}</p>
                </div>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-signature-strip" aria-label="OTR motto">
        <span>ORIGINAL</span><i /> <span>TECHNICAL</span><i /> <span>RELENTLESS</span>
      </section>

      <section className="otr-section otr-process otr-shell" id="about">
        <div className="otr-process-heading">
          <p className="otr-kicker">THE OTR APPROACH / 04</p>
          <h2>SIMPLE.<br />CLEAR.<br /><span>EFFECTIVE.</span></h2>
        </div>
        <div className="otr-process-list">
          {process.map(([number, title, copy]) => (
            <article className="otr-process-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="otr-about-panel">
        <div className="otr-shell otr-about-grid">
          <div>
            <p className="otr-kicker">ABOUT OTR / 05</p>
            <h2>BUSINESSES DESERVE<br />BETTER THAN GENERIC.</h2>
          </div>
          <div className="otr-about-copy">
            <p>OTR Services builds digital experiences around the identity of the business itself. No one-size-fits-all formula. No disappearing after launch. Just thoughtful work, strong execution, and room to keep evolving.</p>
            <div className="otr-about-chips"><span>WEB</span><span>MANAGEMENT</span><span>DESIGN</span><span>MORE COMING</span></div>
          </div>
        </div>
      </section>

      <section className="otr-contact otr-shell" id="contact">
        <div className="otr-contact-topline"><span>START A PROJECT / 06</span><span>OTR SERVICES © 2026</span></div>
        <div className="otr-contact-grid">
          <div>
            <p className="otr-kicker">READY WHEN YOU ARE</p>
            <h2>LET&apos;S BUILD<br />SOMETHING <span>REAL.</span></h2>
          </div>
          <div className="otr-contact-action">
            <p>Website, management, branding, or something that does not fit neatly into a box. Bring the idea.</p>
            <a href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry">otrservicesie@gmail.com <span>↗</span></a>
          </div>
        </div>
        <footer className="otr-footer">
          <div className="otr-footer-brand"><img src="/otr-mark.svg" alt="OTR" /><span>ORIGINAL / TECHNICAL / RELENTLESS</span></div>
          <div><span>CALIFORNIA</span><span>WORKING EVERYWHERE</span></div>
        </footer>
      </section>
    </main>
  );
}
