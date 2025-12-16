import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import logo from "./assets/logo.png";

type CardData = {
  icon: string;
  title: string;
  description: string;
};

type TimelineItem = {
  title: string;
  description: string;
};

const navLinks = [
  { id: "inicio", label: "INICIO" },
  { id: "enfoque", label: "ENFOQUE" },
  { id: "lineas", label: "LÍNEAS" },
  { id: "futuro", label: "FUTURO" },
] as const;

const pillars: CardData[] = [
  {
    icon: "⚡",
    title: "Tecnología & Automatización",
    description:
      "Diseñamos sistemas, herramientas y flujos que hacen que las empresas operen mejor, escalen más fácil y tomen decisiones basadas en datos.",
  },
  {
    icon: "💎",
    title: "Inversión & Patrimonio",
    description:
      "Construimos portafolios pensando en décadas, no en meses. Empezando por mercados globales como la bolsa, con la vista puesta en activos que generen flujo constante.",
  },
  {
    icon: "🏛️",
    title: "Bienes Raíces & Desarrollo",
    description:
      "Nuestro camino apunta hacia la creación y gestión de activos inmobiliarios: desde la inversión en propiedades hasta, en el futuro, el desarrollo de proyectos propios.",
  },
];

const team: CardData[] = [
  {
    icon: "💻",
    title: "Ingeniería de software",
    description:
      "Lideramos la capa tecnológica: automatización, desarrollo de herramientas internas y soluciones a medida para empresas.",
  },
  {
    icon: "⚖️",
    title: "Derecho corporativo e inmobiliario",
    description:
      "Estructuramos cada proyecto con base jurídica sólida: contratos, vehículos societarios, riesgo, cumplimiento y protección de activos.",
  },
  {
    icon: "📈",
    title: "Marketing y crecimiento",
    description:
      "Convertimos estrategias en clientes reales. Marca, adquisición, ventas y narrativa para que los proyectos no solo existan, sino que crezcan.",
  },
];

const lines: CardData[] = [
  {
    icon: "🔧",
    title: "Soluciones tecnológicas para empresas",
    description:
      "Desarrollamos y diseñamos sistemas y automatizaciones que mejoran la operación de negocios: flujos internos, integraciones, paneles y herramientas que ahorran tiempo y reducen errores.",
  },
  {
    icon: "🎯",
    title: "Estrategia patrimonial a largo plazo",
    description:
      "Construimos, paso a paso, una base de inversión diversificada. El foco actual está en mercados globales y, en paralelo, en aprender y prepararnos para la entrada progresiva a bienes raíces.",
  },
  {
    icon: "🏗️",
    title: "Preparación para bienes raíces",
    description:
      "Modelos financieros, procesos legales y criterios de compra/gestión. Antes de “comprar por emoción”, construimos reglas claras para decidir con disciplina.",
  },
];

const timeline: TimelineItem[] = [
  {
    title: "Fase 1 · Base (Ahora)",
    description:
      "Sistemas, automatización y servicios tecnológicos. Fortalecer procesos internos, mejorar ejecución, y construir reputación con resultados verificables.",
  },
  {
    title: "Fase 2 · Portafolio (12–36 meses)",
    description:
      "Consolidar inversión diversificada y métricas de disciplina. Estandarizar reglas de decisión y aumentar el capital destinado a activos de largo plazo.",
  },
  {
    title: "Fase 3 · Activos inmobiliarios (3–7 años)",
    description:
      "Entrada progresiva a propiedades con enfoque en flujo de caja y sostenibilidad. Estructuras legales limpias, gestión operativa y control de riesgos.",
  },
  {
    title: "Fase 4 · Desarrollo (7–20 años)",
    description:
      "Proyectos propios: desde desarrollos pequeños a estructuras de mayor escala, siempre priorizando calidad, ubicación y retorno realista en el tiempo.",
  },
];

const heroPoints = [
  {
    title: "Construcción:",
    description: "bases tecnológicas, legales y de crecimiento.",
  },
  {
    title: "Disciplina:",
    description: "procesos y decisiones medibles en el tiempo.",
  },
  {
    title: "Patrimonio:",
    description: "activos con visión de décadas, no de meses.",
  },
] as const;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(navLinks[0].id);
  const heroPanelRef = useRef<HTMLDivElement | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealables.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealables.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const panel = heroPanelRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allowTilt = window.matchMedia("(min-width: 980px)").matches;
    if (!panel || reduceMotion || !allowTilt) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / rect.width;
      const dy = (event.clientY - cy) / rect.height;
      panel.style.transform = `rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(
        2
      )}deg) translateY(-1px)`;
    };
    const onLeave = () => {
      panel.style.transform = "";
    };

    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerleave", onLeave);
    return () => {
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const handleButtonGlow = (
    event: ReactPointerEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--x", `${x}%`);
    target.style.setProperty("--y", `${y}%`);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="aurora" />
      </div>

      <div className={`drawer ${drawerOpen ? "open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="backdrop" onClick={() => setDrawerOpen(false)} />
        <aside className="panel" role="dialog" aria-modal="true" aria-label="Menú">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  data-close
                >
                  {link.label} <small>{String(idx + 1).padStart(2, "0")}</small>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => scrollToSection("inicio")}
            aria-label="Ir al inicio"
          >
            <div className="logo-wrap" aria-hidden="true">
              <img src={logo} alt="Plumora" className="logo-mark" />
            </div>
            <div className="brand-text">
              <div className="top">PLUMORA</div>
              <div className="sub">INDUSTRIS</div>
            </div>
          </button>

          <ul className="nav-links" id="navDesktop">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`navlink ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`menu-toggle ${drawerOpen ? "active" : ""}`}
            onClick={() => setDrawerOpen((open) => !open)}
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>
        <section id="inicio" className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="badge">
                  <i />
                  VISIÓN DE LARGO PLAZO
                </div>
                <h1 className="script-title" style={{ marginTop: 16 }}>
                  Construimos patrimonio con visión de décadas.
                </h1>
                <p>
                  Plumora Industris es un grupo en formación que integra tecnología, inversión y
                  futuros proyectos inmobiliarios para diseñar estructuras de valor que duren toda
                  una <em className="accent-em">vida completa</em>.
                </p>

                <div className="hero-actions">
                  <a
                    href="#enfoque"
                    className="btn btn-primary"
                    onPointerMove={handleButtonGlow}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("enfoque");
                    }}
                  >
                    Conocer nuestro enfoque <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="#lineas"
                    className="btn btn-ghost"
                    onPointerMove={handleButtonGlow}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("lineas");
                    }}
                  >
                    Explorar líneas de trabajo <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="hero-foot">Enfoque disciplinado, decisiones a largo plazo.</div>
              </div>

              <aside className="hero-panel" id="heroPanel" ref={heroPanelRef}>
                <div className="inner">
                  <div className="mini-title">PLUMORA / RESUMEN</div>
                  <div className="stats">
                    <div className="stat">
                      <strong>3</strong>
                      <span>Pilares de valor</span>
                    </div>
                    <div className="stat">
                      <strong>10–20</strong>
                      <span>Años de horizonte</span>
                    </div>
                  </div>

                  <div className="divider" />

                  <ul className="panel-list">
                    {heroPoints.map((point) => (
                      <li key={point.title}>
                        <span className="dot" />
                        <p>
                          <b>{point.title}</b> {point.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>

          <div className="scroll-indicator" aria-hidden="true">
            <div className="mouse" />
          </div>
        </section>

        <section id="enfoque">
          <div className="container">
            <header className="section-head" data-reveal>
              <h2>Un solo grupo, tres pilares de valor.</h2>
              <div className="underbar" />
              <p className="lead">
                Plumora nace con una idea simple: unir en una misma casa lo que normalmente está
                separado. Ingeniería de software, estrategia legal e inversión se combinan para
                crear proyectos que no dependan de la suerte, sino de{" "}
                <em className="accent-em">disciplina y visión a largo plazo</em>.
              </p>
            </header>

            <div className="grid">
              {pillars.map((card) => (
                <article className="card" key={card.title} data-reveal>
                  <div className="icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="container">
            <header className="section-head" data-reveal>
              <h2>Un equipo multidisciplinario.</h2>
              <div className="underbar" />
              <p className="lead">
                Plumora Industris está fundada por tres perfiles complementarios que comparten la
                misma obsesión: construir algo <em className="accent-em">sólido, paciente y bien hecho</em>.
              </p>
            </header>

            <div className="grid">
              {team.map((card) => (
                <article className="card" key={card.title} data-reveal>
                  <div className="icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lineas">
          <div className="container">
            <header className="section-head" data-reveal>
              <h2>Lo que estamos construyendo hoy.</h2>
              <div className="underbar" />
              <p className="lead">
                Plumora está en una etapa temprana. No presumimos de lo que todavía no existe;
                estamos sentando las bases de lo que queremos que sea un grupo sólido en los
                próximos <em className="accent-em">10 a 20 años</em>.
              </p>
            </header>

            <div className="grid">
              {lines.map((card) => (
                <article className="card" key={card.title} data-reveal>
                  <div className="icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="futuro" className="alt">
          <div className="container">
            <header className="section-head" data-reveal>
              <h2>El futuro se construye con paciencia.</h2>
              <div className="underbar" />
              <p className="lead">
                Un plan no es una promesa: es una <em className="accent-em">dirección</em>. Esto es lo
                que buscamos ir consolidando por etapas, con foco en consistencia y ejecución.
              </p>
            </header>

            <div className="timeline">
              {timeline.map((item) => (
                <div className="t-item" key={item.title} data-reveal>
                  <div className="t-dot" aria-hidden="true" />
                  <div className="t-card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer>
          <div className="container foot">
            <div>© {year} Plumora Industris. Construimos con visión de décadas.</div>
            <div>
              <a
                href="#inicio"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("inicio");
                }}
              >
                Inicio
              </a>{" "}
              ·{" "}
              <a
                href="#enfoque"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("enfoque");
                }}
              >
                Enfoque
              </a>{" "}
              ·{" "}
              <a
                href="#lineas"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("lineas");
                }}
              >
                Líneas
              </a>{" "}
              ·{" "}
              <a
                href="#futuro"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("futuro");
                }}
              >
                Futuro
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
