<!-- AGENTS.md - AI 코딩 에이전트 가이드 -->
<!-- Last updated: 2026-03-23 -->

# AGENTS.md

## 프로젝트 개요

<!-- Auto-generated: begin -->
Impeccable 디자인 시스템을 AI 어시스턴트와 함께 학습하는 워크샵 프로젝트. ETF 큐레이션 웹서비스 UI를 설계하는 실습을 통해 AI 에이전트에게 디자인 판단력을 부여하는 방법을 탐구한다.

모노레포 구조로, 루트에는 워크샵 문서가 있고 `app/` 디렉토리에 React 애플리케이션이 위치한다.
<!-- Auto-generated: end -->

## 기술 스택

<!-- Auto-generated: begin -->
| 카테고리 | 기술 | 버전 |
|----------|------|------|
| 언어 | TypeScript | 5.9.x |
| UI 프레임워크 | React | 19.2.x |
| 빌드 도구 | Vite | 8.x |
| CSS 프레임워크 | Tailwind CSS v4 | 4.2.x |
| 컴포넌트 라이브러리 | shadcn/ui (new-york 스타일) | - |
| 접근성 프리미티브 | Radix UI | 1.4.x |
| 아이콘 | Lucide React | 0.577.x |
| 변형 유틸리티 | class-variance-authority (CVA) | 0.7.x |
| 클래스 병합 | clsx + tailwind-merge | - |
| 린터 | ESLint | 9.x |
| 패키지 매니저 | npm | - |
<!-- Auto-generated: end -->

## 디렉토리 구조

<!-- Auto-generated: begin -->
```
impeccable-workshop/
├── AGENTS.md                          # 이 파일
├── etf-curation-design-workshop.md    # 워크샵 문서
└── app/                               # React 애플리케이션
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── eslint.config.js
    ├── components.json                # shadcn/ui 설정
    ├── index.html
    ├── public/
    └── src/
        ├── main.tsx                   # 진입점
        ├── App.tsx                    # 루트 컴포넌트
        ├── index.css                  # Tailwind v4 테마 변수 (OKLCH)
        ├── components/
        │   └── ui/                    # shadcn/ui 컴포넌트
        │       ├── button.tsx
        │       ├── badge.tsx
        │       ├── card.tsx
        │       └── separator.tsx
        └── lib/
            └── utils.ts               # cn() 유틸리티
```
<!-- Auto-generated: end -->

## 빌드 및 명령어

<!-- Auto-generated: begin -->
모든 명령어는 `app/` 디렉토리에서 실행한다.

```bash
cd app

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드 (TypeScript 컴파일 후 Vite 빌드)
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run build` | `tsc -b && vite build` |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
<!-- Auto-generated: end -->

## 경로 별칭

<!-- Auto-generated: begin -->
`@` 는 `app/src/` 를 가리킨다. 임포트 시 반드시 절대 경로 별칭을 사용한다.

```ts
// 올바름
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// 사용하지 않음
import { cn } from "../../lib/utils"
```
<!-- Auto-generated: end -->

## 코드 스타일 및 컨벤션

<!-- Auto-generated: begin -->
### TypeScript

- 모든 소스 파일은 `.ts` 또는 `.tsx` 확장자를 사용한다.
- `any` 타입 사용을 지양하고 명시적 타입을 작성한다.
- 컴포넌트 props는 `React.ComponentProps<"element">` 확장을 우선 활용한다.

### 컴포넌트 작성 규칙

shadcn/ui new-york 스타일을 따른다. 새 컴포넌트 추가 시 아래 패턴을 준수한다.

1. **CVA로 변형 정의**: `cva()`를 사용해 `variant`와 `size` 등의 변형을 선언한다.
2. **`cn()` 으로 클래스 병합**: 조건부 클래스 결합 시 항상 `cn()` 을 사용한다.
3. **Radix UI 프리미티브 활용**: 접근성이 필요한 인터랙션에는 Radix UI를 사용한다.
4. **`asChild` 패턴**: `Slot.Root` 를 통해 다형성 컴포넌트를 구현한다.
5. **`data-slot` 속성**: 컴포넌트 루트 요소에 `data-slot="component-name"` 을 붙인다.

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const exampleVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Example({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof exampleVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="example"
      className={cn(exampleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Example, exampleVariants }
```

### Tailwind CSS v4 테마 (OKLCH)

색상 테마는 `app/src/index.css` 의 `@theme inline` 블록에서 OKLCH 색 공간으로 정의한다. 하드코딩된 색상값 대신 반드시 테마 변수를 사용한다.

```css
/* 올바름 */
bg-primary text-primary-foreground

/* 사용하지 않음 */
bg-[oklch(0.205_0.006_285.885)]
```

다크 모드는 `.dark` 클래스 기반으로 동작한다 (`@custom-variant dark (&:is(.dark *))`).

### ESLint 규칙

- `@typescript-eslint/recommended` 규칙 적용
- `eslint-plugin-react-hooks` 훅 규칙 준수
- `eslint-plugin-react-refresh` Fast Refresh 호환성 유지
- 대상 파일: `**/*.{ts,tsx}`
<!-- Auto-generated: end -->

## 보안 고려사항

<!-- Auto-generated: begin -->
### 환경 변수

환경 변수 파일(`.env`, `.env.local`)은 커밋하지 않는다. Vite 환경에서 클라이언트에 노출되는 변수는 반드시 `VITE_` 접두사를 붙인다.

### 민감한 파일

- `node_modules/` — 커밋 금지
- `dist/` — 빌드 산출물, 커밋 금지
- `.env*` — 환경 설정 파일, 커밋 금지
<!-- Auto-generated: end -->

## AI 에이전트를 위한 추가 지침

<!-- Manual section - preserved on update -->

이 프로젝트는 Impeccable 디자인 시스템 학습을 목적으로 한다. UI 작업 시 아래 원칙을 따른다.

- "AI Slop" 패턴(보라색 그라데이션, 과도하게 둥근 카드, 공허한 헤드라인)을 피한다.
- 금융 서비스 도메인에 맞는 신뢰감 있고 전문적인 시각 언어를 사용한다.
- 컴포넌트 추가 시 `npx shadcn@latest add <component>` 를 `app/` 디렉토리에서 실행한다.
- 워크샵 문서(`etf-curation-design-workshop.md`)를 참고해 디자인 의사결정의 맥락을 파악한다.

<!-- End manual section -->
