import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  LineChart,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Scroll-triggered reveal
   ───────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 650ms cubic-bezier(0.25,1,0.5,1) ${delay}ms, transform 650ms cubic-bezier(0.25,1,0.5,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Header
   ───────────────────────────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-extrabold tracking-tight">
          Curate<span className="text-primary">ETF</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            큐레이션
          </a>
          <a
            href="#strategies"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            전략
          </a>
          <a
            href="#start"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            시작하기
          </a>
        </div>

        <Button size="sm" className="rounded-full">
          무료로 시작
        </Button>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────── */

const EASE_OUT_QUART = "cubic-bezier(0.25,1,0.5,1)";

function HeroItem({
  children,
  delay,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: 0,
        animation: `fade-up 700ms ${EASE_OUT_QUART} ${delay}ms forwards`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero — Portfolio Preview (visual anchor)
   ───────────────────────────────────────────── */

function AllocationBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold w-10 shrink-0 tabular-nums text-foreground/70">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-border/60 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div
      className="relative w-full max-w-sm mx-auto md:mx-0"
      style={{ opacity: 0, animation: `fade-up 800ms ${EASE_OUT_QUART} 350ms forwards` }}
    >
      {/* Back card — peeking out */}
      <div
        className="absolute top-4 -left-3 right-3 bottom-0 rounded-2xl"
        style={{
          background: "oklch(0.96 0.03 168)",
          transform: "rotate(-3deg)",
          boxShadow: "0 2px 16px oklch(0.55 0.08 168 / 0.06)",
        }}
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative rounded-2xl p-6 space-y-5"
        style={{
          background: "oklch(1 0 0)",
          boxShadow:
            "0 1px 2px oklch(0 0 0 / 0.04), 0 8px 32px oklch(0.55 0.08 168 / 0.10)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              큐레이션 전략
            </p>
            <p className="text-base font-bold mt-0.5">글로벌 성장</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.93 0.06 168)",
              color: "oklch(0.35 0.12 168)",
            }}
          >
            <TrendingUp className="size-3" />
            +18.4%
          </div>
        </div>

        {/* Allocation bars */}
        <div className="space-y-2.5">
          <AllocationBar label="QQQ" pct={40} color="oklch(0.55 0.15 168)" />
          <AllocationBar label="SOXX" pct={25} color="oklch(0.65 0.18 145)" />
          <AllocationBar label="SKYY" pct={20} color="oklch(0.6 0.12 200)" />
          <AllocationBar label="BND" pct={15} color="oklch(0.75 0.15 90)" />
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="size-3" />
              리스크 중간
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="size-3" />
              월간 리밸런싱
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 480,
            height: 480,
            right: -80,
            top: -120,
            background: "oklch(0.55 0.15 168 / 0.06)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            right: 120,
            top: 200,
            background: "oklch(0.65 0.12 155 / 0.08)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          {/* Left — text */}
          <div>
            <HeroItem delay={0}>
              <Badge variant="secondary" className="gap-1.5">
                <TrendingUp className="size-3" />
                2026 리밸런싱 완료!
              </Badge>
            </HeroItem>

            <HeroItem delay={80}>
              <h1
                className="mt-6 font-extrabold tracking-tight leading-[1.15]"
                style={{
                  fontSize: "clamp(2.25rem, 5vw + 0.5rem, 3.75rem)",
                }}
              >
                ETF 투자,
                <br className="hidden sm:block" /> 쉽고 재밌게
                <br className="hidden sm:block" /> 시작해볼까요?
              </h1>
            </HeroItem>

            <HeroItem delay={160} className="max-w-lg">
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                전문가가 골라준 전략으로 글로벌 ETF 포트폴리오를 자동으로 만들고
                관리해드려요
              </p>
            </HeroItem>

            <HeroItem delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full px-8">
                  포트폴리오 만들기
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full gap-2"
                >
                  전략 구경하기
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </HeroItem>

            <HeroItem delay={400}>
              <div
                className="mt-14 inline-flex flex-wrap gap-6 rounded-2xl px-6 py-5"
                style={{
                  background: "oklch(0.97 0.012 168)",
                  boxShadow: "inset 0 0 0 1px oklch(0.92 0.02 168)",
                }}
              >
                <div className="text-center min-w-[5rem]">
                  <p className="text-xl font-bold tabular-nums text-foreground">
                    2,400+
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    분석 ETF 종목
                  </p>
                </div>
                <div
                  className="w-px self-stretch"
                  style={{ background: "oklch(0.90 0.02 168)" }}
                  aria-hidden="true"
                />
                <div className="text-center min-w-[5rem]">
                  <p className="text-xl font-bold tabular-nums text-foreground">
                    ₩3.2조
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    총 운용 규모
                  </p>
                </div>
                <div
                  className="w-px self-stretch"
                  style={{ background: "oklch(0.90 0.02 168)" }}
                  aria-hidden="true"
                />
                <div className="text-center min-w-[5rem]">
                  <p className="text-xl font-bold tabular-nums text-foreground">
                    12.4%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    평균 연수익률
                    <span className="block text-[10px] text-muted-foreground/70">
                      최근 3년 기준
                    </span>
                  </p>
                </div>
              </div>
            </HeroItem>
          </div>

          {/* Right — portfolio preview */}
          <div className="hidden md:block">
            <PortfolioPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   How it works
   ───────────────────────────────────────────── */

const STEPS: {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}[] = [
  {
    num: "01",
    title: "시장을 읽어요",
    desc: "매크로 지표와 섹터 흐름을 꼼꼼히 분석해요",
    icon: LineChart,
    color: "oklch(0.45 0.14 168)",
    bgColor: "oklch(0.95 0.04 168)",
  },
  {
    num: "02",
    title: "ETF를 골라요",
    desc: "유동성, 비용, 추적오차까지 따져서 최적의 ETF를 찾아요",
    icon: BarChart3,
    color: "oklch(0.45 0.14 145)",
    bgColor: "oklch(0.95 0.04 145)",
  },
  {
    num: "03",
    title: "리스크를 관리해요",
    desc: "변동성과 상관관계를 고려해서 비중을 조절해요",
    icon: SlidersHorizontal,
    color: "oklch(0.45 0.10 200)",
    bgColor: "oklch(0.95 0.03 200)",
  },
];

function StepConnector() {
  return (
    <div
      className="hidden md:flex items-center justify-center"
      aria-hidden="true"
    >
      <ArrowRight
        className="size-5"
        style={{ color: "oklch(0.75 0.06 168)" }}
      />
    </div>
  );
}

function HowItWorks() {
  return (
    <section
      id="how"
      className="py-24"
      style={{ background: "oklch(0.97 0.012 168)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw + 0.25rem, 2.25rem)" }}
          >
            이렇게 3단계로 골라드려요
          </h2>
        </Reveal>

        {/* Steps with connectors: card → arrow → card → arrow → card */}
        <div className="mt-16 grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-stretch">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={i * 140} className="contents md:block">
                {/* Mobile: vertical connector */}
                {i > 0 && (
                  <div
                    className="flex md:hidden justify-center py-1"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      className="size-5 rotate-90"
                      style={{ color: "oklch(0.75 0.06 168)" }}
                    />
                  </div>
                )}

                {/* Step card */}
                <div
                  className="rounded-2xl p-6 h-full transition-shadow duration-300 hover:shadow-md"
                  style={{
                    background: "oklch(1 0 0)",
                    boxShadow: "0 1px 4px oklch(0 0 0 / 0.04)",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="inline-flex items-center justify-center size-11 rounded-xl"
                    style={{ background: step.bgColor }}
                  >
                    <Icon className="size-5" style={{ color: step.color }} />
                  </div>

                  <p
                    className="mt-4 text-xs font-bold tabular-nums"
                    style={{ color: step.color }}
                  >
                    STEP {step.num}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          }).reduce<ReactNode[]>((acc, card, i) => {
            if (i > 0) {
              acc.push(<StepConnector key={`conn-${i}`} />);
            }
            acc.push(card);
            return acc;
          }, [])}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Strategies
   ───────────────────────────────────────────── */

function TickerPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-background/60 text-foreground/80">
      {children}
    </span>
  );
}

function Strategies() {
  return (
    <section id="strategies" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw + 0.25rem, 2.25rem)" }}
          >
            나에게 맞는 전략은?
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {/* Featured — 테크 혁신 (공격형) */}
          <Reveal delay={80}>
            <div
              className="strategy-card rounded-2xl p-8 md:p-10"
              style={{ background: "oklch(0.96 0.035 150)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold">테크 혁신</h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: "oklch(0.90 0.08 85)",
                        color: "oklch(0.38 0.10 85)",
                      }}
                    >
                      공격형
                    </span>
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    AI·반도체·클라우드 중심의 글로벌 성장 테마예요
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <TickerPill>QQQ</TickerPill>
                    <TickerPill>SOXX</TickerPill>
                    <TickerPill>SKYY</TickerPill>
                  </div>
                </div>
                <div className="md:text-right shrink-0 flex flex-col items-start md:items-end gap-3">
                  <div>
                    <p className="text-2xl font-bold text-primary tabular-nums">
                      +18.4%
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      올해 수익률
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    이 전략으로 시작하기
                    <ArrowRight className="size-4 card-arrow" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Two side-by-side */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* 배당 인컴 (안정형) */}
            <Reveal delay={180}>
              <div
                className="strategy-card rounded-2xl p-8 h-full flex flex-col"
                style={{ background: "oklch(0.96 0.025 205)" }}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">배당 인컴</h3>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.88 0.06 220)",
                      color: "oklch(0.38 0.08 220)",
                    }}
                  >
                    안정형
                  </span>
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  고배당 우량주 기반으로 매달 현금흐름을 만들어요
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TickerPill>SCHD</TickerPill>
                  <TickerPill>VYM</TickerPill>
                  <TickerPill>JEPI</TickerPill>
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary tabular-nums">
                      +9.2%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      올해 수익률
                    </span>
                  </div>
                  <ArrowRight
                    className="size-4 card-arrow text-primary"
                  />
                </div>
              </div>
            </Reveal>

            {/* 글로벌 분산 (균형형) */}
            <Reveal delay={280}>
              <div
                className="strategy-card rounded-2xl p-8 h-full flex flex-col"
                style={{ background: "oklch(0.96 0.03 168)" }}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">글로벌 분산</h3>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.88 0.07 168)",
                      color: "oklch(0.33 0.09 168)",
                    }}
                  >
                    균형형
                  </span>
                </div>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  선진국·신흥국 골고루 담은 올웨더 포트폴리오예요
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TickerPill>VT</TickerPill>
                  <TickerPill>VXUS</TickerPill>
                  <TickerPill>BND</TickerPill>
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary tabular-nums">
                      +12.7%
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      올해 수익률
                    </span>
                  </div>
                  <ArrowRight
                    className="size-4 card-arrow text-primary"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────── */

function CtaSection() {
  return (
    <section id="start" className="py-24 relative overflow-hidden">
      {/* Background with stronger teal */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "oklch(0.94 0.04 168)" }}
      />
      {/* Decorative circle */}
      <div
        className="absolute -z-10 rounded-full"
        style={{
          width: 400,
          height: 400,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "oklch(0.55 0.15 168 / 0.06)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto px-6 text-center">
        <Reveal>
          {/* Time promise — promoted to hero element */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "oklch(1 0 0)",
              color: "oklch(0.35 0.12 168)",
              boxShadow: "0 1px 8px oklch(0.55 0.08 168 / 0.12)",
            }}
          >
            <span
              className="inline-flex items-center justify-center size-6 rounded-full text-xs font-bold text-white"
              style={{ background: "oklch(0.55 0.15 168)" }}
            >
              3
            </span>
            분이면 포트폴리오 완성
          </div>

          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 2.5rem)" }}
          >
            글로벌 ETF 투자,
            <br />
            같이 시작해봐요!
          </h2>

          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            투자 성향에 맞는 전략을 고르고, 자동으로 포트폴리오를
            <br className="hidden sm:block" />
            구성해드려요. 리밸런싱까지 알아서 관리해요
          </p>

          <div className="mt-8">
            <Button size="lg" className="rounded-full px-10 text-base">
              무료로 시작하기
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="size-3.5" />
              카드 등록 없이 시작
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5" />
              가입 후 바로 전략 확인
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-12 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="text-sm font-bold tracking-tight">
          Curate<span className="text-primary">ETF</span>
        </a>
        <p className="text-xs text-muted-foreground">
          © 2026 CurateETF. 투자에는 원금 손실의 위험이 있습니다.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   App
   ───────────────────────────────────────────── */

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Strategies />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
