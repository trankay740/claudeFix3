const STYLISTS = [
  {
  name: 'Minh Quân',
  role: 'Creative Director',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085792/2026-08-07_13-49-58_Lumina_1_krtozn.jpg',
},
{
  name: 'Thanh Thảo',
  role: 'Chuyên Gia Nhuộm Màu',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085789/THAO%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC_eoo5ox.jpg',
},
{
  name: 'Quốc Thịnh',
  role: 'Chuyên Gia Tóc Layer',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085790/THAO_t5ih68.jpg',
},
{
  name: 'Phương Anh',
  role: 'Chuyên Gia Uốn & Phục Hồi',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085788/Phuong-_a8ysnw.jpg',
},
{
  name: 'Tấn Phát',
  role: 'Chuyên Gia Tóc Bob',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085789/Tam-2_lggifz.jpg',
},
{
  name: 'Ngọc Thảo',
  role: 'Chuyên Gia Tóc Ngắn',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786085799/2026-08-07_13-46-34_Lumina_1_vdixhx.jpg',
},
{
  name: 'Gia Huy',
  role: 'Chuyên Gia Balayage',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786087019/2026-08-07_14-16-57_Lumina_1_rf8v01.jpg',
},
{
  name: 'Thanh Trà',
  role: 'Chuyên Gia Nối Tóc',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_400/v1786086989/2026-08-07_14-14-44_Lumina_1_xcpulk.jpg',
},
];

export default function Stylists() {
  return (
    <section
      id="stylist"
      aria-label="Meet our stylists"
      className="bg-[#FAF8F5] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Đội Ngũ
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Gặp Gỡ Nhà Tạo Mẫu
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          style={{ columnGap: '32px', rowGap: '56px' }}
        >
          {STYLISTS.map((stylist) => (
            <article key={stylist.name} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#f0ebe2]">
                <img
                  src={stylist.img}
                  alt={stylist.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#8b5e3c] md:text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stylist.role}
              </p>
              <h3
                className="mt-2 text-[32px] leading-[1.05] tracking-tight text-[#2a221c] md:text-[38px]"
                style={{ fontFamily: "'Newsreader', serif", fontWeight: 500 }}
              >
                {stylist.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
