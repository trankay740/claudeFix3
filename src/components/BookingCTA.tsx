export default function BookingCTA() {
  return (
    <section
      aria-label="Booking call to action"
      className="bg-[#FAF8F5] px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[800px] text-center">
        <span
          className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Đặt Lịch Hẹn
        </span>
        <h2
          className="mt-6 text-[36px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[56px]"
          style={{ fontFamily: "'Newsreader', serif", fontWeight: 300 }}
        >
          Đặt Lịch Ngay Hôm Nay
        </h2>
        <p
          className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.8] text-[#7a6b5d] md:text-[16px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Hãy để chúng tôi chăm sóc mái tóc của bạn. Đặt lịch hẹn để nhận tư vấn cá nhân hóa và trải nghiệm dịch vụ cao cấp tại Triệu Tóc Đẹp.
        </p>
        <div className="mt-10">
          <a
            href="https://zalo.me/0942777009"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2a221c] px-10 py-4 text-[12px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#3d2f24] active:scale-95 inline-block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Đặt Lịch Hẹn
          </a>
        </div>
      </div>
    </section>
  );
}
