import { forwardRef } from 'react';

const HERO_IMG = 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,w_1920/v1786087918/2026-08-06_07-24-22_Lumina_1_odim6y.jpg';

/**
 * The Hero is always mounted — from frame one. It is never faded in,
 * never swapped, never replaced. The IntroOverlay simply reveals it.
 *
 * LAYOUT ARCHITECTURE (responsive-safe):
 *
 * The title+badge block and the description+CTA block used to be two
 * independently absolutely-positioned elements. At certain viewport sizes
 * (tablet, tall mobile) they collided — the badge overlapped the description
 * and the heading wrapped to three lines.
 *
 * They are now a SINGLE absolutely-positioned flex column
 * (#hero-stack, justify-content: flex-end). The four children flow in natural
 * document order — H1, badge, description, CTA — so they can NEVER overlap
 * regardless of viewport dimensions. Each child keeps its original GSAP
 * target id/class so the master timeline in App.tsx is untouched:
 *
 *   #hero-title            ← SplitText chars
 *   #hero-review-badge     ← badge fade/translate
 *   #hero-content          ← wrapper (not animated itself)
 *   .hero-content-item     ← description + CTA stagger
 *
 * The stack sits at z-[90] so the title still renders above the IntroOverlay
 * (z-[80]) during the intro. The stack is position:absolute (not relative),
 * so the Hero section does NOT create a stacking context — identical to the
 * prior behavior. After the intro the stack scrolls away with the Hero.
 *
 * Responsive geometry is driven entirely by CSS (src/index.css): the title
 * font-size, the stack width, and the bottom padding all scale by viewport
 * via clamp() and media queries. No per-device hacks.
 */
const Hero = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#1c1612]"
    >
      {/* ── Hero background (frame one, always present) ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Mẫu tóc Triệu Tóc Đẹp"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1612]/30 via-transparent to-[#1c1612]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1612]/60 via-[#1c1612]/10 to-transparent" />
      </div>

      {/* ── Unified content stack (title + badge + description + CTA) ──
          A single flex column anchored to the bottom-left of the Hero.
          Children flow in document order so they never overlap. The stack
          keeps z-[90] so the title stays above the IntroOverlay (z-[80])
          during the intro mask reveal. All responsive geometry is in CSS. */}
      <div
        id="hero-stack"
        className="hero-stack pointer-events-none absolute inset-0 z-[90] flex flex-col justify-end"
      >
        <div className="hero-stack-inner flex flex-col">
          {/* ── Title ── */}
          <h1
            id="hero-title"
            className="hero-title text-white tracking-tight"
            style={{
              fontFamily: "'Newsreader', serif",
              lineHeight: 1,
              fontWeight: 300,
              letterSpacing: '-0.01em',
            }}
          >
            Triệu
            <br />
            Tóc Đẹp
          </h1>

          {/* ── Google review badge ── */}
          <div
            id="hero-review-badge"
            className="hero-review-badge mt-6 inline-flex flex-nowrap items-center gap-2 w-max max-w-none whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] text-white backdrop-blur-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            aria-label="Google 4.9 trên 5, 1278 đánh giá"
          >
            <span className="font-medium tracking-[0.08em]">GOOGLE</span>
            <span className="inline-flex flex-nowrap gap-0.5 text-[12px] text-[#c9a96e]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </span>
            <span className="font-medium">4.9</span>
            <span className="text-white/50">·</span>
            <span>1278 đánh giá</span>
          </div>

          {/* ── Description + CTA ── */}
          <div
            id="hero-content"
            className="hero-content mt-10 flex flex-col"
          >
            <p
              className="hero-content-item hero-description text-white/65"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tiêu chuẩn mới trong nghệ thuật tạo mẫu tóc. Cắt tỉa chính xác, màu tóc đa chiều, và các liệu trình chăm sóc được thiết kế riêng cho từng khách hàng — bởi những nhà tạo mẫu coi mỗi mái tóc như một tác phẩm.
            </p>

            <div className="hero-content-item hero-cta-row pointer-events-auto mt-10 flex items-center gap-2 md:gap-4">
              <a
                href="https://zalo.me/0942777009"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-[#1c1612] bg-white px-5 md:px-8 py-4 hover:bg-white/90 transition-colors duration-300 uppercase tracking-[0.12em] md:tracking-[0.15em] text-[11px] md:text-[12px] font-medium active:scale-95"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Đặt Lịch Hẹn
              </a>
              <a
                href="#services-pricing"
                className="whitespace-nowrap border border-white/60 px-5 md:px-8 py-4 text-[11px] md:text-[12px] font-medium uppercase tracking-[0.12em] md:tracking-[0.15em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 active:scale-95"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Dịch Vụ &amp; Giá
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        id="hero-scroll"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span
          className="text-white/40 text-[10px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Cuộn Xuống
        </span>
        <div className="w-px h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-white scroll-line" />
        </div>
      </div>

    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
