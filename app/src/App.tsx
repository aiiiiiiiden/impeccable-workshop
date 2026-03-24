import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Globe,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ─── Strategy data ───────────────────────────────── */

const strategies = [
  {
    name: "테크 혁신",
    tag: "공격형",
    ytd: "+18.4%",
    desc: "AI·반도체·클라우드 중심 글로벌 성장 테마",
    etfs: ["QQQ", "SOXX", "SKYY"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    name: "배당 인컴",
    tag: "안정형",
    ytd: "+9.2%",
    desc: "고배당 우량주 기반 월배당 현금흐름 전략",
    etfs: ["SCHD", "VYM", "JEPI"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "글로벌 분산",
    tag: "균형형",
    ytd: "+12.7%",
    desc: "선진국·신흥국 균형 배분 올웨더 포트폴리오",
    etfs: ["VT", "VXUS", "BND"],
    color: "from-violet-500/20 to-violet-500/5",
  },
];

const processSteps = [
  {
    icon: BarChart3,
    title: "시장 분석",
    desc: "매크로 지표와 섹터 모멘텀을 정량 분석합니다",
  },
  {
    icon: Filter,
    title: "ETF 필터링",
    desc: "유동성, 비용, 추적오차 기준으로 최적 ETF를 선별합니다",
  },
  {
    icon: Shield,
    title: "리스크 관리",
    desc: "변동성과 상관관계를 고려해 비중을 최적화합니다",
  },
];

/* ─── Component ───────────────────────────────────── */

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-hidden">
      {/* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              CurateETF
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#process" className="hover:text-foreground transition">
              큐레이션
            </a>
            <a href="#strategies" className="hover:text-foreground transition">
              전략
            </a>
            <a href="#cta" className="hover:text-foreground transition">
              시작하기
            </a>
          </nav>
          <Button size="sm" className="hidden md:inline-flex">
            무료로 시작
          </Button>
        </div>
      </header>

      {/* ━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-svh flex items-center justify-center"
      >
        {/* Background grid + glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-16"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide mb-8">
              <Zap className="size-3" />
              2026 리밸런싱 완료
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            ETF 투자,
            <br />
            <span className="text-primary">큐레이션</span>으로
            <br />
            더 쉽게
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            전문가가 선별한 전략으로 글로벌 ETF 포트폴리오를
            <br className="hidden sm:block" />
            자동으로 구성하고 관리하세요
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="text-base px-8 gap-2 group">
              포트폴리오 만들기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" className="text-base text-muted-foreground">
              전략 둘러보기
            </Button>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            variants={fadeUp}
            className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: "2,400+", label: "큐레이션 ETF" },
              { value: "₩3.2조", label: "운용 규모" },
              { value: "12.4%", label: "평균 연수익률" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ━━ Process ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              체계적인 3단계 큐레이션
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12 }}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="size-5 text-primary" />
                </div>
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Strategies ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="strategies" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              Curated strategies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
              목표에 맞는 전략을 선택하세요
            </h2>
          </motion.div>

          <div className="space-y-4">
            {strategies.map((s, i) => (
              <motion.div
                key={s.name}
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative p-8 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{s.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>

                  <div className="flex items-center gap-8 md:gap-12">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        구성 ETF
                      </div>
                      <div className="flex gap-1.5">
                        {s.etfs.map((etf) => (
                          <span
                            key={etf}
                            className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-mono"
                          >
                            {etf}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        YTD
                      </div>
                      <div className="text-2xl font-bold font-mono text-primary">
                        {s.ytd}
                      </div>
                    </div>
                    <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all hidden md:block" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Final CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cta" className="py-32 px-6">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full bg-primary/6 blur-[100px]" />
            <div className="relative">
              <Globe className="size-12 text-primary/40 mx-auto mb-8" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                글로벌 ETF 투자,
                <br />
                지금 시작하세요
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
                3분 안에 나만의 큐레이션 포트폴리오를 만들 수 있습니다
              </p>
              <Button size="lg" className="text-base px-10 gap-2 group">
                무료로 시작하기
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-primary flex items-center justify-center">
              <TrendingUp className="size-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">CurateETF</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 CurateETF. 투자에는 원금 손실의 위험이 있습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
