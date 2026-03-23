# Impeccable Workshop

Impeccable 디자인 시스템을 AI 어시스턴트와 함께 학습하는 워크샵 프로젝트. ETF 큐레이션 서비스 UI를 주제로 디자인 원칙을 실습한다.

## 빌드 및 실행

앱은 `app/` 디렉토리에 위치한다. 모든 명령어는 `app/` 안에서 실행한다.

```bash
cd app
npm run dev      # 개발 서버 (HMR)
npm run build    # 타입 체크 후 프로덕션 빌드
npm run lint     # ESLint
npm run preview  # 프로덕션 빌드 미리보기
```

## 코드 컨벤션

**TypeScript**
- strict mode 사용
- 경로 별칭: `@/` → `./src` (예: `import { cn } from "@/lib/utils"`)

**컴포넌트**
- shadcn/ui new-york 스타일 기준
- CVA(`class-variance-authority`)로 variants 정의
- 클래스 병합은 항상 `cn()` 유틸리티 사용 (`@/lib/utils`)
- UI 컴포넌트 위치: `app/src/components/ui/`
- shadcn/ui 컴포넌트 추가: `app/` 디렉토리에서 `npx shadcn@latest add <component>`

**스타일**
- Tailwind CSS v4 사용 — `tailwind.config.js` 파일 없음
- 모든 설정은 `app/src/index.css`에서 CSS 기반으로 관리
- 색상 시스템은 OKLCH 색상 공간 사용

**아이콘**
- Lucide React (`lucide-react`)

## 커밋 규칙

Conventional Commits 형식을 따른다. 메시지는 한국어도 허용한다.

```
feat: 새로운 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 스타일 변경 (기능 무관)
refactor: 리팩토링
chore: 빌드, 설정 등 기타 변경
```

## 주의사항

- Tailwind CSS v4는 `tailwind.config.js`를 사용하지 않는다. 테마 커스터마이징은 `app/src/index.css`의 `@theme` 블록에서 한다.
- shadcn/ui 설정은 `app/components.json`에서 관리한다.
