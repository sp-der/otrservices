const services = [
  {
    number: "01",
    icon: "</>",
    title: "Website Building",
    copy: "Custom, responsive websites built around your brand, your goals, and the way your business actually works.",
  },
  {
    number: "02",
    icon: "▥",
    title: "Website Management",
    copy: "Updates, maintenance, fixes, content changes, and ongoing support so the site keeps moving with the business.",
  },
  {
    number: "03",
    icon: "✦",
    title: "Design Services",
    copy: "Brand direction, graphics, digital assets, and visual systems that make the business feel connected and intentional.",
  },
  {
    number: "04",
    icon: "↗",
    title: "Creative Support",
    copy: "Have something outside the usual boxes? Bring the idea. OTR is built to solve problems, not just sell a menu of services.",
  },
];

const projects = [
  {
    number: "001",
    name: "Pressed In Pink",
    url: "pressedinpink.com",
    category: "E-COMMERCE / CUSTOM DEVELOPMENT",
  },
  {
    number: "002",
    name: "Muerto De Hambre",
    url: "meurtodehambre.vercel.app",
    category: "WEBSITE / BRANDING / MENU",
  },
  {
    number: "003",
    name: "Pacific Stay Properties",
    url: "pacificstay.vercel.app",
    category: "BOOKING / PROPERTY MANAGEMENT",
  },
  {
    number: "004",
    name: "JMB 2 Creations",
    url: "jmb2creations.com",
    category: "E-COMMERCE / CUSTOM DEVELOPMENT",
  },
];

const process = [
  ["01", "DISCUSS", "Tell us the vision, goals, audience, and what the business actually needs."],
  ["02", "PLAN", "We map the right direction, structure, features, and visual language."],
  ["03", "BUILD", "We turn the plan into a polished, responsive experience and sweat the details."],
  ["04", "LAUNCH", "We go live, keep support close, and make room for the next move."],
];

export default function Home() {
  return (
    <main className="concept-site" id="top">
      <div className="concept-noise" aria-hidden="true" />

      <header className="concept-header">
        <div className="concept-shell concept-nav-row">
          <a href="#top" className="concept-logo" aria-label="OTR Services home">
            <img src="/otr-mark.svg" alt="OTR" />
          </a>
          <nav className="concept-nav" aria-label="Primary navigation">
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="concept-pill">LET&apos;S WORK <span>→</span></a>
          <details className="concept-menu">
            <summary>MENU</summary>
            <nav>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="concept-hero">
        <div className="concept-shell concept-hero-grid">
          <div className="concept-hero-copy">
            <p className="concept-eyebrow">WEBSITES / BRANDING / MANAGEMENT</p>
            <h1>REAL<br />BUSINESSES.<br /><span>LASTING</span><br />RESULTS.</h1>
            <p className="concept-lead">Custom websites, management, branding, and creative support built for businesses that want to look established and move with purpose.</p>
            <div className="concept-actions">
              <a href="#contact" className="concept-button concept-button-solid">GET STARTED <span>→</span></a>
              <a href="#work" className="concept-button">VIEW OUR WORK <span>↓</span></a>
            </div>
            <div className="concept-stats">
              <div><strong>04</strong><span>FEATURED BUILDS</span></div>
              <div><strong>100%</strong><span>CUSTOM DIRECTION</span></div>
              <div><strong>1:1</strong><span>CLIENT FOCUSED</span></div>
            </div>
          </div>

          <div className="concept-hero-scene" aria-hidden="true">
            <div className="scene-light" />
            <div className="scene-desk" />
            <div className="scene-laptop">
              <div className="scene-screen">
                <img src="/otr-mark.svg" alt="" />
                <span>MORE THAN WEBSITES</span>
                <small>Original / Technical / Relentless</small>
              </div>
            </div>
            <div className="scene-cup"><img src="/otr-mark.svg" alt="" /></div>
            <div className="scene-copy">ORIGINAL<br />TECHNICAL<br />RELENTLESS</div>
          </div>
        </div>
      </section>

      <section className="concept-services" id="services">
        <div className="concept-shell">
          <div className="concept-centered-heading">
            <p className="concept-eyebrow">OUR SERVICES</p>
            <h2>MORE THAN WEBSITES</h2>
            <p>Everything you need to take your business to the next level, without making the brand feel like everybody else.</p>
          </div>
          <div className="concept-service-grid">
            {services.map((service) => (
              <article key={service.number} className="concept-service-card">
                <span className="service-number">{service.number}</span>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#contact" aria-label={`Ask about ${service.title}`}>→</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="concept-work" id="work">
        <div className="concept-shell">
          <div className="concept-work-heading">
            <div>
              <p className="concept-eyebrow">FEATURED WORK</p>
              <h2>BUILT FOR REAL PEOPLE.</h2>
            </div>
            <p>A few of the businesses we&apos;ve helped bring to life.</p>
          </div>

          <div className="project-grid concept-project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-card-${index + 1} concept-project-card`} key={project.number}>
                <div className="project-visual concept-project-visual"><div className="project-grid-lines" /></div>
                <div className="concept-project-copy">
                  <h3>{project.name}</h3>
                  <span>{project.url}</span>
                  <p>{project.category}</p>
                  <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">VIEW SITE <b>↗</b></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="concept-signature" aria-label="OTR motto">
        <div className="concept-shell">
          <span>IDEAS<br />BRANDS<br />WEBSITES<br />RESULTS</span>
          <strong>Original Technical Relentless</strong>
          <span>SAME MENTALITY.<br />DIFFERENT INDUSTRIES.</span>
        </div>
      </section>

      <section className="concept-process" id="about">
        <div className="concept-shell">
          <div className="concept-centered-heading">
            <p className="concept-eyebrow">THE PROCESS</p>
            <h2>SIMPLE. CLEAR. EFFECTIVE.</h2>
            <p>We keep it straightforward from start to finish.</p>
          </div>
          <div className="concept-process-grid">
            {process.map(([number, title, copy], index) => (
              <article key={number} className="concept-process-step">
                <span>{number}</span>
                <div className="process-icon">{index === 0 ? "◯" : index === 1 ? "▤" : index === 2 ? "⚙" : "↗"}</div>
                <h3>{title}</h3>
                <p>{copy}</p>
                {index < process.length - 1 && <b className="process-arrow">→</b>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="concept-contact" id="contact">
        <div className="concept-shell concept-contact-grid">
          <div>
            <p className="concept-eyebrow">LET&apos;S BUILD SOMETHING</p>
            <h2>TOGETHER.</h2>
            <p>Whether you need a website, branding, management, or just want to talk ideas, bring it to OTR.</p>
            <div className="concept-actions">
              <a href="mailto:otrservicesie@gmail.com?subject=OTR%20Services%20Project%20Inquiry" className="concept-button concept-button-solid">GET STARTED <span>→</span></a>
              <a href="mailto:otrservicesie@gmail.com" className="concept-button">SEND A MESSAGE</a>
            </div>
          </div>
          <div className="contact-device" aria-hidden="true">
            <div className="contact-phone"><img src="/otr-mark.svg" alt="" /><span>BUILT DIFFERENT<br />FOR BUSINESS</span></div>
          </div>
        </div>
      </section>

      <footer className="concept-footer">
        <div className="concept-shell concept-footer-grid">
          <img src="/otr-mark.svg" alt="OTR" />
          <nav><a href="#top">Home</a><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
          <span>ORIGINAL • TECHNICAL • RELENTLESS</span>
        </div>
      </footer>
    </main>
  );
}
