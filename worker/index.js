const HERO_IMAGE_BASE64 = "__HERO_WORKSPACE_BASE64__";
const RESUME_DOCX_BASE64 = "__RESUME_DOCX_BASE64__";

const heroImageBytes = Uint8Array.from(atob(HERO_IMAGE_BASE64), (character) =>
  character.charCodeAt(0),
);

const resumeDocxBytes = Uint8Array.from(atob(RESUME_DOCX_BASE64), (character) =>
  character.charCodeAt(0),
);

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Victoria Ren - software engineer resume, projects, experience, and technical focus.">
    <meta name="theme-color" content="#f5f7f4">
    <title>Victoria Ren | Software Engineer</title>
    <style>
      :root {
        color-scheme: light;
        --page: #f5f7f4;
        --surface: #ffffff;
        --surface-2: #eef3ef;
        --ink: #101413;
        --muted: #66706c;
        --soft: #87918c;
        --line: #dce3df;
        --teal: #0f766e;
        --blue: #2563eb;
        --coral: #dc5f3b;
        --lime: #9bc53d;
        --amber: #b7791f;
        --shadow: 0 22px 70px rgba(16, 20, 19, 0.11);
        --radius: 8px;
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        font-size: 16px;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        min-height: 100vh;
        margin: 0;
        background:
          linear-gradient(90deg, rgba(16, 20, 19, 0.04) 1px, transparent 1px),
          linear-gradient(180deg, rgba(16, 20, 19, 0.035) 1px, transparent 1px),
          radial-gradient(circle at 18% 8%, rgba(155, 197, 61, 0.14), transparent 24rem),
          radial-gradient(circle at 78% 4%, rgba(15, 118, 110, 0.12), transparent 24rem),
          var(--page);
        background-size: 42px 42px, 42px 42px, auto, auto, auto;
        color: var(--ink);
        line-height: 1.5;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      img {
        display: block;
        max-width: 100%;
      }

      .skip-link {
        position: fixed;
        left: 16px;
        top: 16px;
        z-index: 20;
        transform: translateY(-140%);
        border-radius: var(--radius);
        background: var(--ink);
        color: var(--surface);
        padding: 10px 14px;
        transition: transform 160ms ease;
      }

      .skip-link:focus {
        transform: translateY(0);
      }

      .topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 1px solid rgba(16, 20, 19, 0.08);
        background: rgba(245, 247, 244, 0.88);
        backdrop-filter: blur(18px);
      }

      .nav {
        display: flex;
        width: min(1180px, calc(100% - 36px));
        min-height: 70px;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .mark {
        display: inline-grid;
        width: 40px;
        aspect-ratio: 1;
        flex: none;
        place-items: center;
        border: 1px solid var(--ink);
        border-radius: 50%;
        background: var(--ink);
        color: var(--surface);
        font-size: 0.72rem;
        font-weight: 780;
        letter-spacing: 0;
      }

      .brand-text {
        display: grid;
        gap: 1px;
        min-width: 0;
      }

      .brand-text strong {
        overflow: hidden;
        font-size: 0.95rem;
        line-height: 1.1;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .brand-text span {
        color: var(--muted);
        font-size: 0.78rem;
        font-weight: 700;
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .nav-links a {
        border-radius: 999px;
        color: #2a302e;
        font-size: 0.88rem;
        font-weight: 720;
        padding: 9px 11px;
      }

      .nav-links a:hover,
      .nav-links a:focus-visible {
        background: rgba(15, 118, 110, 0.1);
        color: var(--teal);
        outline: none;
      }

      main {
        overflow: hidden;
      }

      .wrap {
        width: min(1180px, calc(100% - 36px));
        margin: 0 auto;
      }

      .hero {
        display: grid;
        min-height: calc(100vh - 70px);
        align-items: center;
        gap: 42px;
        grid-template-columns: minmax(0, 0.96fr) minmax(340px, 0.74fr);
        padding: 70px 0 56px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin: 0 0 22px;
        color: var(--muted);
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.78rem;
        font-weight: 760;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .eyebrow::before {
        display: inline-block;
        width: 34px;
        height: 2px;
        background: var(--lime);
        content: "";
      }

      h1,
      h2,
      h3,
      p {
        margin: 0;
      }

      h1 {
        max-width: 850px;
        font-size: clamp(4rem, 8.8vw, 8.6rem);
        font-weight: 780;
        letter-spacing: 0;
        line-height: 0.91;
      }

      .title-line {
        display: block;
      }

      .title-line.role {
        color: transparent;
        -webkit-text-stroke: 1.4px var(--ink);
      }

      .hero-copy {
        max-width: 700px;
        margin-top: 28px;
        color: #3e4643;
        font-size: clamp(1.12rem, 1.8vw, 1.42rem);
        line-height: 1.42;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 32px;
      }

      .button {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border: 1px solid var(--ink);
        border-radius: 999px;
        font-weight: 780;
        padding: 0 18px;
        transition:
          transform 160ms ease,
          background 160ms ease,
          color 160ms ease,
          border-color 160ms ease;
      }

      .button:hover,
      .button:focus-visible {
        transform: translateY(-1px);
        outline: none;
      }

      .button.primary {
        background: var(--ink);
        color: var(--surface);
      }

      .button.primary:hover,
      .button.primary:focus-visible {
        background: var(--teal);
        border-color: var(--teal);
      }

      .button.secondary {
        background: rgba(255, 255, 255, 0.66);
      }

      .button svg {
        width: 17px;
        height: 17px;
        flex: none;
      }

      .hero-stack {
        display: grid;
        gap: 14px;
      }

      .status-panel,
      .focus-panel,
      .image-panel {
        border: 1px solid rgba(16, 20, 19, 0.12);
        border-radius: var(--radius);
        background: rgba(255, 255, 255, 0.76);
        box-shadow: var(--shadow);
        backdrop-filter: blur(16px);
      }

      .status-panel {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(2, 1fr);
        padding: 18px;
      }

      .metric {
        display: grid;
        gap: 4px;
      }

      .metric span {
        color: var(--muted);
        font-size: 0.72rem;
        font-weight: 760;
        text-transform: uppercase;
      }

      .metric strong {
        font-size: 1.08rem;
        line-height: 1.12;
      }

      .focus-panel {
        display: grid;
        gap: 18px;
        padding: 22px;
      }

      .focus-panel h2 {
        max-width: none;
        font-size: clamp(1.45rem, 2.6vw, 2rem);
        line-height: 1.08;
      }

      .focus-panel p {
        color: #46504c;
      }

      .focus-tags {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 2px;
        scrollbar-width: none;
        white-space: nowrap;
      }

      .focus-tags::-webkit-scrollbar {
        display: none;
      }

      .focus-tags .tag {
        flex: 0 0 auto;
      }

      .image-panel {
        position: relative;
        overflow: hidden;
        min-height: 240px;
      }

      .image-panel img {
        width: 100%;
        height: 100%;
        min-height: 240px;
        object-fit: cover;
      }

      .image-badge {
        position: absolute;
        left: 16px;
        bottom: 16px;
        display: inline-flex;
        align-items: center;
        gap: 9px;
        border: 1px solid rgba(16, 20, 19, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.86);
        color: #26302d;
        font-size: 0.82rem;
        font-weight: 760;
        padding: 8px 12px;
        backdrop-filter: blur(14px);
      }

      .pulse {
        width: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--lime);
        box-shadow: 0 0 0 5px rgba(155, 197, 61, 0.18);
      }

      .quick-facts {
        display: grid;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        grid-template-columns: repeat(4, 1fr);
      }

      .fact {
        min-height: 128px;
        padding: 24px 22px;
      }

      .fact + .fact {
        border-left: 1px solid var(--line);
      }

      .fact span {
        display: block;
        color: var(--muted);
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.72rem;
        font-weight: 760;
        text-transform: uppercase;
      }

      .fact strong {
        display: block;
        margin-top: 12px;
        font-size: clamp(1.08rem, 1.7vw, 1.45rem);
        font-weight: 760;
        line-height: 1.14;
      }

      .section {
        padding: 92px 0;
      }

      .section-header {
        display: grid;
        align-items: end;
        gap: 28px;
        grid-template-columns: minmax(0, 0.68fr) minmax(280px, 0.32fr);
        margin-bottom: 32px;
      }

      .kicker {
        margin-bottom: 13px;
        color: var(--muted);
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.76rem;
        font-weight: 780;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      h2 {
        max-width: 780px;
        font-size: clamp(2.2rem, 4.8vw, 4.35rem);
        font-weight: 780;
        letter-spacing: 0;
        line-height: 1;
      }

      .section-note {
        color: #4b5551;
        font-size: 1rem;
      }

      .timeline {
        border-top: 1px solid var(--line);
      }

      .timeline-item {
        display: grid;
        gap: 28px;
        border-bottom: 1px solid var(--line);
        grid-template-columns: minmax(150px, 0.22fr) minmax(0, 0.46fr) minmax(0, 0.32fr);
        padding: 28px 0;
      }

      .time {
        color: var(--muted);
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.82rem;
        font-weight: 760;
      }

      .role-block {
        display: grid;
        gap: 7px;
      }

      .role-block strong {
        font-size: clamp(1.22rem, 2vw, 1.75rem);
        font-weight: 780;
        line-height: 1.1;
      }

      .role-block span,
      .timeline-item p {
        color: var(--muted);
      }

      .details {
        display: grid;
        gap: 16px;
      }

      .impact-list {
        display: grid;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .impact-list li {
        position: relative;
        color: #46504c;
        padding-left: 18px;
      }

      .impact-list li::before {
        position: absolute;
        left: 0;
        top: 0.72em;
        width: 6px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--teal);
        content: "";
      }

      .tag-group {
        display: flex;
        flex-wrap: wrap;
        align-content: start;
        gap: 8px;
      }

      .tag {
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.58);
        color: #36413d;
        font-size: 0.8rem;
        font-weight: 740;
        padding: 6px 10px;
      }

      .project-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(3, 1fr);
      }

      .project-card {
        display: flex;
        min-height: 330px;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: rgba(255, 255, 255, 0.72);
        padding: 22px;
        transition:
          transform 160ms ease,
          border-color 160ms ease,
          box-shadow 160ms ease;
      }

      .project-card:hover,
      .project-card:focus-visible {
        transform: translateY(-3px);
        border-color: rgba(15, 118, 110, 0.38);
        box-shadow: 0 18px 44px rgba(16, 20, 19, 0.1);
        outline: none;
      }

      .project-top {
        display: grid;
        gap: 14px;
      }

      .project-index {
        display: inline-grid;
        width: 38px;
        aspect-ratio: 1;
        place-items: center;
        border-radius: 50%;
        background: var(--ink);
        color: var(--surface);
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.78rem;
        font-weight: 780;
      }

      .project-card h3 {
        font-size: 1.32rem;
        line-height: 1.1;
      }

      .project-card p {
        margin-top: 12px;
        color: var(--muted);
      }

      .project-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-top: 28px;
      }

      .external {
        display: inline-grid;
        width: 38px;
        aspect-ratio: 1;
        flex: none;
        place-items: center;
        border: 1px solid var(--line);
        border-radius: 50%;
        background: var(--surface);
      }

      .external svg {
        width: 17px;
        height: 17px;
      }

      .skills-layout {
        display: grid;
        gap: 14px;
        grid-template-columns: minmax(0, 0.38fr) minmax(0, 0.62fr);
      }

      .skills-panel,
      .systems-panel {
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: rgba(255, 255, 255, 0.72);
        padding: 24px;
      }

      .skills-panel h3,
      .systems-panel h3 {
        font-size: 1.2rem;
      }

      .skills-panel p {
        margin-top: 10px;
        color: var(--muted);
      }

      .skill-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 22px;
      }

      .system-list {
        display: grid;
        gap: 0;
        margin-top: 16px;
      }

      .system-row {
        display: grid;
        align-items: center;
        gap: 18px;
        border-top: 1px solid var(--line);
        grid-template-columns: minmax(120px, 0.28fr) minmax(0, 0.72fr);
        padding: 18px 0;
      }

      .system-row:last-child {
        padding-bottom: 0;
      }

      .system-row strong {
        font-size: 0.98rem;
      }

      .system-row span {
        color: var(--muted);
      }

      .education-card {
        display: grid;
        gap: 18px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: rgba(255, 255, 255, 0.72);
        grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
        padding: 24px;
      }

      .education-card strong {
        display: block;
        font-size: clamp(1.3rem, 2.2vw, 1.95rem);
        line-height: 1.1;
      }

      .education-card span,
      .education-card p {
        color: var(--muted);
      }

      .contact-band {
        border-top: 1px solid rgba(16, 20, 19, 0.9);
        background:
          linear-gradient(90deg, rgba(155, 197, 61, 0.12) 1px, transparent 1px),
          linear-gradient(180deg, rgba(155, 197, 61, 0.1) 1px, transparent 1px),
          #101413;
        background-size: 38px 38px;
        color: #f8faf6;
        padding: 74px 0;
      }

      .contact-grid {
        display: grid;
        align-items: end;
        gap: 36px;
        grid-template-columns: minmax(0, 0.7fr) minmax(280px, 0.3fr);
      }

      .contact-grid h2 {
        color: #f8faf6;
      }

      .contact-grid p {
        max-width: 670px;
        margin-top: 20px;
        color: #cbd3cf;
        font-size: 1.1rem;
      }

      .contact-links {
        display: grid;
        gap: 10px;
      }

      .contact-links a {
        display: flex;
        min-height: 54px;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border: 1px solid rgba(248, 250, 246, 0.18);
        border-radius: var(--radius);
        padding: 0 16px;
        transition:
          background 160ms ease,
          border-color 160ms ease;
      }

      .contact-links a:hover,
      .contact-links a:focus-visible {
        border-color: rgba(248, 250, 246, 0.46);
        background: rgba(248, 250, 246, 0.08);
        outline: none;
      }

      .contact-links span:last-child {
        color: #dce4df;
        font-family:
          "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.82rem;
      }

      footer {
        border-top: 1px solid rgba(248, 250, 246, 0.12);
        background: #101413;
        color: #99a39e;
        font-size: 0.9rem;
        padding: 22px 0;
      }

      .footer-inner {
        display: flex;
        width: min(1180px, calc(100% - 36px));
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }

      [data-reveal] {
        transform: translateY(16px);
        opacity: 0;
        transition:
          transform 520ms cubic-bezier(0.2, 0.7, 0.2, 1),
          opacity 520ms ease;
      }

      [data-reveal].is-visible {
        transform: translateY(0);
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
        }

        [data-reveal] {
          transform: none;
          opacity: 1;
        }
      }

      @media (max-width: 980px) {
        .hero,
        .section-header,
        .skills-layout,
        .contact-grid {
          grid-template-columns: 1fr;
        }

        .hero {
          min-height: auto;
          padding-top: 54px;
        }

        .timeline-item {
          grid-template-columns: minmax(120px, 0.24fr) minmax(0, 0.76fr);
        }

        .timeline-item p,
        .timeline-item .details,
        .timeline-item .tag-group {
          grid-column: 2;
        }

        .project-grid {
          grid-template-columns: 1fr;
        }

        .project-card {
          min-height: 260px;
        }
      }

      @media (max-width: 740px) {
        .nav {
          min-height: 64px;
        }

        .brand-text {
          display: none;
        }

        .nav-links a {
          font-size: 0.82rem;
          padding: 8px 8px;
        }

        .hero {
          gap: 32px;
          padding-bottom: 46px;
        }

        h1 {
          font-size: clamp(3.35rem, 17vw, 5.1rem);
        }

        .title-line.role {
          -webkit-text-stroke-width: 1px;
        }

        .hero-copy {
          font-size: 1.06rem;
        }

        .status-panel {
          grid-template-columns: 1fr;
        }

        .quick-facts {
          grid-template-columns: 1fr;
        }

        .fact + .fact {
          border-top: 1px solid var(--line);
          border-left: 0;
        }

        .section {
          padding: 68px 0;
        }

        .timeline-item,
        .system-row,
        .education-card {
          grid-template-columns: 1fr;
        }

        .timeline-item p,
        .timeline-item .details,
        .timeline-item .tag-group {
          grid-column: auto;
        }

        .footer-inner {
          align-items: flex-start;
          flex-direction: column;
        }
      }

      @media (max-width: 480px) {
        .wrap,
        .nav,
        .footer-inner {
          width: min(100% - 28px, 1180px);
        }

        .nav-links a[href="#skills"],
        .nav-links a[href="#education"] {
          display: none;
        }

        .button {
          width: 100%;
        }

        pre {
          padding: 16px;
        }

        code {
          font-size: 0.78rem;
        }
      }
    </style>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="topbar">
      <nav class="nav" aria-label="Primary">
        <a class="brand" href="/" aria-label="Victoria Ren home">
          <span class="mark">VR</span>
          <span class="brand-text">
            <strong>Victoria Ren</strong>
            <span>Software Engineer</span>
          </span>
        </a>
        <div class="nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Impact</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </header>

    <main id="main">
      <section class="wrap hero" aria-labelledby="intro-title">
        <div data-reveal>
          <p class="eyebrow">software engineer resume</p>
          <h1 id="intro-title">
            <span class="title-line">Victoria Ren</span>
            <span class="title-line role">AI platforms</span>
          </h1>
          <p class="hero-copy">Rotational software engineer at Cargill building AI review systems, RAG pipelines, backend services, and modern React/TypeScript product workflows.</p>
          <div class="hero-actions" aria-label="Primary actions">
            <a class="button primary" href="/Victoria_Ren_Resume.docx" download>
              Download resume
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a class="button secondary" href="mailto:victoriaren7@gmail.com">Email Victoria</a>
          </div>
        </div>

        <div class="hero-stack" data-reveal>
          

          <div class="focus-panel" aria-label="Current focus">
            <div>
              <p class="kicker">currently building</p>
              <h2>AI review systems that move from prototype to production.</h2>
            </div>
            
            <p>In Cargill's Technology Development Program, I am focused on AI platform and data engineering work across multi-agent review, retrieval, and developer tooling.</p>
            <div class="focus-tags" aria-label="Current focus tags">
              <span class="tag">Multi-agent PR review</span>
              <span class="tag">Retrieval & ranking</span>
              <span class="tag">Production delivery</span>
            </div>
          </div>

          <div class="image-panel">
            <img src="/assets/hero-workspace.png" width="1536" height="1024" alt="A refined engineering workspace with a laptop, notebook, glass object, and neatly arranged notes.">
            <span class="image-badge"><span class="pulse" aria-hidden="true"></span> Atlanta, GA / Technology Development Program</span>
          </div>
        </div>
      </section>

      <section class="wrap quick-facts" aria-label="Resume highlights" data-reveal>
        <div class="fact">
          <span>01 / Current</span>
          <strong>Cargill rotational SWE</strong>
        </div>
        <div class="fact">
          <span>02 / Focus</span>
          <strong>AI platform and data engineering</strong>
        </div>
        <div class="fact">
          <span>03 / Education</span>
          <strong>UT Dallas CS, 4.00 GPA</strong>
        </div>
        <div class="fact">
          <span>04 / Honors</span>
          <strong>Summa cum laude</strong>
        </div>
      </section>

      <section class="section wrap" id="experience">
        <div class="section-header" data-reveal>
          <div>
            <p class="kicker">professional experience</p>
            <h2>Production engineering across AI platforms, customer systems, and automation.</h2>
          </div>
        </div>

        <div class="timeline">
          <article class="timeline-item" data-reveal>
            <span class="time">Feb 2026 - Present</span>
            <div class="role-block">
              <strong>Software Engineer, AI Platform and Data Engineering</strong>
              <span>Cargill, Rotation 2</span>
            </div>
            <div class="details">
              <ul class="impact-list">
                <li>Built and deployed ADELE, a multi-agent PR review application that validated 372 pull requests in pilot, reduced manual review time by 34%, and saved approximately $92,000.</li>
                <li>Architected a two-stage RAG pipeline with Pinecone hybrid search and Cohere Rerank to surface the top 5 semantically ranked chunks per query.</li>
                <li>Implemented custom MCP servers integrating GitHub and Pinecone APIs for full file content, cross-file context, repository metadata, and indexed migration documentation.</li>
                <li>Migrated ADELE from a standalone Python script to a production Django web service for scalable multi-user deployment.</li>
              </ul>
              <div class="tag-group" aria-label="Technologies">
                <span class="tag">LangGraph</span>
                <span class="tag">Pinecone</span>
                <span class="tag">Cohere Rerank</span>
                <span class="tag">Django</span>
                <span class="tag">Python</span>
                <span class="tag">MCP</span>
              </div>
            </div>
          </article>

          <article class="timeline-item" data-reveal>
            <span class="time">Jun 2025 - Feb 2026</span>
            <div class="role-block">
              <strong>Software Engineer, Customer Platforms</strong>
              <span>Cargill, Rotation 1</span>
            </div>
            <div class="details">
              <ul class="impact-list">
                <li>Implemented Unleash feature flags across Spring Boot services to enable zero-downtime migration to a new SAP-backed data layer for thousands of active customers.</li>
                <li>Built a Spring Boot microservice automating contract conversion and expiration alerts for 1,000+ monthly customer notifications.</li>
                <li>Decoupled 3 high-traffic workflows from a legacy pre-Context React monolith into modern React/TypeScript pages, reducing component depth by 60%.</li>
              </ul>
              <div class="tag-group" aria-label="Technologies">
                <span class="tag">Spring Boot</span>
                <span class="tag">React</span>
                <span class="tag">TypeScript</span>
                <span class="tag">Unleash</span>
                <span class="tag">SAP data layer</span>
              </div>
            </div>
          </article>

          <article class="timeline-item" data-reveal>
            <span class="time">May 2024 - Aug 2024</span>
            <div class="role-block">
              <strong>Software Engineer Intern</strong>
              <span>Cargill</span>
            </div>
            <div class="details">
              <ul class="impact-list">
                <li>Built and deployed a Spring Boot SMS microservice, consolidating notification logic across 20+ product teams.</li>
                <li>Built a Python dashboard surfacing DORA metrics for engineering leadership and PM, enabling data-driven KPI tracking across the team.</li>
              </ul>
              <div class="tag-group" aria-label="Technologies">
                <span class="tag">Spring Boot</span>
                <span class="tag">Python</span>
                <span class="tag">DORA metrics</span>
                <span class="tag">Microservices</span>
              </div>
            </div>
          </article>

          <article class="timeline-item" data-reveal>
            <span class="time">Oct 2023 - Mar 2024</span>
            <div class="role-block">
              <strong>Software Development Intern</strong>
              <span>EPSoft Technologies / Farmers Branch, TX</span>
            </div>
            <div class="details">
              <ul class="impact-list">
                <li>Developed a Java reporting automation tool that generated PowerPoint presentations directly from Excel datasets.</li>
                <li>Built an NLP-powered email sentiment classification system using GPT-4 and Hugging Face models for customer communication analysis.</li>
              </ul>
              <div class="tag-group" aria-label="Technologies">
                <span class="tag">Java</span>
                <span class="tag">GPT-4</span>
                <span class="tag">Hugging Face</span>
                <span class="tag">Excel automation</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="section wrap" id="projects">
        <div class="section-header" data-reveal>
          <div>
            <p class="kicker">impact highlights</p>
            <h2>Production systems with measurable impact.</h2>
          </div>
        </div>

        <div class="project-grid">
          <article class="project-card" data-reveal>
            <div class="project-top">
              <span class="project-index">01</span>
              <div>
                <h3>ADELE multi-agent PR review</h3>
                <p>Productionizing an AI code review application with custom MCP servers, GitHub context retrieval, semantic migration docs, and Django multi-user deployment.</p>
              </div>
            </div>
            <div class="project-footer">
              <div class="tag-group" aria-label="Project tags">
                <span class="tag">AI agents</span>
                <span class="tag">RAG</span>
                <span class="tag">Django</span>
              </div>
            </div>
          </article>

          <article class="project-card" data-reveal>
            <div class="project-top">
              <span class="project-index">02</span>
              <div>
                <h3>Zero-downtime SAP data migration</h3>
                <p>Feature-flagged Spring Boot services with Unleash to move thousands of active customers to a new SAP-backed data layer without service interruption.</p>
              </div>
            </div>
            <div class="project-footer">
              <div class="tag-group" aria-label="Project tags">
                <span class="tag">Spring Boot</span>
                <span class="tag">Feature flags</span>
                <span class="tag">Migration</span>
              </div>
            </div>
          </article>

          <article class="project-card" data-reveal>
            <div class="project-top">
              <span class="project-index">03</span>
              <div>
                <h3>Customer workflow modernization</h3>
                <p>Decoupled high-traffic workflows from a legacy React monolith, rebuilt them as modern React/TypeScript pages, and reduced component depth by 60%.</p>
              </div>
            </div>
            <div class="project-footer">
              <div class="tag-group" aria-label="Project tags">
                <span class="tag">React</span>
                <span class="tag">TypeScript</span>
                <span class="tag">Frontend architecture</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="section wrap" id="skills">
        <div class="section-header" data-reveal>
          <div>
            <p class="kicker">technical toolkit</p>
            <h2>AI platform, backend, cloud, frontend, data, and testing skills.</h2>
          </div>
        </div>

        <div class="skills-layout">
          <aside class="skills-panel" data-reveal>
            <h3>AI and developer tools</h3>
            <p>Recent work centers on agentic review systems, retrieval pipelines, and developer productivity tooling.</p>
            <div class="skill-cloud" aria-label="AI and developer tools">
              <span class="tag">LangGraph</span>
              <span class="tag">Pinecone</span>
              <span class="tag">Cohere Rerank</span>
              <span class="tag">Claude Code</span>
              <span class="tag">Codex</span>
              <span class="tag">GitHub Copilot</span>
              <span class="tag">GPT-4</span>
              <span class="tag">Hugging Face</span>
            </div>
          </aside>

          <div class="systems-panel" data-reveal>
            <h3>Engineering stack</h3>
            <div class="system-list">
              <div class="system-row">
                <strong>Languages</strong>
                <span>Java, Python, JavaScript/TypeScript, SQL, C++</span>
              </div>
              <div class="system-row">
                <strong>Backend</strong>
                <span>Spring Boot, Django, Node.js, AWS SQS, Apache Kafka</span>
              </div>
              <div class="system-row">
                <strong>Frontend and testing</strong>
                <span>React, Playwright, JUnit, Mockito</span>
              </div>
              <div class="system-row">
                <strong>Cloud and infrastructure</strong>
                <span>AWS, Docker, Git, Gradle</span>
              </div>
              <div class="system-row">
                <strong>Data and databases</strong>
                <span>PostgreSQL, MongoDB, Redis, Apache Airflow, dbt, PySpark</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section wrap" id="education">
        <div class="section-header" data-reveal>
          <div>
            <p class="kicker">education</p>
            <h2>University of Texas at Dallas.</h2>
          </div>
        </div>

        <article class="education-card" data-reveal>
          <div>
            <strong>B.S. Computer Sciences</strong>
            <span>Aug 2022 - May 2025 / Richardson, TX</span>
          </div>
          <div>
            <p>Summa cum laude with GPA 4.00/4.00. Honors include National Merit Scholar and University Honors Program.</p>
            <div class="skill-cloud" aria-label="Education highlights">
              <span class="tag">4.00 GPA</span>
              <span class="tag">Summa cum laude</span>
              <span class="tag">National Merit Scholar</span>
              <span class="tag">University Honors Program</span>
            </div>
          </div>
        </article>
      </section>

      <section class="contact-band" id="contact">
        <div class="wrap contact-grid" data-reveal>
          <div>
            <p class="kicker">contact</p>
            <h2>Reach out for software engineering roles, AI platform work, or full-stack product engineering.</h2>
            <p>Resume details are available as a DOCX download, with direct email, phone, and LinkedIn links below.</p>
          </div>
          <div class="contact-links" aria-label="Contact links">
            <a href="mailto:victoriaren7@gmail.com">
              <span>Email</span>
              <span>victoriaren7@gmail.com</span>
            </a>
            <a href="tel:+19728762350">
              <span>Phone</span>
              <span>(972) 876-2350</span>
            </a>
            <a href="https://www.linkedin.com/in/victoria-ren-13b134258/" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <span>/in/victoria-ren-13b134258</span>
            </a>
            <a href="/Victoria_Ren_Resume.docx" download>
              <span>Resume</span>
              <span>Download DOCX</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-inner">
        <span>&copy; <span id="year"></span> Victoria Ren</span>
        <span>Built as a fast, static Worker.</span>
      </div>
    </footer>

    <script>
      const year = document.querySelector("#year");
      if (year) {
        year.textContent = new Date().getFullYear();
      }

      const reveals = document.querySelectorAll("[data-reveal]");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || !("IntersectionObserver" in window)) {
        reveals.forEach((element) => element.classList.add("is-visible"));
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.16 },
        );
        reveals.forEach((element) => observer.observe(element));
      }
    </script>
  </body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    void env;
    void ctx;

    const url = new URL(request.url);

    if (url.pathname === "/assets/hero-workspace.png") {
      return new Response(heroImageBytes, {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
          "content-type": "image/png",
        },
      });
    }

    if (url.pathname === "/Victoria_Ren_Resume.docx") {
      return new Response(resumeDocxBytes, {
        headers: {
          "cache-control": "public, max-age=3600",
          "content-disposition":
            'attachment; filename="Victoria_Ren_Resume.docx"',
          "content-type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      });
    }

    if (url.pathname !== "/") {
      return new Response("Not found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    return new Response(page, {
      headers: {
        "cache-control": "public, max-age=300",
        "content-type": "text/html; charset=utf-8",
      },
    });
  },
};
