import { forwardRef } from 'react';

const MASK_COLOR = '#131313';

/**
 * A cinematic mask — mounted from frame one, purely presentational.
 *
 * The overlay is always present in the DOM. Its clip-path defines a
 * rectangular "portal" — a hole cut out of the middle using a polygon with an
 * even-odd fill rule, so the opening is a true hole in one continuous shape,
 * never four panels.
 *
 *   ┌──────────────────────┐
 *   │      black mask       │
 *   │   ┌──────────────┐   │
 *   │   │  transparent  │   │  ← the portal (a hole, not a gap)
 *   │   │   opening     │   │
 *   │   └──────────────┘   │
 *   │      black mask       │
 *   └──────────────────────┘
 *
 * The hole is defined by four CSS variables (--hx1/--hy1/--hx2/--hy2). All
 * animation — the portal opening, the fade-out — is driven by App's single
 * master GSAP timeline, not by this component. The initial inline values
 * keep the portal fully closed (a zero-size hole at center = fully black
 * screen) so there is no flash of the Hero before the timeline starts.
 */
const IntroOverlay = forwardRef<HTMLDivElement>((_props, ref) => {
  const clipPath =
    'polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, var(--hx1) var(--hy1), var(--hx2) var(--hy1), var(--hx2) var(--hy2), var(--hx1) var(--hy2), var(--hx1) var(--hy1))';

  return (
    <div
      ref={ref}
      className="intro-overlay fixed inset-0 z-[80]"
      style={{
        backgroundColor: MASK_COLOR,
        '--hx1': '50%',
        '--hy1': '50%',
        '--hx2': '50%',
        '--hy2': '50%',
        clipPath,
        WebkitClipPath: clipPath,
      } as React.CSSProperties}
    />
  );
});

IntroOverlay.displayName = 'IntroOverlay';

export default IntroOverlay;
