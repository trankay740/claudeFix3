const REVIEWS = [
  {
    name: 'Nguyễn Thị Mai',
    service: 'Nhuộm & Uốn',
    text: 'Màu tóc lên chuẩn từng sợi, đội ngũ tư vấn rất nhiệt tình. Không gian salon sang trọng và thoải mái.',
  },
  {
    name: 'Trần Thanh Hằng',
    service: 'Cắt Tóc & Phục Hồi',
    text: 'Kiểu tóc cắt tỉa rất tinh tế, đúng như mình mong muốn. Liệu trình phục hồi giúp tóc mềm mại trở lại.',
  },
  {
    name: 'Lê Hoàng Yến',
    service: 'Tẩy & Ombré',
    text: 'Tẩy tóc an toàn, không bị khô xơ. Hiệu ứng ombré tự nhiên và rất hợp với nước da của mình.',
  },
  {
    name: 'Phạm Ngọc Diệp',
    service: 'Uốn Hàn Quốc',
    text: 'Tóc uốn xoăn tự nhiên, giữ nếp lâu mà không bị rít. Mọi người ở salon đều rất tâm huyết.',
  },
  {
    name: 'Võ Minh Khuê',
    service: 'Cắt Layer & Style',
    text: 'Layer cắt bay bổng mà vẫn gọn gàng, mình rất ưng. Sẽ giới thiệu bạn bè đến thử.',
  },
  {
    name: 'Đặng Thu Hà',
    service: 'Nhuộm Balayage',
    text: 'Balayage lên màu mượt mà, chuyển sắc cực kỳ tự nhiên. Salon tư vấn kỹ lưỡng trước khi làm.',
  },
  {
    name: 'Bùi Khánh Linh',
    service: 'Phục Hồi Tóc',
    text: 'Tóc hư nặng sau nhiều lần tẩy, sau liệu trình phục hồi ở đây mà mềm mượt bất ngờ.',
  },
  {
    name: 'Hoàng Thùy Trang',
    service: 'Nối Tóc',
    text: 'Nối tóc tự nhiên, không thấy vết nối. Mình yên tâm giao tóc cho các nhà tạo mẫu ở đây.',
  },
];

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <figure className="mx-3 flex h-full w-[320px] shrink-0 flex-col gap-5 rounded-xl border border-[#2a221c]/10 bg-white/60 p-8 md:w-[360px]">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[14px] text-[#c9a96e]">
            ★
          </span>
        ))}
      </div>
      <blockquote
        className="text-[15px] leading-[1.8] text-[#2a221c]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        “{review.text}”
      </blockquote>
      <figcaption className="mt-auto">
        <p
          className="text-[16px] text-[#2a221c]"
          style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
        >
          {review.name}
        </p>
        <p
          className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#7a6b5d]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {review.service}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      aria-label="Client reviews"
      className="overflow-hidden bg-[#FAF8F5] py-16 md:py-24"
    >
      <div className="mx-auto mb-12 max-w-[1200px] px-6 md:mb-16">
        <div className="flex flex-col gap-3">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Khách Hàng Nói Gì
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Cảm Nhận Khách Hàng
          </h2>
        </div>
      </div>

      <div className="group/marquee relative">
        <div className="marquee-track flex w-max will-change-transform group-hover/marquee:[animation-play-state:paused]">
          {loop.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAF8F5] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAF8F5] to-transparent" />
      </div>
    </section>
  );
}
