import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselControlsProps {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export default function CarouselControls({
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
}: CarouselControlsProps) {

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Video trước"
        className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-[#2a221c]/15 text-[#2a221c] transition-all duration-300 hover:border-[#2a221c]/40 hover:bg-[#2a221c]/[0.03] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-[#2a221c]/15 disabled:hover:bg-transparent"
      >
        <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Video sau"
        className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full border border-[#2a221c]/15 text-[#2a221c] transition-all duration-300 hover:border-[#2a221c]/40 hover:bg-[#2a221c]/[0.03] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-[#2a221c]/15 disabled:hover:bg-transparent"
      >
        <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
      </button>
    </div>
  );
}
