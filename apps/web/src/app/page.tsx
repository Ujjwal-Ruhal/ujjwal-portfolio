"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  Network,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

const skills = [
  [
    "Backend",
    [
      "Python",
      "Django",
      "Flask",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Django ORM",
      "Authentication",
      "JWT",
      "CRUD",
      "API integration",
      "OTP verification",
      "File uploads",
      "CSRF protection",
      "Server-side validation",
      "Session management",
    ],
  ],
  [
    "Databases",
    [
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Relational design",
      "Normalization",
      "Query optimization",
    ],
  ],
  [
    "Frontend",
    [
      "HTML",
      "CSS",
      "JavaScript",
      "Django Templates",
      "EJS",
      "Responsive design",
    ],
  ],
  [
    "Tools & engineering",
    [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "Docker Compose",
      "Python unittest",
      "Render",
      "Railway",
      "Selenium",
      "VS Code",
    ],
  ],
  [
    "AI & automation",
    [
      "LLM API integration",
      "AI agents",
      "Selenium automation",
      "Browser automation",
      "Structured responses",
      "Cron scheduling",
    ],
  ],
  [
    "Currently strengthening",
    [
      "DSA",
      "System Design",
      "Scalable architecture",
      "Advanced JavaScript",
      "Modern full-stack development",
    ],
  ],
];
const projects = [
  {
    number: "02",
    title: "Productivity Hub",
    tag: "Django · PostgreSQL",
    featured: false,
    description:
      "A production-oriented productivity web application built with Django and PostgreSQL for managing tasks and productivity workflows.",
    problem:
      "A focused workspace for organizing tasks through a reliable, authenticated workflow.",
    stack: ["Python", "Django", "PostgreSQL", "Django ORM", "JWT", "Render"],
    features: [
      "User authentication & session management",
      "JWT-based authentication",
      "Full task CRUD workflow",
      "Relational PostgreSQL schema",
      "Input validation & dynamic templates",
      "Production deployment on Render",
    ],
  },
  {
    number: "01",
    title: "Sewa Setu — Old Age Pension Portal",
    tag: "Featured project · Live workflow",
    featured: true,
    liveUrl:
      "https://sewa-setu-old-age-pension-portal-production.up.railway.app/",
    description:
      "A production-deployed Flask and PostgreSQL old-age pension portal with a secure, validated multi-step application workflow and scheduled pension-processing support.",
    problem:
      "Makes a multi-step pension application easier to complete and track while protecting applicant data, validating submitted information, and supporting staff-side operations.",
    stack: [
      "Python",
      "Flask",
      "PostgreSQL",
      "Docker Compose",
      "CSRF protection",
      "OTP verification",
      "File uploads",
      "Railway",
    ],
    features: [
      "CSRF-protected forms and five-minute session lifetime",
      "Mobile, personal, address, and bank-detail validation",
      "Age-proof upload validation for JPG/PDF files with a 5 MB limit",
      "Application-number generation and status tracking",
      "Python unittest coverage for critical form and PDF-download behaviour",
      "Dockerized Flask and PostgreSQL environment with Docker Compose",
      "Cron-based deemed-approval processing investigated for IST scheduling",
      "Production deployment and database-connection debugging on Railway/Render",
    ],
  },
  {
    number: "03",
    title: "AI-Integrated Web Application",
    tag: "REST API · LLM integration",
    description:
      "A web application integrating backend REST endpoints with LLM APIs to process user input and return structured responses.",
    problem:
      "Turns user input into dependable, structured AI-assisted results through a considered backend API flow.",
    stack: [
      "Python",
      "REST APIs",
      "LLM APIs",
      "Validation",
      "Structured responses",
    ],
    features: [
      "Clear request-to-response API flow",
      "Input validation before API calls",
      "Structured response handling",
      "Error-aware integration layer",
      "Backend-focused AI implementation",
    ],
  },
  {
    number: "04",
    title: "Employee Information System",
    tag: "Academic project · C++",
    description:
      "An academic employee information management system developed in C++ to practice object-oriented programming, file handling, persistent storage, and CRUD workflows.",
    problem:
      "A practical foundation for modelling records, keeping data persistent, and managing it safely.",
    stack: ["C++", "OOP", "File handling", "Persistent storage"],
    features: [
      "Employee record management",
      "Create, read, update & delete",
      "File-based persistence",
      "Modular class design",
      "Encapsulation & abstraction",
    ],
  },
];
const principles = [
  [
    "Build for maintainability",
    "Prefer clean, understandable code over unnecessary complexity.",
  ],
  [
    "Design around data",
    "Think carefully about schemas, relationships, normalization, and query efficiency.",
  ],
  [
    "Secure the API",
    "Use authentication, authorization, validation, and safe input handling.",
  ],
  [
    "Ship the application",
    "A project is more valuable when it actually runs in production.",
  ],
  [
    "Learn through implementation",
    "Focus on understanding systems, not just completing tutorials.",
  ],
];

const linkedinUrl = "https://www.linkedin.com/in/ujjwal-ruhal/";
const githubUrl = "https://github.com/Ujjwal-Ruhal";

export default function Home() {
  return (
    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Backend developer · Software engineer
          </p>
          <h1>
            Ujjwal
            <br />
            <em>Ruhal</em>
          </h1>
          <p className="lede">
            Backend Developer building reliable, database-driven web
            applications with Python.
          </p>
          <p className="support">
            Computer Science graduate focused on Python, Django, Flask, REST
            APIs, PostgreSQL, MySQL, authentication, and production-oriented
            backend development.
          </p>
          <div className="actions">
            <a className="button button-dark" href="#projects">
              View projects <ArrowDownRight size={17} />
            </a>
            <a className="button button-quiet" href="#contact">
              Contact me <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="profile-links">
            <a href={linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="architecture" aria-label="Architecture diagram">
          <div className="arch-top">
            <span className="arch-label">SYSTEM VIEW</span>
            <span className="status-dot" /> Available for opportunities
          </div>
          <div className="arch-flow">
            <div className="arch-node">
              <TerminalSquare />
              <b>Client</b>
              <small>Browser interface</small>
            </div>
            <i>→</i>
            <div className="arch-node active">
              <Network />
              <b>REST API</b>
              <small>Validated requests</small>
            </div>
            <i>→</i>
            <div className="arch-node">
              <Braces />
              <b>Backend</b>
              <small>Django · Flask</small>
            </div>
            <i>→</i>
            <div className="arch-node">
              <Database />
              <b>Database</b>
              <small>PostgreSQL · MySQL</small>
            </div>
          </div>
          <div className="arch-bottom">
            <span>
              <ShieldCheck size={15} /> Authentication
            </span>
            <span>
              <Layers3 size={15} /> Business logic
            </span>
            <span>
              <Database size={15} /> Persistent data
            </span>
          </div>
        </div>
      </section>
      <section id="about" className="section-shell split-section">
        <p className="section-index">01 / ABOUT</p>
        <div>
          <h2>
            Building the systems
            <br />
            behind useful products.
          </h2>
          <p className="body-copy">
            I am a Computer Science graduate and aspiring Backend Developer
            focused on building practical, production-oriented web applications.
            My primary stack is Python with Django and Flask, supported by REST
            APIs, PostgreSQL, MySQL, Git, Linux, and automation tools.
          </p>
          <p className="body-copy">
            I enjoy translating requirements into maintainable backend
            architecture: database design, authentication, CRUD workflows, API
            development, deployment, and AI/LLM integrations. I am currently
            strengthening data structures & algorithms, system design
            fundamentals, scalable backend architecture, and software
            engineering practices.
          </p>
        </div>
      </section>
      <section id="skills" className="section-shell ruled-section">
        <div className="section-heading">
          <p className="section-index">02 / TOOLKIT</p>
          <h2>
            Technical foundations,
            <br />
            applied with intent.
          </h2>
        </div>
        <div className="skills-grid">
          {skills.map(([group, items]) => (
            <article key={group as string}>
              <h3>{group as string}</h3>
              <div>
                {(items as string[]).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="projects" className="section-shell project-section">
        <div className="section-heading">
          <p className="section-index">03 / SELECTED WORK</p>
          <h2>
            Projects built around
            <br />
            real backend concerns.
          </h2>
          <p className="subtle">
            A selection of work exploring application architecture, data
            management, and production-minded delivery.
          </p>
        </div>
        <div className="projects">
          {[...projects]
            .sort((first, second) => Number(first.number) - Number(second.number))
            .map((p) => (
            <article
              className={`project ${p.featured ? "project-featured" : ""}`}
              key={p.title}
            >
              <div className="project-meta">
                <span>{p.number}</span>
                <span>{p.tag}</span>
              </div>
              <div className="project-main">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-detail">
                  <div>
                    <b>Focus</b>
                    <p>{p.problem}</p>
                  </div>
                  <div>
                    <b>Technical highlights</b>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>
                          <Check size={15} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="project-actions">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  <Github size={18} /> GitHub profile
                </a>
                {"liveUrl" in p && p.liveUrl && (
                  <a
                    className="live"
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo <ExternalLink size={17} />
                  </a>
                )}
              </div>
            </article>
            ))}
        </div>
      </section>
      <section className="section-shell future-section" aria-labelledby="future-heading">
        <div className="section-heading">
          <p className="section-index">04 / IN THE PIPELINE</p>
          <h2 id="future-heading">
            Building toward<br />
            useful discovery tools.
          </h2>
          <p className="subtle">
            Concepts I plan to research and build as I strengthen my product
            thinking, API integration, and backend architecture.
          </p>
        </div>
        <article className="future-project">
          <div className="future-label">PLANNED PROJECT / 01</div>
          <div>
            <h3>Song Discovery from Reels</h3>
            <p>
              A song-discovery tool for the moment when a user hears something
              they like while scrolling an Instagram Reel. They would share the
              Reel with the app, which would identify available audio metadata
              and help locate the track across supported streaming platforms.
            </p>
          </div>
          <div className="future-flow" aria-label="Planned Song Discovery flow">
            <span>Share Reel</span><i>→</i><span>Read available audio data</span><i>→</i><span>Search legal platforms</span><i>→</i><strong>Show listening links</strong>
          </div>
          <div className="future-notes">
            <span>Backend API orchestration</span>
            <span>Metadata & search integration</span>
            <span>Platform-result normalization</span>
            <span>Legal streaming-link discovery</span>
          </div>
          <p className="future-disclaimer">
            Planned with platform API availability, permissions, and music
            licensing in mind. The goal is discovery and legal platform links,
            not downloading or redistributing music.
          </p>
        </article>
      </section>
      <section className="section-shell how-section">
        <div className="section-heading">
          <p className="section-index">05 / HOW I BUILD</p>
          <h2>
            A deliberate path
            <br />
            from interface to data.
          </h2>
        </div>
        <div className="build-flow">
          <span>Frontend</span>
          <i>↓</i>
          <span>REST API</span>
          <i>↓</i>
          <span>Backend application</span>
          <i>↓</i>
          <span>Business logic</span>
          <i>↓</i>
          <strong>Database</strong>
        </div>
        <div className="integrations">
          <span>Backend → LLM APIs</span>
          <span>Backend → External APIs</span>
          <span>Backend → Authentication & OTP</span>
          <span>Backend → Document uploads</span>
          <span>Backend → Deployment</span>
        </div>
      </section>
      <section id="experience" className="section-shell timeline">
        <p className="section-index">06 / EXPERIENCE</p>
        <div className="timeline-content">
          <p className="date">JULY 2025 — PRESENT</p>
          <h2>
            Backend Developer
            <br />
            <em>Personal Projects</em>
          </h2>
          <div className="experience-list">
            {[
              "Designed and deployed Productivity Hub",
              "Built and deployed Sewa Setu, an old-age pension application portal",
              "Strengthened Flask form security, validation, Docker testing, and scheduled processing workflows",
              "Built RESTful APIs and JWT authentication flows",
              "Designed PostgreSQL/MySQL relational schemas and CRUD functionality",
              "Used Django ORM, Git/GitHub, Linux, Selenium, and production deployment tools",
            ].map((x) => (
              <p key={x}>
                <span />
                {x}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section id="education" className="section-shell education">
        <p className="section-index">07 / EDUCATION & LEARNING</p>
        <div className="education-grid">
          <article>
            <p className="date">SEPTEMBER 2022 — JULY 2025</p>
            <h2>B.Sc. Computer Science</h2>
            <p>
              S.D. College of Management Studies
              <br />
              Bhopa Road, Muzaffarnagar
            </p>
          </article>
          <article>
            <p className="date">CURRENT FOCUS</p>
            <h3>From backend fundamentals to scalable systems.</h3>
            <div className="learning-path">
              <span>Python backend</span>
              <i>↓</i>
              <span>REST APIs</span>
              <i>↓</i>
              <span>Databases</span>
              <i>↓</i>
              <span>DSA</span>
              <i>↓</i>
              <span>System design</span>
            </div>
          </article>
        </div>
        <div className="certs">
          <span>Gemini Certified Educator</span>
          <span>AI Appreciate Badge — AI For All</span>
          <span>5-Day AI Agents Intensive Course with Google</span>
          <span>Improving Your Leadership Communications</span>
          <span>Python</span>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="section-shell">
          <p className="section-index">08 / CONTACT</p>
          <h2>
            Let&apos;s build
            <br />
            <em>something useful.</em>
          </h2>
          <p>
            I&apos;m currently looking for an entry-level Backend Developer or
            Software Engineer opportunity where I can work on real systems,
            write maintainable software, and continue growing as an engineer.
          </p>
          <div className="actions">
            <a
              className="button button-light"
              href="mailto:ujjwalruhal08@gmail.com"
            >
              <Mail size={17} /> Email me
            </a>
            <a
              className="button button-outline"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={17} />
            </a>
            <a
              className="button button-outline"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={17} />
            </a>
          </div>
          <a className="email" href="mailto:ujjwalruhal08@gmail.com">
            ujjwalruhal08@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
