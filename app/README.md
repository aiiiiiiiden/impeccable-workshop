# Impeccable Workshop

Impeccable 디자인 시스템을 AI 어시스턴트와 함께 학습하는 워크샵 프로젝트. ETF 큐레이션 서비스 UI를 주제로 디자인 원칙을 실습한다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19.2, TypeScript 5.9 |
| 빌드 도구 | Vite 8 |
| 스타일링 | Tailwind CSS v4 (OKLCH 색공간) |
| UI 컴포넌트 | shadcn/ui (new-york 스타일), Radix UI |
| 아이콘 | Lucide React |
| 유틸리티 | CVA (class-variance-authority) |

## 시작하기

### 설치

```bash
cd app
npm install
```

### 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속한다.

## 프로젝트 구조

```
app/
├── src/
│   ├── components/ui/   # shadcn/ui 컴포넌트 (Button, Card, Badge, Separator)
│   ├── lib/utils.ts     # cn() 유틸리티
│   ├── App.tsx          # 루트 컴포넌트
│   ├── main.tsx         # 엔트리 포인트
│   └── index.css        # 글로벌 스타일 & 테마 변수
├── components.json      # shadcn/ui 설정
├── vite.config.ts
├── tsconfig.json
└── package.json
```

경로 별칭 `@` 은 `./src` 로 매핑된다.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (HMR) |
| `npm run build` | TypeScript 체크 후 프로덕션 빌드 |
| `npm run lint` | ESLint 실행 |
| `npm run preview` | 프로덕션 빌드 미리보기 |

## 컴포넌트

shadcn/ui 컴포넌트는 `src/components/ui/` 에 위치한다. 새 컴포넌트를 추가하려면 다음 명령을 사용한다.

```bash
npx shadcn@latest add <컴포넌트명>
```

현재 포함된 컴포넌트:

- **Button** — 기본 버튼, variant 및 size 지원
- **Card** — 카드 레이아웃 컨테이너
- **Badge** — 상태 및 레이블 표시
- **Separator** — 구분선
