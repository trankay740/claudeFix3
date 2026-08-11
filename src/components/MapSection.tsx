import { useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL =
  'https://www.google.com/maps/place/Tri%E1%BB%87u+T%C3%B3c+%C4%90%E1%BA%B9p/@10.9060435,106.7065372,19z/data=!4m6!3m5!1s0x3174d7afd28da94d:0xf34e7050a85b476b!8m2!3d10.9060803!4d106.7068671!16s%2Fg%2F11h77w378l?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D';

const MAP_IMAGE =
  'https://res.cloudinary.com/o5ikznlv/image/upload/q_auto/f_auto/v1786032865/3ee9aef1-12ed-4427-9cba-1fbae6dc0206_rmfbue.png';

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const map = mapRef.current;
    const img = imgRef.current;
    if (!section || !card || !map || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        },
      );
      gsap.fromTo(
        map,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const img = imgRef.current;
    if (!map || !img) return;

    // The parallax effect is a mouse-only interaction. On touch devices
    // (no fine pointer) it has no meaningful purpose, so skip attaching
    // the listeners and the requestAnimationFrame loop entirely.
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = map.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = px * 12;
      target.y = py * 12;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      img.style.transform = `translate(${current.x}px, ${current.y}px)`;
      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    map.addEventListener('mousemove', onMove);
    map.addEventListener('mouseleave', onLeave);
    return () => {
      map.removeEventListener('mousemove', onMove);
      map.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      aria-label="Salon location"
      className="bg-[#FAF8F5] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Địa điểm
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Hãy đến salon của chúng tôi
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          {/* Left: info card */}
          <div
            ref={cardRef}
            className="flex w-full items-center md:w-[35%]"
          >
            <div className="flex w-full flex-col gap-8 rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(42,34,28,0.06)] md:p-10">
              <div className="flex flex-col gap-2">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Triệu Tóc Đẹp
                </span>
                <h3
                  className="text-[24px] leading-[1.2] text-[#2a221c] md:text-[28px]"
                  style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
                >
                  Triệu Tóc Đẹp
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-[#c9a96e]" size={20} />
                  <p
                    className="text-[15px] leading-[1.7] text-[#2a221c]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    9B Đ. Lái Thiêu 51
                    <br />
                    Lái Thiêu, Bình Dương
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="shrink-0 text-[#c9a96e]" size={20} />
                  <a
                    href="tel:0942777009"
                    className="text-[15px] text-[#2a221c] transition-colors hover:text-[#c9a96e]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    0942 777 009
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="shrink-0 text-[#c9a96e]" size={20} />
                  <p
                    className="text-[15px] text-[#2a221c]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    8:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center gap-2 rounded-full bg-[#2a221c] px-8 py-4 text-[14px] text-white transition-colors hover:bg-[#3d2f24]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Mở bản đồ trong Google Maps
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Right: map card */}
          <a
            ref={mapRef}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/map relative block w-full overflow-hidden rounded-[28px] shadow-[0_4px_24px_rgba(42,34,28,0.06)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(42,34,28,0.12)] md:w-[65%]"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                ref={imgRef}
                src={MAP_IMAGE}
                alt="Map showing Triệu Tóc Đẹp salon location"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/map:scale-[1.03]"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
