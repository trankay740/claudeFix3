export default function Footer() {
  return (
    <footer className="bg-[#2a221c] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Logo + intro */}
          <div className="flex flex-col gap-4">
            <span
              className="text-white tracking-tight"
              style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', fontWeight: 400 }}
            >
              TRIỆU TÓC ĐẸP
            </span>
            <p
              className="text-[13px] leading-[1.8] text-white/50"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Salon tóc cao cấp Lái Thiêu. Nơi mỗi mái tóc là một tác phẩm nghệ thuật.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#c9a96e]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Liên Hệ
            </span>
            <p
              className="text-[13px] leading-[1.8] text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              9B, Đường Lái Thiêu 51<br />
              Thuận An, Bình Dương<br />
              Lái Thiêu, Vietnam<br />
              094 277 70 09<br />
              lienhe@trieutocdep.vn
            </p>
          </div>

          {/* Opening hours */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#c9a96e]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Giờ Mở Cửa
            </span>
            <p
              className="text-[13px] leading-[1.8] text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              08:00 – 20:00 (Thứ Hai – Thứ Bảy)<br />
              Chủ Nhật: Nghỉ
              Chủ Nhật: Nghỉ
            </p>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#c9a96e]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mạng Xã Hội
            </span>
            <div className="flex flex-col gap-2">
              {['Instagram', 'TikTok', 'Facebook', 'YouTube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[13px] text-white/60 transition-colors hover:text-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2025 Triệu Tóc Đẹp. Bảo Lưu Mọi Quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
