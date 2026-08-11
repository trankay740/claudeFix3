import { useRef, useLayoutEffect, useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import VideoShowcase from '@/components/VideoShowcase';
import IntroOverlay from '@/components/IntroOverlay';
import FloatingContact from '@/components/FloatingContact';

const HairGallery = lazy(() => import('@/components/HairGallery'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing'));
const Stylists = lazy(() => import('@/components/Stylists'));
const BookingCTA = lazy(() => import('@/components/BookingCTA'));
const Reviews = lazy(() => import('@/components/Reviews'));
const MapSection = lazy(() => import('@/components/MapSection'));
const Footer = lazy(() => import('@/components/Footer'));

gsap.registerPlugin(SplitText);

/**
 * Intro sequence — a single GSAP master timeline drives everything:
 *
 *   Title   ████████████████████
 *   Portal            ███████████████
 *   Hero UI                     ███████
 *
 * The portal is NOT triggered by a React callback after the title finishes.
 * Instead it is added to the same master timeline at ~60% of the title's
 * actual computed stagger duration, so the two animations overlap
 * frame-perfectly. By the time the last characters of "Tóc Đẹp" are still
 * settling, the rectangular portal is already visibly opening in the center
 * of the screen.
 */
function App() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [introComplete, setIntroComplete] = useState(false);

  useLayoutEffect(() => {
    const titleEl = heroRef.current?.querySelector('#hero-title') as HTMLHeadingElement | null;
    const overlayEl = overlayRef.current;
    if (!titleEl || !overlayEl) return;

    const content = heroRef.current?.querySelectorAll(
      '#hero-content .hero-content-item'
    );
    const badge = heroRef.current?.querySelector('#hero-review-badge');
    const scroll = heroRef.current?.querySelector('#hero-scroll');

    // ── Initial states (before first paint — no flash) ──
    gsap.set(overlayEl, {
      opacity: 1,
      '--hx1': '50%',
      '--hy1': '50%',
      '--hx2': '50%',
      '--hy2': '50%',
    });
    if (navRef.current) {
      gsap.set(navRef.current, { opacity: 0, y: -24, pointerEvents: 'none' });
    }
    if (content && content.length > 0) {
      gsap.set(content, { opacity: 0, y: 24 });
    }
    if (badge) {
      gsap.set(badge, { opacity: 0, y: 24 });
    }
    if (scroll) {
      gsap.set(scroll, { opacity: 0 });
    }

    // ── SplitText for the title ──
    const split = new SplitText(titleEl, {
      type: 'chars',
      charsClass: 'title-char',
      ariaReduced: false,
    });
    gsap.set(split.chars, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      const master = gsap.timeline();

      // ── Title: SplitText stagger ──
      const staggerTl = gsap.timeline();
      staggerTl.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.05,
      });
      const titleTl = gsap.timeline();
      titleTl.add(staggerTl, 0);
      titleTl.to({}, { duration: 0.2 }); // hold after last char settles
      master.add(titleTl, 0);

      // ── Portal: synchronized to the actual "Đ" character ──
      // The title is "Triệu\nTóc Đẹp". SplitText with type:'chars' splits on
      // characters only, so whitespace is preserved as its own char. The array
      // is: [T, r, i, ệ, u, \n, T, ó, c, (space), Đ, ẹ, p]. We find the "Đ"
      // (the first char of "Đẹp") and start the portal when its own tween
      // begins, plus a tiny offset so the portal opens as "Đ" is just starting
      // to animate — not after the title finishes.
      const STAGGER = 0.05;
      const DURATION = 1.2;
      const chars = split.chars as HTMLElement[];
      const dIndex = chars.findIndex(
        (c) => c.textContent === 'Đ' || c.textContent === 'Đ'
      );
      const charIndex = dIndex === -1 ? chars.length - 3 : dIndex;
      const portalStart = charIndex * STAGGER + 0.08;

      const portalTl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      });

      // Frame 2 — a small centered portrait rectangle appears IMMEDIATELY
      // (no startup delay) and is given enough duration to become clearly
      // visible before the second expansion begins. The viewer sees a small
      // rectangular opening while the word "Đẹp" is still animating.
      const firstDuration = 0.5;
      portalTl.to(
        overlayEl,
        {
          '--hx1': '35%',
          '--hy1': '40%',
          '--hx2': '65%',
          '--hy2': '60%',
          duration: firstDuration,
          ease: 'power2.out',
        },
        0
      );

      // Frame 3 — the portal expands until it fills the viewport. This begins
      // only AFTER the first rectangle is clearly visible, using a small gap
      // so the first stage is perceived as a distinct beat.
      const secondStart = firstDuration + 0.08;
      const secondDuration = 1.4;
      portalTl.to(
        overlayEl,
        {
          '--hx1': '0%',
          '--hy1': '0%',
          '--hx2': '100%',
          '--hy2': '100%',
          duration: secondDuration,
        },
        secondStart
      );

      // Frame 4 — the mask fades away once the Hero is fully revealed.
      portalTl.to(
        overlayEl,
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        '+=0.05'
      );

      master.add(portalTl, portalStart);

      // ── Hero UI: fades in as the portal finishes opening ──
      // Begins slightly before the fill completes so the description/CTA
      // emerge with the last frame of the reveal, not after a gap.
      const heroUiStart = portalStart + secondStart + secondDuration - 0.2;

      master.fromTo(
        navRef.current,
        { opacity: 0, y: -24, pointerEvents: 'none' },
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.8,
          ease: 'power4.out',
        },
        heroUiStart
      );

      if (content && content.length > 0) {
        master.fromTo(
          content,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power4.out',
          },
          heroUiStart
        );
      }

      if (badge) {
        master.fromTo(
          badge,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
          heroUiStart
        );
      }

      if (scroll) {
        master.fromTo(
          scroll,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          heroUiStart + 0.4
        );
      }

      // Unmount the overlay after everything settles.
      master.call(() => setIntroComplete(true), [], '>');
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  // Reveal the floating contact widget only after the intro animation has
  // fully completed AND the user performs their first interaction (scroll,
  // mouse move, click, or touch). Fades in once, then stays visible.
  useEffect(() => {
    if (!introComplete || !floatingRef.current) return;

    const el = floatingRef.current;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(el, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      });
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('mousemove', reveal);
      window.removeEventListener('click', reveal);
      window.removeEventListener('touchstart', reveal);
      window.removeEventListener('touchmove', reveal);
      window.removeEventListener('wheel', reveal);
      window.removeEventListener('keydown', reveal);
    };

    const opts: AddEventListenerOptions = { passive: true };

    window.addEventListener('scroll', reveal, opts);
    window.addEventListener('mousemove', reveal, opts);
    window.addEventListener('click', reveal, opts);
    window.addEventListener('touchstart', reveal, opts);
    window.addEventListener('touchmove', reveal, opts);
    window.addEventListener('wheel', reveal, opts);
    window.addEventListener('keydown', reveal, opts);

    return cleanup;
  }, [introComplete]);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2]">
      <Nav ref={navRef} />

      <main>
        <Hero ref={heroRef} />
        <VideoShowcase />
        <Suspense fallback={<div className="min-h-[50vh] bg-[#FAF8F5]" />}>
          <HairGallery />
          <ServicesPricing />
          <Stylists />
          <BookingCTA />
          <Reviews />
          <MapSection />
          <Footer />
        </Suspense>
      </main>

      <FloatingContact ref={floatingRef} />

      {!introComplete && <IntroOverlay ref={overlayRef} />}
    </div>
  );
}

export default App;
