# CurateETF Technical Audit Report

## Anti-Patterns Verdict: PASS

AI slop 징후 없음. 이전 `/critique`에서도 통과했으며, 이후 `/bolder`, `/delight`, `/animate`, `/arrange` 적용 과정에서도 AI 안티패턴(글래스모피즘, 네온 그래디언트, 바운스 이징 등)이 도입되지 않았음.

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 4 |
| Medium | 5 |
| Low | 4 |
| **Total** | **15** |

**Top 3 Critical/High Issues:**
1. 전략 카드가 `<div>`로 구현되어 키보드/스크린리더 접근 불가
2. 모바일 네비게이션 부재 (햄버거 메뉴 없음)
3. 다수의 인라인 하드코딩 OKLCH 색상이 디자인 토큰과 불일치

**Overall**: 시각적 품질은 높으나, 접근성과 테마 일관성에 구조적 개선이 필요함.

---

## Detailed Findings by Severity

### Critical Issues

#### C-1. 전략 카드가 인터랙티브하지만 시맨틱하지 않음

- **Location**: `App.tsx:525`, `574`, `616` — `.strategy-card` div 요소들
- **Category**: Accessibility
- **Description**: `cursor: pointer`, hover lift, CTA 텍스트("이 전략으로 시작하기")가 있으나 `<div>`로 구현됨. `role`, `tabindex`, `onClick`, 키보드 이벤트 핸들러 없음.
- **Impact**: 키보드 사용자가 전략 카드에 도달/활성화 불가. 스크린리더가 인터랙티브 요소로 인식하지 못함.
- **WCAG**: 2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A)
- **Recommendation**: 카드를 `<a href="...">` 또는 `<button>`으로 감싸거나, 최소한 `role="link"`, `tabIndex={0}`, `onKeyDown` 핸들러 추가. 이상적으로는 카드 전체를 `<a>` 태그로 변경.
- **Suggested command**: `/harden`

#### C-2. 모바일 네비게이션 부재

- **Location**: `App.tsx:73` — `hidden md:flex`
- **Category**: Responsive / Accessibility
- **Description**: 데스크탑 nav 링크가 `hidden md:flex`로 모바일에서 숨겨지나, 대체 모바일 메뉴(햄버거)가 없음. 모바일 사용자는 헤더의 "무료로 시작" 버튼만 접근 가능.
- **Impact**: 모바일 사용자(전체 트래픽의 60-70% 추정)가 "큐레이션", "전략", "시작하기" 섹션으로 직접 내비게이션 불가.
- **WCAG**: 2.4.5 Multiple Ways (AA)
- **Recommendation**: 모바일용 햄버거 메뉴 또는 바텀 시트 내비게이션 추가.
- **Suggested command**: `/adapt`

---

### High-Severity Issues

#### H-1. 하드코딩된 인라인 OKLCH 색상 다수

- **Location**: `App.tsx` 전역 — 약 30개 이상의 인라인 `style={{ background: "oklch(...)" }}`
- **Category**: Theming
- **Description**: `index.css`에 디자인 토큰(`--color-primary` 등)이 정의되어 있으나, 컴포넌트에서 대부분 인라인 스타일로 OKLCH 값을 직접 사용. 예: `oklch(0.96 0.035 150)`, `oklch(0.90 0.08 85)`, `oklch(0.93 0.06 168)` 등.
- **Impact**: 테마 변경 시 모든 인라인 값을 일일이 수정해야 함. 색상 일관성 보장 불가. 디자인 토큰의 목적이 무력화됨.
- **Recommendation**: 반복되는 색상을 CSS 커스텀 프로퍼티로 추출. 전략 카드 배경, 뱃지 색상 등을 시맨틱 토큰으로 정의.
- **Suggested command**: `/normalize`

#### H-2. `--color-destructive-foreground` 토큰 버그

- **Location**: `index.css:32`
- **Category**: Theming
- **Description**: `--color-destructive: oklch(0.577 0.245 27.325)`과 `--color-destructive-foreground: oklch(0.577 0.245 27.325)`이 동일한 값. foreground는 destructive 배경 위의 텍스트 색상이어야 하므로 흰색(`oklch(0.985 0 0)`)이어야 함.
- **Impact**: destructive 버튼 사용 시 텍스트가 배경과 동일 색상이 되어 읽을 수 없음. 현재 button.tsx에서 `text-white`로 하드코딩되어 우회되고 있으나, 토큰 기반 컴포넌트에서는 문제 발생.
- **Recommendation**: `--color-destructive-foreground: oklch(0.985 0 0)` 으로 수정.
- **Suggested command**: `/normalize`

#### H-3. Skip Navigation 링크 부재

- **Location**: `App.tsx:769-781` — App 컴포넌트
- **Category**: Accessibility
- **Description**: 페이지 최상단에 "본문으로 건너뛰기" 링크 없음.
- **Impact**: 키보드/스크린리더 사용자가 매번 헤더 내비게이션을 탭해야 본문에 도달.
- **WCAG**: 2.4.1 Bypass Blocks (A)
- **Recommendation**: `<Header />` 앞에 시각적으로 숨겨지되 포커스 시 나타나는 skip link 추가.
- **Suggested command**: `/harden`

#### H-4. `Reveal` 컴포넌트의 `contents` 클래스 사용

- **Location**: `App.tsx:440` — `className="contents md:block"`
- **Category**: Accessibility
- **Description**: HowItWorks에서 `Reveal` 컴포넌트에 `display: contents`가 적용됨. `display: contents`는 일부 브라우저에서 접근성 트리에서 요소를 제거하여 ARIA 속성과 포커스 관리에 문제를 일으킬 수 있음.
- **Impact**: 특정 브라우저(특히 구형 Safari)에서 스크린리더가 Reveal 래퍼의 시맨틱 역할을 놓칠 수 있음.
- **Recommendation**: `contents` 대신 모바일에서는 `flex flex-col`, 데스크탑에서는 `block`으로 변경하거나, 그리드 레이아웃을 재구성하여 `contents` 의존 제거.
- **Suggested command**: `/harden`

---

### Medium-Severity Issues

#### M-1. 히어로 통계 컨테이너 모바일 오버플로 위험

- **Location**: `App.tsx:308-352` — 통계 `inline-flex` 컨테이너
- **Category**: Responsive
- **Description**: `inline-flex flex-wrap`이나, 각 항목이 `min-w-[5rem]`이고 구분선(divider)이 `self-stretch`로 세로 확장됨. 좁은 화면에서 wrap 시 세로 구분선이 의미 없어지고 레이아웃이 깨질 수 있음.
- **Impact**: 320px 뷰포트에서 구분선이 잘못된 위치에 나타나거나, 수평 스크롤 발생 가능.
- **Recommendation**: 모바일에서는 구분선을 숨기고 세로 스택으로 전환. 또는 `flex-wrap` 시 구분선을 조건부 렌더링.
- **Suggested command**: `/adapt`

#### M-2. IntersectionObserver 인스턴스 과다 생성

- **Location**: `App.tsx:30-36` — `Reveal` 컴포넌트
- **Category**: Performance
- **Description**: 각 `Reveal` 인스턴스가 독립적인 IntersectionObserver를 생성. 현재 페이지에 약 10개의 Reveal이 존재하여 10개의 옵저버 생성.
- **Impact**: 현재 수준에서는 성능 영향 미미하나, 페이지가 커지면 메모리/성능 부담 증가. 단일 옵저버가 다수 요소를 관찰하는 것이 더 효율적.
- **Recommendation**: 공유 IntersectionObserver 패턴(싱글턴 옵저버 + WeakMap 콜백)으로 리팩토링. 현재 규모에서는 우선순위 낮음.
- **Suggested command**: `/optimize`

#### M-3. 폰트 로딩 전략 미흡

- **Location**: `index.html:8-19`
- **Category**: Performance
- **Description**: 두 개의 외부 폰트(Pretendard, Plus Jakarta Sans)가 렌더 블로킹 방식으로 로드됨. Pretendard는 `rel="stylesheet"` + `as="style"` (비표준 조합), Plus Jakarta Sans는 기본 `rel="stylesheet"`.
- **Impact**: FOIT (Flash of Invisible Text) 또는 초기 렌더링 지연. Lighthouse LCP에 부정적 영향.
- **Recommendation**: `<link rel="preload" as="style">` + `onload` 패턴 또는 `font-display: swap` 확인. Pretendard의 `as="style"`은 `rel="preload"`와 함께 사용해야 의미가 있으므로 수정 필요.
- **Suggested command**: `/optimize`

#### M-4. AllocationBar에 접근 가능한 레이블 없음

- **Location**: `App.tsx:134-158` — `AllocationBar` 컴포넌트
- **Category**: Accessibility
- **Description**: 시각적으로는 레이블(QQQ 등)과 퍼센트가 표시되나, 프로그레스 바 역할의 `<div>`에 `role="progressbar"`, `aria-valuenow`, `aria-label`이 없음.
- **Impact**: 스크린리더 사용자가 포트폴리오 배분 시각화를 이해할 수 없음. 단, PortfolioPreview 자체가 장식적 요소일 수 있어 영향은 제한적.
- **WCAG**: 1.1.1 Non-text Content (A) — 장식적 요소라면 `aria-hidden`으로 마킹
- **Recommendation**: PortfolioPreview 전체를 `aria-hidden="true"`로 마킹(장식적이므로)하거나, 접근 가능하게 하려면 각 바에 `role="progressbar"` 추가.
- **Suggested command**: `/harden`

#### M-5. 장식 원(circle)의 고정 픽셀 위치

- **Location**: `App.tsx:239-257` — 히어로 장식 원, `App.tsx:675-685` — CTA 장식 원
- **Category**: Responsive
- **Description**: 장식 원들이 `right: -80`, `top: -120`, `width: 480` 등 고정 px 값으로 배치됨.
- **Impact**: 매우 넓은 화면(1920px+)에서 원이 콘텐츠와 동떨어지고, 매우 좁은 화면에서는 과도하게 잘려 의도한 장식 효과 약화.
- **Recommendation**: `vw` 단위나 `clamp()`, `%` 기반으로 전환하거나, 현재 수준이 1024-1440px 범위에서 충분하다면 낮은 우선순위로 둘 수 있음.
- **Suggested command**: `/adapt`

---

### Low-Severity Issues

#### L-1. `<main>` 랜드마크에 `id` 없음

- **Location**: `App.tsx:772`
- **Category**: Accessibility
- **Description**: `<main>` 태그에 `id`가 없어 skip link의 href 타겟으로 사용 불가.
- **Recommendation**: `<main id="main-content">` 추가. H-3(skip link) 수정 시 함께 처리.

#### L-2. OG/메타 태그 부재

- **Location**: `index.html`
- **Category**: SEO / Social
- **Description**: Open Graph, Twitter Card 메타 태그 없음. 카카오톡/슬랙 등에서 공유 시 미리보기 없음.
- **Recommendation**: `og:title`, `og:description`, `og:image`, `twitter:card` 메타 태그 추가.

#### L-3. 풋터 법적 정보 부족

- **Location**: `App.tsx:749-761`
- **Category**: Compliance
- **Description**: 금융 서비스인데 풋터에 원금 손실 경고 한 줄만 존재. 약관, 개인정보처리방침, 사업자 정보 등 누락.
- **Impact**: 한국 금융 관련 법규(전자금융거래법, 자본시장법 등) 준수 여부에 영향. 랜딩 페이지 프로토타입 단계에서는 낮은 우선순위.
- **Recommendation**: 프로덕션 전 법적 검토 후 필수 정보 추가.

#### L-4. `text-[10px]` 극소 텍스트

- **Location**: `App.tsx:347`
- **Category**: Accessibility / Readability
- **Description**: "최근 3년 기준" 텍스트가 10px로 설정. WCAG에서 최소 크기를 명시하진 않으나, 일반적으로 12px 미만은 가독성 문제.
- **Impact**: 고연령 사용자나 시력이 좋지 않은 사용자가 읽기 어려움.
- **Recommendation**: `text-[11px]` 이상으로 조정하거나, `text-xs`(12px) 사용.
- **Suggested command**: `/typeset`

---

## Patterns & Systemic Issues

### 1. 인라인 스타일 OKLCH 남용
약 30개 이상의 컴포넌트에서 `style={{ background: "oklch(...)" }}` 패턴 반복. 색상 변경 시 일일이 찾아 수정해야 하며, 디자인 시스템의 단일 진실 원천(single source of truth) 원칙에 위배됨.

### 2. 인터랙티브 요소의 시맨틱 HTML 미사용
전략 카드뿐 아니라 PortfolioPreview, TickerPill 등 시각적으로 "클릭 가능해 보이는" 요소들이 `<div>`/`<span>`으로 구현. 향후 기능 확장 시 접근성 부채가 누적될 구조.

### 3. 모바일 우선 설계 부재
대부분의 레이아웃이 데스크탑 우선으로 설계된 후 `md:` 프리픽스로 반응형 처리. 모바일 전용 고려(터치 타겟, 모바일 네비게이션, 모바일 전용 CTA 배치)가 부족.

---

## Positive Findings

1. **`prefers-reduced-motion` 완벽 지원**: `index.css:105-113`에서 모든 애니메이션/트랜지션을 전역적으로 비활성화. 접근성 모범 사례.
2. **GPU 가속 애니메이션만 사용**: 모든 애니메이션이 `transform`과 `opacity`만 사용. 레이아웃 프로퍼티 애니메이션 없음. 60fps 보장.
3. **시맨틱 HTML 기본 구조**: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` 랜드마크 올바르게 사용.
4. **`lang="ko"` 설정**: 한국어 콘텐츠에 맞게 문서 언어 설정됨. 스크린리더 음성 엔진 선택에 도움.
5. **`tabular-nums` 일관 적용**: 수치 데이터에 고정폭 숫자가 일관되게 적용되어 가독성 우수.
6. **이징 커브 품질**: `cubic-bezier(0.25,1,0.5,1)` (ease-out-quart)를 일관되게 사용. bounce/elastic 없음.

---

## Recommendations by Priority

### Immediate (이번 스프린트)
1. **전략 카드 시맨틱 수정** (C-1) — `<a>` 태그로 래핑, 키보드 접근 가능하게
2. **모바일 네비게이션 추가** (C-2) — 햄버거 메뉴 또는 대안
3. **`--color-destructive-foreground` 수정** (H-2) — 1줄 수정

### Short-term (다음 스프린트)
4. **Skip navigation 추가** (H-3)
5. **인라인 OKLCH 색상 토큰화** (H-1) — 시맨틱 토큰으로 추출
6. **`contents` 클래스 제거** (H-4) — 레이아웃 재구성

### Medium-term
7. **히어로 통계 모바일 반응형** (M-1)
8. **폰트 로딩 최적화** (M-3)
9. **PortfolioPreview `aria-hidden` 처리** (M-4)

### Long-term
10. **OG 메타 태그** (L-2)
11. **풋터 법적 정보** (L-3)
12. **Reveal 옵저버 통합** (M-2)

---

## Suggested Commands for Fixes

| Command | Addresses | Issue Count |
|---------|-----------|-------------|
| `/harden` | C-1, H-3, H-4, M-4, L-1 | 5 |
| `/adapt` | C-2, M-1, M-5 | 3 |
| `/normalize` | H-1, H-2 | 2 |
| `/optimize` | M-2, M-3 | 2 |
| `/typeset` | L-4 | 1 |
