# Project Context — Triệu Tóc Đẹp

> **Important:** The website content (all headings, paragraphs, buttons, labels, navigation items) must **always remain in Vietnamese** because the target users are Vietnamese salon customers. This document is written in English so Bolt can understand the project context in future sessions.

---

## Project Overview

**Triệu Tóc Đẹp** ("Triệu" = surname / "Tóc Đẹp" = beautiful hair) is a premium female hair salon based in Saigon, Vietnam. This repository is the salon's marketing website — an editorial, luxury, feminine single-page experience built to feel like a high-end beauty brand or fashion magazine rather than a startup landing page.

The site is a single-page React application with a cinematic hero intro animation, a navigation bar, and a lower "craft" section describing the salon's process and stats.

---

## Design Philosophy

- **Luxury, feminine, elegant, editorial magazine, premium beauty brand.**
- Inspiration: high-end fashion websites, luxury perfume brands, editorial portfolios.
- Minimal motion, but extremely polished. Every animation should feel calm, confident, and intentional.
- Lots of whitespace. Large, clean serif typography for display. Mono labels for editorial detail.
- No neon, no glow, no gradients-as-decoration, no cyberpunk, no gaming aesthetics.
- Warm luxury palette: dark beige, champagne, ivory, soft cream, gold accents, espresso text tones.

---

## Brand Identity

- **Name:** Triệu Tóc Đẹp
- **Location:** Lái Thiêu, Vietnam
- **Established:** 2018
- **Tone:** Editorial, refined, confident, feminine. Treats every head of hair as a canvas.
- **Typography:**
  - Display / Headlines: **Newsreader** (serif, weights 300–500) — editorial cover feel.
  - Body: **Inter** (sans-serif, weight 400).
  - Labels / Eyebrows / Mono: **JetBrains Mono** (weight 500) — uppercase, wide tracking.
- **Color palette:**
  - Warm cream / champagne / ivory for the intro overlay.
  - Deep warm dark (`#1c1612`, `#2a221c`) for the hero background and nav.
  - Gold (`#c9a96e`) as the accent.
  - Rose / mauve tones available for future sections.
  - The lower sections retain the original near-black (`#131313`) editorial dark theme.

---

## Target Audience

- Vietnamese women seeking premium hair services.
- Customers who respond to editorial, fashion-forward presentation.
- Vietnamese language throughout. No English in user-facing UI copy.

---

## Animation Architecture

The hero intro is a one-time, non-looping cinematic sequence built on a single **GSAP timeline**. It lasts roughly 2.5–3.5 seconds and plays only on first load. After it completes, the hero is a normal static section.

### Timeline phases (with GSAP labels)

1. **`titleReveal`** — The screen starts with a warm champagne overlay (`#e8dcc8`). The salon name "Triệu Tóc Đẹp" softly appears (opacity + translateY + slight scale) using `power4.out`. No bounce, no elastic.
2. **`imageReveal`** — A small rectangular window of the hero image (about 15–20% screen width via `clip-path: inset(42% 42% 42% 42%)`) fades in. The image is not fully visible yet — it feels like looking through a tiny editorial window.
3. **`expand`** — The image container animates its `clip-path` from the small rectangle to fullscreen (`inset(0% 0% 0% 0%)`) while the inner image independently scales from `1.15` → `1`. This is a premium reveal, not a cheap zoom. The overlay fades out simultaneously.
4. (During expand) The salon title reduces opacity from `1` → `0.35` so it stays partially visible above the image but the image becomes the focus.
5. **`contentIn`** — Hero content (eyebrow, headline, description, CTAs) fades up with a stagger. The scroll indicator fades in last.

### Two-layer image architecture (critical)

The hero image is split into two independent layers so they can animate separately:

- **Layer 1 — Image Container** (`hero-image-container`): responsible for `clip-path`, `overflow: hidden`, and `transform-origin: center`. Animates the clip reveal from small rectangle → fullscreen.
- **Layer 2 — Image** (`hero-image-inner`): responsible for `scale` and transform. Animates `scale(1.15)` → `scale(1)` independently of the container.

This separation is what produces the premium "revealing itself" effect rather than a simple zoom.

### Performance constraints

- DOM-based only. No WebGL, no Three.js, no Canvas.
- Animate transforms and `clip-path` only — never `width`/`height` to avoid layout thrash.
- No blur animations, no box-shadow animations, no heavy filters.
- `will-change` is set on the animated layers (`opacity`, `transform`, `clip-path`).
- Easing is restricted to `power4.out`, `power3.inOut`, `power2.out` / `power2.inOut`. Never `Bounce`, `Elastic`, or `Back`.

### Implementation notes

- The timeline is created inside `gsap.context()` scoped to the hero section ref, and reverted on cleanup to avoid leaks.
- Initial states are set imperatively with `gsap.set` so there is no flash of unstyled content before the timeline runs.
- The timeline uses labels (`titleReveal`, `imageReveal`, `expand`, `contentIn`) for synchronization — no `setTimeout` chains.
- The animation runs once on mount. There is no replay button or loop.

---

## Technologies Used

- **React 19** + **TypeScript** — UI layer.
- **Vite 8** — build tool and dev server (`@tailwindcss/vite` plugin).
- **Tailwind CSS v4** — styling, configured via CSS `@theme` in `src/index.css` (no `tailwind.config.js`).
- **GSAP** — the hero intro timeline animation.
- **lucide-react** — icons (menu, close, scroll chevron, arrow).
- Fonts via Google Fonts: Newsreader, Inter, JetBrains Mono.

---

## Folder Structure Overview

```
project/
├── index.html                      # lang="vi", Vietnamese title
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── src/
│   ├── main.tsx                    # React entry
│   ├── App.tsx                     # composes Nav + Hero + Teaser
│   ├── index.css                   # Tailwind v4 @theme, warm luxury palette, intro helper classes
│   └── components/
│       ├── Nav.tsx                 # fixed nav, Vietnamese links, mobile drawer
│       ├── Hero.tsx                # GSAP intro timeline + two-layer image + Vietnamese hero content
│       └── Teaser.tsx              # "01 — Nghệ Thuật Tạo Mẫu" craft section (Vietnamese)
├── PROJECT_CONTEXT.md              # this document
└── public/
    └── download                     # provided asset (do not rewrite)
```

---

## Current Implementation Status

- **Hero intro animation:** Complete. GSAP timeline with the five-phase sequence described above.
- **Navigation:** Complete. Vietnamese labels, mobile drawer, "ĐẶT LỊCH" CTA.
- **Craft / Teaser section:** Complete. Vietnamese process steps, lookbook image card, stats row.
- **Build:** Passing (`npm run build`).
- **Persistence:** No Supabase tables are currently in use. The site is presentational. If booking or contact forms are added later, Supabase is the intended backend.

---

## Hero Animation Design Decisions

- **Why a single GSAP timeline (not CSS keyframes):** the phases must coordinate precisely (title fading while image expands, overlay hiding while clip-path opens). A master timeline with labels gives frame-accurate synchronization that CSS chains and `setTimeout` cannot.
- **Why two image layers:** animating the container's `clip-path` and the image's `scale` independently is the difference between a "reveal" and a "zoom." It is the core of the premium feel.
- **Why the title fades to 0.35, not 0:** keeping the salon name faintly visible over the final hero reinforces brand identity without competing with the image.
- **Why `power4.out` / `power3.inOut`:** these easings decelerate smoothly and feel expensive. `Bounce`/`Elastic`/`Back` would feel cheap and playful, which is wrong for a luxury salon.
- **Why warm champagne overlay instead of black:** the intro should feel like opening a cream-colored beauty brand box, not a tech startup splash screen.

---

## Future Development Notes

- **Booking flow:** a real appointment-booking form backed by Supabase is the most likely next feature. RLS policies should scope bookings to the authenticated customer; salon staff would need a privileged path (SECURITY DEFINER function) to read/update all bookings.
- **Lookbook gallery:** the Teaser section currently reuses the single hero image. A real lookbook grid with multiple crops is a natural extension.
- **Services / pricing:** a dedicated services section with Vietnamese pricing.
- **Reduced motion:** consider respecting `prefers-reduced-motion` by skipping the intro timeline and showing the final static hero immediately.
- **SEO:** add Vietnamese meta description and structured data for a local business.

---

## Important Implementation Constraints

1. **All user-facing copy stays in Vietnamese.** This is non-negotiable; the audience is Vietnamese salon customers.
2. **Do not redesign the whole site** when iterating on the hero — only the Hero Intro animation should change unless explicitly asked.
3. **Keep the two-layer image architecture** (container for `clip-path`, image for `scale`) if the hero animation is modified.
4. **No WebGL / Three.js / Canvas.** Animation stays DOM + GSAP.
5. **No `Bounce` / `Elastic` / `Back` easing** in the intro. Use `power4.out`, `power3.inOut`, `power2.*`.
6. **Animate transforms and `clip-path`, not `width`/`height`**, to keep the intro smooth on mobile.
7. The `public/download` file was provided externally — do not rewrite it.
