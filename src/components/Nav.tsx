import { forwardRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'VIDEO', href: '#video' },
  { label: 'LOOKBOOK', href: '#lookbook' },
  { label: 'DỊCH VỤ', href: '#services-pricing' },
  { label: 'STYLIST', href: '#stylist' },
  { label: 'LIÊN HỆ', href: '#lien-he' }
];

const Nav = forwardRef<HTMLElement>((_props, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 768px)');
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!desktopMedia.matches || !navElementRef.current) {
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 8) return;

      gsap.to(navElementRef.current, {
        y: currentScrollY > lastScrollY && currentScrollY > 8 ? -100 : 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setNavRef = (node: HTMLElement | null) => {
    navElementRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <>
      <nav
        ref={setNavRef}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-5 md:px-16 py-6 bg-[#1c1612]/80 backdrop-blur-xl border-b border-white/10"
      >
        <div>
          <a
            href="#"
            className="text-white tracking-tighter hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', lineHeight: '28px', fontWeight: 400 }}
          >
            TRIỆU TÓC ĐẸP
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#e2e2e2]/70 hover:text-[#e2e2e2] hover:bg-white/5 transition-all duration-300 py-2 px-3 rounded text-[12px] tracking-[0.05em] font-medium uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="https://zalo.me/0942777009" target="_blank" rel="noopener noreferrer" className="text-[#1c1612] bg-white px-6 py-3 hover:bg-white/90 transition-colors duration-300 uppercase tracking-[0.15em] text-[12px] font-medium active:scale-95">
            ĐẶT LỊCH
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Mở menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-[#1c1612] flex flex-col items-center justify-center gap-8 pt-24">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-white transition-colors text-[12px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
});

Nav.displayName = 'Nav';

export default Nav;
