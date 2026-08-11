import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

type CarouselApi = EmblaCarouselType;

type CarouselOptions = {
  opts?: EmblaOptionsType;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextValue = {
  api: EmblaCarouselType | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null;

const CarouselContext = createContext<CarouselContextValue>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

export const Carousel = ({
  opts,
  orientation = 'horizontal',
  setApi,
  className,
  children,
  ...props
}: CarouselOptions & HTMLAttributes<HTMLDivElement>) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === 'horizontal' ? 'x' : 'y',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const onSelect = useCallback((a: EmblaCarouselType) => {
    setCanScrollPrev(a.canScrollPrev());
    setCanScrollNext(a.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    onSelect(api);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect, setApi]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <CarouselContext.Provider
      value={{ api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div
        ref={carouselRef}
        onKeyDown={handleKeyDown}
        className={className}
        role="region"
        aria-roledescription="carousel"
        style={{ overflow: 'hidden' }}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={className}
    style={{ display: 'flex', touchAction: 'pan-y' }}
    {...props}
  />
);

export const CarouselItem = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={className}
    role="group"
    aria-roledescription="slide"
    style={{ flex: '0 0 auto', minWidth: 0 }}
    {...props}
  />
);

export type { CarouselApi };
