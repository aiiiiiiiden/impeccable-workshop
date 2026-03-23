import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          ETF Curation
        </h1>
        <p className="text-muted-foreground">
          워크샵 프로젝트 준비 완료
        </p>
        <Button>시작하기</Button>
      </div>
    </div>
  );
}

export default App;
