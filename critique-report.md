# CurateETF Landing Page — Design Critique

## Anti-Patterns Verdict: PASS (with notes)

This does **not** scream "AI-generated" at first glance. Key reasons it avoids AI slop:

- **No dark mode with glowing neon accents** — light, warm palette as intended
- **No glassmorphism cards** — solid pastel backgrounds, no blur-over-gradient card tricks
- **No gradient text** — clean solid type
- **No hero metric dashboard layout** — stats are minimal and inline, not big hero cards with icons
- **No identical 3-card grid with icons** — the strategy section uses an asymmetric 1-top / 2-bottom layout, which is a good call

**However**, a couple of borderline tells:

- The **3-step "How It Works" section** (numbered 01/02/03, each with title + description) is the single most common AI landing page pattern. The content is fine, but the structure is template-textbook.
- The **hero badge with Sparkles icon** (`<Sparkles>`) is becoming an AI-generation cliche. The icon choice feels auto-suggested rather than intentional.

---

## Overall Impression

A clean, confident landing page that largely matches its design brief (warm, approachable, beginner-friendly). The typography hierarchy works, the color palette is cohesive, and whitespace is used generously. The biggest opportunity: **the page is pleasant but safe — it doesn't have a single moment that makes you stop scrolling.** Everything reads at the same emotional temperature. There's no surprise, no delight, no "this feels different."

---

## What's Working

1. **Asymmetric strategy cards** — The featured "테크 혁신" card spanning full-width with two smaller cards below creates genuine visual rhythm. This is the best section on the page.

2. **Typography system** — Plus Jakarta Sans for headings with Pretendard for Korean body text is a smart pairing. The `clamp()` responsive sizing is well-calibrated. The `tabular-nums` on financial figures is a thoughtful detail.

3. **Color restraint** — The palette stays within teal/sage/mint without overusing accent colors. Each strategy card has a subtly different hue that communicates personality without screaming. The OKLCH color system is well-implemented.

---

## Priority Issues

### 1. The Hero Has No Visual Anchor

**What**: The hero section is entirely left-aligned text with decorative circles floating off-screen to the right. The right half of the viewport on desktop is essentially empty — just faint circles you might not even notice.

**Why it matters**: For a product that *curates* and *builds portfolios*, the hero should show something — even abstractly — that communicates "we organize complexity into clarity." The current hero tells users about the product but never shows them. First impressions matter, and this one reads as "under construction."

**Fix**: Add a visual element — a stylized portfolio preview, an illustration of ETF cards being sorted, or even a simple composition of the ticker pills arranged attractively. It doesn't need to be a full mockup, but the right side needs to pull its weight.

**Command**: `/bolder`

### 2. The "How It Works" Section Is Invisible

**What**: Three plain text blocks on a barely-different-from-white background. No icons, no illustrations, no visual differentiation between steps. The only visual marker is small teal numbers.

**Why it matters**: This section explains the core value proposition — "we do the hard work for you." But because each step looks identical (number + title + description), there's no visual memory formed. Users will scroll past this without retaining anything. The steps describe distinct activities (analysis, selection, risk management) but look the same.

**Fix**: Give each step a distinct visual identity. Even simple icons (a chart line for "시장을 읽어요", a filter for "ETF를 골라요", a shield for "리스크를 관리해요") would create hooks for memory. Consider whether a horizontal numbered flow with connecting lines would better communicate *sequence*.

**Command**: `/delight`

### 3. CTA Section Lacks Confidence

**What**: The final CTA section is centered text ("글로벌 ETF 투자, 같이 시작해봐요!") with a single button, on a slightly darker teal background. It's the most important conversion point on the page but receives the least design attention.

**Why it matters**: After scrolling through strategies and social proof, this is the moment to close. But it feels like an afterthought — the same rounded button, the same text sizes, no urgency, no reinforcement of what they'll get. The "3분이면 나만의 포트폴리오를 만들 수 있어요" is good copy buried in a generic layout.

**Fix**: Elevate this section visually. Consider adding a supporting element — a mini preview of what they'll create, a testimonial, or at minimum a stronger visual container. The "3분" promise is compelling; make it the hero of this section, not the subtitle.

**Command**: `/bolder`

### 4. Strategy Cards Don't Invite Interaction

**What**: The strategy cards display information but have no affordance for interaction — no hover states, no "자세히 보기" links, no cursor changes. They look like static content blocks.

**Why it matters**: These are the product itself. A user who's interested in "배당 인컴" has no way to express that interest. The cards create curiosity but provide no outlet. This is a conversion leak.

**Fix**: Add hover states that expand or highlight the card. Include a subtle call-to-action on each card ("이 전략으로 시작하기" or simply an arrow). Make them feel tappable.

**Command**: `/animate`

### 5. Stats in the Hero Feel Unanchored

**What**: "2,400+ ETF 분석 / ₩3.2조 운용 규모 / 12.4% 평균 연수익률" are listed inline at the bottom of the hero with no visual container or separation.

**Why it matters**: These are powerful trust signals that currently feel like fine print. The design principle in `.impeccable.md` says "데이터는 맥락과 함께" — but "12.4% 평균 연수익률" is presented without context (compared to what? over what period?). And the visual treatment (small text, no container) undermines their credibility.

**Fix**: Either give these stats their own contained section with slightly more visual weight (a subtle card row or divider), or add contextual labels (e.g., "최근 3년" or "vs 코스피 +4.2%p"). Follow your own design principle.

**Command**: `/arrange`

---

## Minor Observations

- **Mobile nav**: The desktop nav links are hidden on mobile (`hidden md:flex`), but there's no hamburger menu. Mobile users only have the "무료로 시작" button in the header — they can't navigate to sections.
- **Footer is too minimal**: For a financial product, users expect to find legal disclaimers, contact info, and trust signals in the footer. The single line about "원금 손실 위험" is good but lonely.
- **The `backdrop-blur-md` header** might cause scroll performance issues on lower-end devices. Test on mobile.
- **Decorative circles in the hero** have hardcoded pixel positions — they'll look wrong on very wide or very narrow screens. Consider making them relative to the container.
- **Reduced motion support** is properly implemented — good accessibility practice.

---

## Questions to Consider

- "What would this page look like if you removed all text and only kept the visuals — would it still communicate 'easy investing'?"
- "The design context says the emotion should be '나도 할 수 있겠다' — does this page *feel* that way, or does it just *say* that?"
- "What if the strategies section was interactive — letting users slide between options or preview what their portfolio would look like?"
- "Is there a reason there's no social proof (testimonials, user count, media mentions)? For a financial product, trust is everything."
- "What does this page look like when someone shares it on KakaoTalk — is the OG image set up to continue the brand impression?"
