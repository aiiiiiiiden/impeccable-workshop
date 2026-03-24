import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Sparkles,
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
    emoji: "🚀",
    tag: "공격형",
    ytd: "+18.4%",
    desc: "AI·반도체·클라우드 중심의 글로벌 성장 테마예요",
    etfs: ["QQQ", "SOXX", "SKYY"],
    color: "from-orange-100 to-amber-50",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    name: "배당 인컴",
    emoji: "💰",
    tag: "안정형",
    ytd: "+9.2%",
    desc: "고배당 우량주 기반으로 매달 현금흐름을 만들어요",
    etfs: ["SCHD", "VYM", "JEPI"],
    color: "from-sky-100 to-blue-50",
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    name: "글로벌 분산",
    emoji: "🌍",
    tag: "균형형",
    ytd: "+12.7%",
    desc: "선진국·신흥국 골고루 담은 올웨더 포트폴리오예요",
    etfs: ["VT", "VXUS", "BND"],
    color: "from-violet-100 to-purple-50",
    tagColor: "bg-violet-100 text-violet-700",
  },
];

const processSteps = [
  {
    icon: BarChart3,
    emoji: "📊",
    title: "시장을 읽어요",
    desc: "매크로 지표와 섹터 흐름을 꼼꼼히 분석해요",
  },
  {
    icon: Filter,
    emoji: "🔍",
    title: "ETF를 골라요",
    desc: "유동성, 비용, 추적오차까지 따져서 최적의 ETF를 찾아요",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "리스크를 관리해요",
    desc: "변동성과 상관관계를 고려해서 비중을 조절해요",
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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              CurateETF
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
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
          <Button size="sm" className="hidden md:inline-flex rounded-full px-5 shadow-sm">
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
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-orange-200/40 blur-[100px]" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-[100px]" />
          <div className="absolute bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-violet-200/25 blur-[100px]" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-16"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <Sparkles className="size-4" />
              2026 리밸런싱 완료!
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            ETF 투자,
            <br />
            <span className="text-primary">쉽고 재밌게</span>
            <br />
            시작해볼까요?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            전문가가 골라준 전략으로 글로벌 ETF 포트폴리오를
            <br className="hidden sm:block" />
            자동으로 만들고 관리해드려요
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="text-base px-8 gap-2 group rounded-full shadow-md shadow-primary/20">
              포트폴리오 만들기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" className="text-base text-muted-foreground rounded-full">
              전략 구경하기
            </Button>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            variants={fadeUp}
            className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { value: "2,400+", label: "큐레이션 ETF" },
              { value: "₩3.2조", label: "운용 규모" },
              { value: "12.4%", label: "평균 연수익률" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ━━ Process ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="process" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              이렇게 3단계로 골라드려요
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
                className="group relative p-8 rounded-3xl border border-border/60 bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-5">{step.emoji}</div>
                <div className="text-sm font-bold text-primary mb-2">
                  Step {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Strategies ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="strategies" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              Curated strategies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              나에게 맞는 전략은?
            </h2>
          </motion.div>

          <div className="space-y-5">
            {strategies.map((s, i) => (
              <motion.div
                key={s.name}
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-3xl border border-border/60 overflow-hidden bg-gradient-to-r ${s.color} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer`}
              >
                <div className="relative p-8 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{s.emoji}</span>
                      <h3 className="text-xl font-bold">{s.name}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${s.tagColor}`}>
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>

                  <div className="flex items-center gap-8 md:gap-12">
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold mb-1">
                        구성 ETF
                      </div>
                      <div className="flex gap-1.5">
                        {s.etfs.map((etf) => (
                          <span
                            key={etf}
                            className="px-2.5 py-1 rounded-lg bg-card text-foreground text-xs font-bold shadow-sm border border-border/50"
                          >
                            {etf}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground font-semibold mb-1">
                        YTD
                      </div>
                      <div className="text-2xl font-extrabold text-primary">
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
      <section id="cta" className="py-28 px-6">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full bg-primary/8 blur-[100px]" />
            <div className="relative bg-card rounded-[2rem] p-12 sm:p-16 border border-border/60 shadow-sm">
              <Globe className="size-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
                글로벌 ETF 투자,
                <br />
                같이 시작해봐요!
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
                3분이면 나만의 포트폴리오를 만들 수 있어요
              </p>
              <Button size="lg" className="text-base px-10 gap-2 group rounded-full shadow-md shadow-primary/20">
                무료로 시작하기
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="border-t border-border/60 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <TrendingUp className="size-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold">CurateETF</span>
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
