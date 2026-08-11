import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videos } from '@/data/videoData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import VideoCard from '@/components/VideoCard';
import CarouselControls from '@/components/CarouselControls';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Video showcase"
      id="video"
      className="bg-[#FAF8F5] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Thư Viện Video
            </span>
            <h2
              className="text-[32px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[44px]"
              style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
            >
              Những Khoảnh Khắc Biến Hóa
            </h2>
            <p
              className="max-w-[480px] text-[14px] leading-[1.8] text-[#7a6b5d] md:text-[15px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Câu chuyện của từng mái tóc — từ khoảnh khắc trước khi chạm tay nghệ nhân đến hình ảnh hoàn mỹ cuối cùng.
            </p>
          </div>

          {/* Carousel controls — upper right, desktop only */}
          <div className="hidden md:block">
            {api && (
              <CarouselControls
                scrollPrev={() => api.scrollPrev()}
                scrollNext={() => api.scrollNext()}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
              />
            )}
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            dragFree: false,
            containScroll: 'trimSnaps',
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {videos.map((video, index) => (
              <CarouselItem
                key={video.id}
                className="basis-full pl-3 md:basis-1/3 md:pl-4 lg:basis-1/5"
              >
                <div className="aspect-[9/16] max-h-[70vh] w-full">
                  <VideoCard video={video} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile controls */}
        <div className="mt-8 flex md:hidden">
          {api && (
            <CarouselControls
              scrollPrev={() => api.scrollPrev()}
              scrollNext={() => api.scrollNext()}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
            />
          )}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://zalo.me/0942777009"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2a221c] px-10 py-4 text-[12px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#3d2f24] active:scale-95"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Đặt Lịch Hẹn
          </a>
        </div>
      </div>
    </section>
  );
}
