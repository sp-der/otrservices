const capabilities = [
  {
    number: "01",
    kicker: "BUILD",
    title: "Website Building",
    copy: "Custom websites shaped around the actual business, not a recycled template with a logo dropped on top.",
    tags: ["Custom UI", "Responsive Build", "Business Systems"],
  },
  {
    number: "02",
    kicker: "MANAGE",
    title: "Website Management",
    copy: "Ongoing updates, fixes, content changes, maintenance, and support so your website keeps moving with your business.",
    tags: ["Updates", "Maintenance", "Support"],
  },
  {
    number: "03",
    kicker: "DESIGN",
    title: "Design + Branding",
    copy: "Brand direction and visual assets made to feel connected, recognizable, and built for where your business is headed next.",
    tags: ["Brand Identity", "Graphics", "Creative Direction"],
  },
];

const projects = [
  {
    number: "001",
    name: "Pressed In Pink",
    category: "E-commerce / Systems / Design",
    description:
      "A custom storefront and business workflow built for a growing creative product catalog.",
    monogram: "PIP",
  },
  {
    number: "002",
    name: "Pacific Stay Properties",
    category: "Hospitality / Web Design / Booking",
    description:
      "A polished coastal property experience designed to support direct bookings and a premium guest journey.",
    monogram: "PSP",
  },
  {
    number: "003",
    name: "JMB 2 Creations",
    category: "Creative Business / Commerce / Client Tools",
    description:
      "A client-focused digital experience built around custom orders, presentation, and everyday business operations.",
    monogram: "JMB",
  },
  {
    number: "004",
    name: "Muerto De Hambre",
    category: "Food / Brand Experience / Catering",
    description:
      "A bold food brand translated into a digital experience with motion, personality, and a cleaner catering flow.",
    monogram: "MDH",
  },
];

const process = [
  ["01", "LISTEN", "We start with the business, the audience, and what actually needs to work."],
  ["02", "DESIGN", "We build a visual direction that belongs to your brand instead of chasing whatever is trendy this week."],
  ["03", "BUILD", "The concept becomes a fast, responsive experience with the details handled properly."],
  ["04", "STAY READY", "When the business changes, the digital side can change with it. OTR is built for the long run."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="brand-lockup" href="#top" aria-label="OTR Services home">
          <img src="/otr-mark.svg" alt="OTR" />
          <span>
            OTR SERVICES
            <small>CREATIVE + DIGITAL</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="#contact">
          Start a project <span>↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">MENU</summary>
          <nav>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-meta eyebrow-row">
          <span>CALIFORNIA / DIGITAL STUDIO</span>
          <span className="status-dot">AVAILABLE FOR NEW PROJECTS</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">OTR SERVICES / 2026</p>
            <h1>
              BUILT DIFFERENT.
              <br />
              BUILT FOR <span>BUSINESS.</span>
            </h1>
            <p className="hero-lead">
              Websites, branding, design, and digital support built to help businesses look better, work better, and grow without looking like everybody else.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#contact">
                LET&apos;S BUILD IT <span>↗</span>
              </a>
              <a className="text-link" href="#work">
                VIEW SELECTED WORK <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="logo-plate">
              <span className="plate-label plate-label-top">ORIGINAL / TECHNICAL / RELENTLESS</span>
              <img src="/otr-mark.svg" alt="" />
              <span className="plate-label plate-label-bottom">WEB • DESIGN • MANAGEMENT</span>
            </div>
            <div className="serial-tag">OTR / 001</div>
          </div>
        </div>

        <div className="hero-footer-line">
          <span>NO COPY + PASTE FORMULAS.</span>
          <span>YOUR BUSINESS DESERVES ITS OWN LANE.</span>
        </div>
      </section>

      <section className="ticker" aria-label="OTR capabilities">
        <div className="ticker-track">
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN + BRANDING ✦ DIGITAL SUPPORT ✦ BUILT FOR BUSINESS ✦ </span>
          <span>WEBSITE BUILDING ✦ WEBSITE MANAGEMENT ✦ DESIGN + BRANDING ✦ DIGITAL SUPPORT ✦ BUILT FOR BUSINESS ✦ </span>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="section-heading-grid">
          <div>
            <p className="section-kicker">CAPABILITIES / 01</p>
            <h2>WHAT WE DO<br />RIGHT NOW.</h2>
          </div>
          <div className="section-intro">
            <p>
              OTR is built to be more than the person you call once for a website. We create the digital foundation, keep it moving, and help the brand around it stay sharp.
            </p>
            <span>More capabilities are always in motion.</span>
          </div>
        </div>

        <div className="capability-list">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.number}>
              <div className="capability-index">
                <span>{item.number}</span>
                <small>{item.kicker}</small>
              </div>
              <div className="capability-content">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="capability-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section">
        <div className="shell statement-grid">
          <div className="statement-mark">
            <img src="/otr-mark.svg" alt="OTR Services" />
          </div>
          <div className="statement-copy">
            <p className="section-kicker">THE BIGGER PICTURE / 02</p>
            <h2>YOUR BUSINESS DOESN&apos;T STOP AT A WEBSITE. <span>NEITHER DO WE.</span></h2>
            <p>
              OTR is growing into a long-term creative and digital resource for businesses. The goal is simple: fewer random vendors, fewer disconnected pieces, and more of your business moving in the same direction.
            </p>
            <a className="text-link light-link" href="#about">HOW OTR WORKS <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="work-heading">
          <div>
            <p className="section-kicker">SELECTED WORK / 03</p>
            <h2>BUILT IN<br />THE REAL WORLD.</h2>
          </div>
          <p>
            Different industries. Different personalities. The point is not making every client look like OTR. The point is making every build feel like them.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} key={project.number}>
              <div className="project-visual">
                <div className="project-grid-lines" />
                <span className="project-monogram">{project.monogram}</span>
                <span className="project-stamp">PROJECT / {project.number}</span>
              </div>
              <div className="project-info">
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

      <section className="section process-section shell" id="about">
        <div className="process-heading">
          <p className="section-kicker">THE OTR APPROACH / 04</p>
          <h2>DESIGN IT.<br />BUILD IT.<br /><span>KEEP IT RUNNING.</span></h2>
        </div>

        <div className="process-list">
          {process.map(([number, title, copy]) => (
            <article className="process-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-strip">
        <div className="shell about-grid">
          <div className="about-badge">
            <span>OTR</span>
            <small>CREATIVE<br />DIGITAL<br />BUSINESS</small>
          </div>
          <div>
            <p className="section-kicker">ABOUT OTR / 05</p>
            <h2>BUSINESSES DESERVE BETTER THAN GENERIC.</h2>
            <p>
              OTR Services exists to build digital experiences around the identity of the business itself. No one-size-fits-all formula. No disappearing after launch. Just thoughtful work, strong execution, and room to keep evolving.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section shell" id="contact">
        <div className="contact-topline">
          <span>START A PROJECT / 06</span>
          <span>OTR SERVICES © 2026</span>
        </div>

        <div className="contact-main">
          <h2>GOT SOMETHING<br />IN MIND?</h2>
          <a href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry">
            LET&apos;S BUILD IT. <span>↗</span>
          </a>
        </div>

        <div className="contact-bottom">
          <div>
            <small>PROJECT INQUIRIES</small>
            <a href="mailto:otrservicesie@gmail.com">otrservicesie@gmail.com</a>
          </div>
          <div>
            <small>BASED IN</small>
            <span>CALIFORNIA / WORKING EVERYWHERE</span>
          </div>
          <div className="footer-mark">
            <img src="/otr-mark.svg" alt="OTR" />
          </div>
        </div>
      </section>
    </main>
  );
}
