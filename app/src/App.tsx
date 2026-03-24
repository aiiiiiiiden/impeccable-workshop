import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Globe,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Target,
  Sparkles,
} from "lucide-react";

const CURATED_ETFS = [
  {
    name: "AI & 반도체 성장",
    ticker: "SOXX / SMH / ARKQ",
    returnYtd: "+18.4%",
    risk: "중간",
    category: "테크",
    description: "AI 인프라와 반도체 밸류체인에 집중 투자",
  },
  {
    name: "글로벌 배당 인컴",
    ticker: "SCHD / VYM / HDV",
    returnYtd: "+9.2%",
    risk: "낮음",
    category: "배당",
    description: "안정적 현금흐름을 위한 고배당 ETF 조합",
  },
  {
    name: "신흥국 성장 기회",
    ticker: "VWO / EEM / INDA",
    returnYtd: "+12.7%",
    risk: "높음",
    category: "신흥국",
    description: "인도, 동남아 중심 신흥시장 성장 포착",
  },
  {
    name: "채권 안정 포트폴리오",
    ticker: "BND / TLT / TIPS",
    returnYtd: "+4.1%",
    risk: "낮음",
    category: "채권",
    description: "금리 사이클을 고려한 채권 분산 전략",
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "목표 기반 큐레이션",
    description: "투자 목표와 리스크 성향에 맞는 ETF 포트폴리오를 자동 구성합니다.",
  },
  {
    icon: BarChart3,
    title: "리밸런싱 알림",
    description:
      "시장 변동에 따른 최적 리밸런싱 시점을 알려드립니다.",
  },
  {
    icon: Shield,
    title: "리스크 모니터링",
    description: "포트폴리오 리스크를 실시간 추적하고 위험 신호를 감지합니다.",
  },
  {
    icon: Globe,
    title: "글로벌 커버리지",
    description: "미국, 유럽, 아시아 등 전 세계 ETF를 하나의 플랫폼에서 관리합니다.",
  },
];

const STATS = [
  { value: "2,400+", label: "분석 ETF" },
  { value: "15만+", label: "활성 사용자" },
  { value: "23.6%", label: "평균 연수익률" },
  { value: "4.8", label: "앱스토어 평점" },
];

function RiskBadge({ risk }: { risk: string }) {
  const variant =
    risk === "낮음" ? "secondary" : risk === "중간" ? "outline" : "destructive";
  return <Badge variant={variant}>{risk}</Badge>;
}

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Layers className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              ETF Curate
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              기능
            </a>
            <a href="#portfolios" className="text-muted-foreground hover:text-foreground transition-colors">
              포트폴리오
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              요금제
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
            <Button size="sm">무료 시작</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.05,transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="mr-1 size-3" />
              2026년 상반기 포트폴리오 업데이트
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              당신에게 딱 맞는
              <br />
              <span className="text-primary">ETF 포트폴리오</span>를 찾으세요
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              수천 개의 ETF 중에서 투자 목표, 리스크 성향, 시장 상황을 고려한
              최적의 조합을 큐레이션합니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                무료로 포트폴리오 진단받기
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                큐레이션 둘러보기
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Zap className="mr-1 size-3" />
            핵심 기능
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            스마트한 ETF 투자의 시작
          </h2>
          <p className="mt-4 text-muted-foreground">
            데이터 기반 분석과 전문가 인사이트를 결합한 큐레이션 엔진
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Curated Portfolios */}
      <section
        id="portfolios"
        className="mx-auto max-w-6xl px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <TrendingUp className="mr-1 size-3" />
            큐레이션 포트폴리오
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            전문가가 엄선한 ETF 조합
          </h2>
          <p className="mt-4 text-muted-foreground">
            시장 분석과 퀀트 모델을 기반으로 매월 업데이트되는 포트폴리오
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CURATED_ETFS.map((etf) => (
            <Card
              key={etf.name}
              className="group cursor-pointer transition-all hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{etf.category}</Badge>
                  <RiskBadge risk={etf.risk} />
                </div>
                <CardTitle className="mt-2 text-xl">{etf.name}</CardTitle>
                <CardDescription>{etf.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">구성 ETF</div>
                    <div className="mt-1 font-mono text-sm">{etf.ticker}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">YTD 수익률</div>
                    <div className="mt-1 text-lg font-bold text-green-600">
                      {etf.returnYtd}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            전체 포트폴리오 보기
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </section>

      <Separator />

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            심플한 요금제
          </h2>
          <p className="mt-4 text-muted-foreground">
            무료로 시작하고, 필요할 때 업그레이드하세요
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
          {/* Free */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>ETF 투자를 시작하는 분</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">0</span>
                <span className="text-muted-foreground">원/월</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>기본 큐레이션 3개</div>
              <div>주간 시장 리포트</div>
              <div>기본 리스크 분석</div>
              <Button variant="outline" className="mt-4 w-full">
                무료 시작
              </Button>
            </CardContent>
          </Card>
          {/* Pro */}
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Pro</CardTitle>
                <Badge>인기</Badge>
              </div>
              <CardDescription>적극적으로 투자하는 분</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">9,900</span>
                <span className="text-muted-foreground">원/월</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>전체 큐레이션 무제한</div>
              <div>실시간 리밸런싱 알림</div>
              <div>고급 리스크 분석</div>
              <div>맞춤 포트폴리오 생성</div>
              <Button className="mt-4 w-full">Pro 시작하기</Button>
            </CardContent>
          </Card>
          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>투자 동호회 및 팀</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">29,900</span>
                <span className="text-muted-foreground">원/월</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>Pro의 모든 기능</div>
              <div>팀 포트폴리오 공유</div>
              <div>API 액세스</div>
              <div>전담 매니저</div>
              <Button variant="outline" className="mt-4 w-full">
                문의하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            3분 안에 나만의 ETF 포트폴리오를 받아보세요.
            <br />
            신용카드 없이 무료로 시작할 수 있습니다.
          </p>
          <Button size="lg" className="mt-8 gap-2">
            무료 포트폴리오 진단
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Layers className="size-4" />
            <span className="font-semibold text-foreground">ETF Curate</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              고객센터
            </a>
          </div>
          <div>&copy; 2026 ETF Curate. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
