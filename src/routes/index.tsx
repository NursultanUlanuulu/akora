import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import logoAsset from "@/assets/akora-logo.asset.json";
import heroStudent from "@/assets/hero-student.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const NAV_LINKS = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#why", label: "Почему мы" },
  { href: "#contact", label: "Контакты" },
];

const SERVICES = [
  {
    title: "Подготовка к IELTS",
    desc: "Комплексные программы подготовки к IELTS Academic и General Training для обучения, работы и иммиграции.",
  },
  {
    title: "Подготовка к iTEP Academic",
    desc: "Профессиональная подготовка с изучением структуры экзамена и развитием всех четырех языковых навыков.",
  },
  {
    title: "Официальный экзамен iTEP",
    desc: "Регистрация и проведение официального международного экзамена iTEP Academic.",
  },
  {
    title: "Пробное тестирование",
    desc: "Mock Tests в условиях, максимально приближенных к официальному экзамену, с подробным анализом.",
  },
  {
    title: "Курсы английского",
    desc: "Программы для подростков и взрослых от Beginner до Advanced — общий, академический и профессиональный английский.",
  },
  {
    title: "Индивидуальные занятия",
    desc: "Персональные программы с учетом уровня, целей и сроков подготовки каждого студента.",
  },
  {
    title: "Образовательный консалтинг",
    desc: "Консультации по подготовке, регистрации на экзамены и поступлению в зарубежные учебные заведения.",
  },
  {
    title: "Международная сертификация",
    desc: "Подготовка к получению сертификатов, признаваемых университетами и работодателями по всему миру.",
  },
];

const ADVANTAGES = [
  {
    n: "01",
    title: "Официальный центр",
    desc: "Регистрация и проведение международных экзаменов IELTS и iTEP Academic.",
  },
  {
    n: "02",
    title: "Международные стандарты",
    desc: "Программы обучения, разработанные в соответствии с мировыми стандартами качества.",
  },
  {
    n: "03",
    title: "Квалифицированные преподаватели",
    desc: "Высокий уровень владения языком и практический опыт подготовки к международным экзаменам.",
  },
  {
    n: "04",
    title: "Персональный подход",
    desc: "Индивидуальные образовательные программы под цели, уровень и сроки каждого студента.",
  },
  {
    n: "05",
    title: "Mock Tests с анализом",
    desc: "Пробные экзамены с подробным разбором результатов и рекомендациями преподавателей.",
  },
  {
    n: "06",
    title: "Сопровождение до экзамена",
    desc: "Поддержка на всех этапах — от подготовки до регистрации и сдачи официального теста.",
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`opacity-0 ${className}`} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Why />
        <Partners />
        <ContactForm />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          {/* <img src={logoAsset.url} alt="ACORA Education" className="h-11 w-11 object-contain" /> */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-[15px] font-bold tracking-[0.18em] text-primary">
              ACORA
            </span>
            <span className="text-[10px] tracking-[0.32em] text-gold uppercase">
              Education
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-foreground/80 hover:text-primary transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#lead" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-[13px]">
            Оставить заявку
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
            className="lg:hidden grid h-11 w-11 place-items-center rounded-sm border border-border"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-5 bg-primary transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-primary transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-primary transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* mobile */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 border-b border-border bg-background ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="container-x py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground/85"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#lead"
            onClick={() => setOpen(false)}
            className="btn-primary !py-3 mt-2 text-[13px] self-start"
          >
            Оставить заявку
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* decorative geometry */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-24 -left-32 h-[520px] w-[520px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-gold/[0.05] blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
        </svg>
      </div>

      <div className="container-x grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">
        <div>
          <Reveal>
            <span className="eyebrow">Официальный экзаменационный центр</span>
          </Reveal>

          <Reveal>
            <h1 className="mt-6 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] font-bold text-primary">
              Подготовка к <span className="italic font-light text-gold">IELTS</span> и{" "}
              <span className="italic font-light text-gold">iTEP Academic</span> по международным стандартам
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.7] text-muted-foreground">
              Официальный центр подготовки и проведения международных экзаменов.
              Современные программы обучения, квалифицированные преподаватели
              и персональное сопровождение на каждом этапе.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#lead" className="btn-primary">
                Оставить заявку
                <ArrowRight />
              </a>
              <a
                href="https://wa.me/996222060036"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <WhatsAppIcon />
                Связаться в WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              <Stat value="IELTS" label="Academic & General" />
              <Stat value="iTEP" label="Официальный центр" />
              <Stat value="1:1" label="Персональный подход" />
            </div>
          </Reveal>
        </div>

        {/* visual */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md ml-auto">
            {/* gold frame */}
            <div className="absolute -inset-4 border border-gold/40" aria-hidden />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-gold" aria-hidden />

            <div className="relative h-full w-full overflow-hidden bg-primary">
              <img
                src={heroStudent}
                alt="Студентка международного образовательного центра ACORA"
                width={1280}
                height={1600}
                className="h-full w-full object-cover mix-blend-luminosity opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute -left-6 bottom-10 bg-surface border border-border p-5 pr-8 shadow-[0_24px_48px_-24px_rgba(11,42,111,0.35)]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center bg-primary text-gold">
                  <CheckIcon />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Международный
                  </div>
                  <div className="font-display font-semibold text-primary">
                    Стандарт качества
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-24 items-start">
        <Reveal>
          <span className="eyebrow">О нас</span>
          <h2 className="mt-6 font-display text-3xl md:text-[2.5rem] leading-[1.15] font-bold text-primary">
            Международный образовательный центр нового поколения
          </h2>
          <div className="mt-8 hairline w-24" />
          <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.75] text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">ACORA Education</span> — международный
              образовательный центр, специализирующийся на подготовке к IELTS и iTEP Academic,
              обучении английскому языку, международной сертификации и образовательном консалтинге.
            </p>
            <p>
              Мы объединяем опыт преподавателей, современные методики обучения и международные
              стандарты качества, помогая студентам уверенно достигать академических и
              профессиональных целей.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-primary text-primary-foreground p-10 md:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold/10 blur-2xl"
            />
            <div className="relative">
              <div className="text-gold text-xs uppercase tracking-[0.28em] font-medium">
                Наши принципы
              </div>
              <ul className="mt-8 space-y-6">
                {[
                  ["Профессионализм", "Международный уровень преподавателей и методик."],
                  ["Качество", "Программы в соответствии с мировыми стандартами."],
                  ["Ответственность", "Сопровождение на каждом этапе подготовки."],
                  ["Развитие", "Актуальные материалы и непрерывное совершенствование."],
                ].map(([t, d]) => (
                  <li key={t} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <span className="mt-2 h-px w-6 bg-gold" />
                    <div>
                      <div className="font-display font-semibold">{t}</div>
                      <div className="text-sm text-primary-foreground/70 mt-1">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-surface border-y border-border">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Наши услуги</span>
            <h2 className="mt-6 font-display text-3xl md:text-[2.5rem] leading-[1.15] font-bold text-primary">
              Полный цикл международной языковой подготовки
            </h2>
            <p className="mt-6 text-muted-foreground leading-[1.7]">
              От первых занятий до официальной сдачи экзамена — программы, разработанные
              под академические и карьерные цели каждого студента.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title}>
              <div className="card-premium h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center border border-gold/50 text-gold">
                    <ServiceIcon i={i} />
                  </div>
                  <span className="text-xs tracking-[0.2em] text-muted-foreground font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display font-semibold text-[1.05rem] text-primary">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.65] text-muted-foreground flex-1">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dark" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark)" className="text-gold" />
        </svg>
      </div>
      <div aria-hidden className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Почему выбирают ACORA</span>
            <h2 className="mt-6 font-display text-3xl md:text-[2.5rem] leading-[1.15] font-bold text-primary-foreground">
              Шесть причин доверить нам вашу подготовку
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {ADVANTAGES.map((a) => (
            <Reveal key={a.n}>
              <div className="group">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl font-light text-gold">{a.n}</span>
                  <div className="h-px flex-1 bg-primary-foreground/15 group-hover:bg-gold/60 transition-colors" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg text-primary-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-primary-foreground/70">
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="py-20 md:py-24 bg-surface border-b border-border">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow">Партнеры</span>
            <div className="mt-10 flex flex-col items-center">
              <div className="grid h-16 w-16 place-items-center bg-primary text-gold font-display font-bold text-xl tracking-tighter">
                NEN
              </div>
              <div className="mt-5 font-display font-semibold text-primary text-lg">
                National Education Network
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Стратегический образовательный партнер
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    consent: false,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus("submitting");

    const subject = encodeURIComponent(`Заявка с сайта: ${form.name}`);
    const body = encodeURIComponent(
      `Имя: ${form.name}\nТелефон: ${form.phone}\nEmail: ${form.email}\nУслуга: ${form.service}\n\nСообщение:\n${form.message}`,
    );

    // Open mail client as delivery fallback (no backend required)
    window.location.href = `mailto:acoraeducation@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => setStatus("success"), 400);
  };

  return (
    <section id="lead" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-start">
          <Reveal>
            <span className="eyebrow">Оставить заявку</span>
            <h2 className="mt-6 font-display text-3xl md:text-[2.5rem] leading-[1.15] font-bold text-primary">
              Начнем подготовку с бесплатной консультации
            </h2>
            <p className="mt-6 text-muted-foreground leading-[1.7]">
              Оставьте заявку — мы свяжемся в ближайшее рабочее время, определим ваш
              уровень и подберем оптимальную программу подготовки.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <ContactRow label="Email" value="acoraeducation@gmail.com" href="mailto:acoraeducation@gmail.com" />
              <ContactRow label="WhatsApp" value="+996 550 878 512" href="https://wa.me/996550878512" />
              <ContactRow label="Режим" value="Пн–Пт, 09:00 – 18:00" />
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="bg-surface border border-border p-8 md:p-10 relative"
            >
              {status === "success" ? (
                <div className="py-16 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center bg-primary text-gold">
                    <CheckIcon />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-primary">
                    Спасибо!
                  </h3>
                  <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                    Мы свяжемся с вами в ближайшее рабочее время.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5">
                  <Field
                    label="Имя и фамилия"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Телефон / WhatsApp"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                  </div>
                  <SelectField
                    label="Интересующая услуга"
                    value={form.service}
                    onChange={(v) => setForm({ ...form, service: v })}
                    options={SERVICES.map((s) => s.title)}
                  />
                  <TextareaField
                    label="Сообщение"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />

                  <label className="flex items-start gap-3 text-xs text-muted-foreground leading-[1.6] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      required
                      className="mt-0.5 h-4 w-4 accent-[color:var(--color-primary)]"
                    />
                    <span>
                      Я согласен(а) на обработку персональных данных в соответствии
                      с политикой конфиденциальности.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!form.consent || status === "submitting"}
                    className="btn-primary mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
                    <ArrowRight />
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="text-xs uppercase tracking-[0.22em] text-gold w-24 shrink-0">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-6 group hover:text-primary transition-colors">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-6">{inner}</div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
        {label}
      </span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground resize-none focus:border-primary focus:outline-none focus:ring-0 transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none focus:ring-0"
      >
        <option value="">Выберите услугу</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Contacts() {
  return (
    <section id="contact" className="pb-24 md:pb-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-stretch">
          <Reveal>
            <div className="bg-primary text-primary-foreground p-10 md:p-12 h-full">
              <span className="text-gold text-xs uppercase tracking-[0.28em] font-medium">
                Контакты
              </span>
              <h3 className="mt-6 font-display text-2xl md:text-3xl font-bold">
                Приходите в наш офис
              </h3>

              <div className="mt-10 space-y-6 text-sm">
                <InfoBlock label="Адрес">
                  Кыргызская Республика, Сокулукский район, а/а Жаны Пахтинский,
                  с. Джаны-Джер, ул. Бухобаева Молдоказы, д. 13
                </InfoBlock>
                <InfoBlock label="Телефон / WhatsApp">
                  <a href="tel:+996550878512" className="hover:text-gold transition-colors">
                    +996 550 878 512
                  </a>
                </InfoBlock>
                <InfoBlock label="Email">
                  <a
                    href="mailto:acoraeducation@gmail.com"
                    className="hover:text-gold transition-colors"
                  >
                    acoraeducation@gmail.com
                  </a>
                </InfoBlock>
                <InfoBlock label="Режим работы">Пн–Пт: 09:00 – 18:00</InfoBlock>
              </div>

              <div className="mt-10 pt-8 border-t border-primary-foreground/15">
                <div className="text-gold text-xs uppercase tracking-[0.24em] mb-4">
                  Соцсети
                </div>
                <div className="flex flex-wrap gap-3">
                  <SocialLink href="https://www.instagram.com/acora_education" label="Instagram" />
                  <SocialLink href="https://t.me/+996550878512" label="Telegram" />
                  <SocialLink href="https://wa.me/996222060036" label="WhatsApp" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full min-h-[420px] relative border border-border overflow-hidden bg-muted">
              <iframe
                title="ACORA Education office"
                src="https://www.google.com/maps?q=Сокулукский+район+Джаны-Джер&output=embed"
                className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-primary-foreground/50 font-medium">
        {label}
      </div>
      <div className="mt-2 leading-[1.65] text-primary-foreground/90">{children}</div>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 border border-primary-foreground/25 text-xs uppercase tracking-[0.16em] hover:border-gold hover:text-gold transition-colors"
    >
      {label}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {/* <img src={logoAsset.url} alt="ACORA Education" className="h-9 w-9 object-contain" /> */}
          <div className="leading-tight">
            <div className="font-display font-bold text-primary text-sm tracking-[0.18em]">
              ACORA
            </div>
            <div className="text-[10px] tracking-[0.28em] text-gold uppercase">
              Education
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2026 ACORA Education. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/* ---------- icons ---------- */

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H8c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.7.1.2 1.9 2.8 4.5 3.9 1.7.7 2.3.8 3.1.7.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.7-.4M12 3.6c-4.7 0-8.4 3.8-8.4 8.4 0 1.6.4 3.1 1.2 4.4L3 21l4.7-1.2c1.3.7 2.7 1.1 4.3 1.1 4.7 0 8.4-3.8 8.4-8.4S16.7 3.6 12 3.6" />
    </svg>
  );
}

function ServiceIcon({ i }: { i: number }) {
  const paths = [
    // IELTS - certificate
    "M4 6h16v12H4zM8 10h8M8 14h5",
    // iTEP - document
    "M6 3h9l5 5v13H6zM15 3v5h5",
    // Exam - shield check
    "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",
    // Mock test - clipboard
    "M9 5h6M8 4h8v16H8zM11 10h5M11 14h5M7 10h.01M7 14h.01",
    // Courses - book
    "M4 5c2-1 5-1 8 1 3-2 6-2 8-1v14c-2-1-5-1-8 1-3-2-6-2-8-1zM12 6v14",
    // 1:1 - user
    "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-7 8-7s8 3 8 7",
    // Consulting - chat
    "M4 5h16v11H8l-4 4z",
    // Certification - award
    "M12 3a5 5 0 100 10 5 5 0 000-10zM8.5 12l-2 8 5.5-3 5.5 3-2-8",
  ];
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[i % paths.length]} />
    </svg>
  );
}
