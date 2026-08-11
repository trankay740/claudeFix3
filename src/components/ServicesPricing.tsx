type Service = {
  name: string;
  price: string;
};

type ServiceGroup = {
  title: string;
  services: Service[];
};

const WOMEN_SERVICES: ServiceGroup[] = [
  {
    title: 'Cắt - Gội - Tạo Kiểu - Mask',
    services: [
      { name: 'Cắt', price: '100.000đ' },
      { name: 'Cắt mái', price: '20.000đ' },
      { name: 'Kẹp', price: '40.000đ' },
      { name: 'Gội (Lạnh / Nóng)', price: '90.000đ - 120.000đ' },
      { name: 'Gội đầu cao cấp', price: '150.000đ' },
      { name: 'Gội thảo dược', price: '120.000đ' },
      { name: 'Đắp mặt nạ', price: '50.000đ' },
    ],
  },
  {
    title: 'Uốn - Duỗi',
    services: [
      { name: 'Uốn (Tóc ngắn - dài)', price: '850.000đ - 900.000đ' },
      { name: 'Uốn phục hồi', price: '1.200.000đ' },
      { name: 'Duỗi (Tóc ngắn - dài)', price: '850.000đ - 900.000đ' },
      { name: 'Duỗi phục hồi', price: '1.200.000đ' },
    ],
  },
  {
    title: 'Nhuộm - Tẩy - Highlight - Balayage',
    services: [
      { name: 'Nhuộm chân tóc (Tối đa 3cm)', price: '400.000đ' },
      { name: 'Nhuộm (Tóc ngắn - dài)', price: '850.000đ - 900.000đ' },
      { name: 'Nhuộm phục hồi', price: '1.200.000đ' },
      { name: 'Nhuộm màu tẩy', price: '1.500.000đ - 1.800.000đ' },
      { name: 'Nhuộm Highlight', price: '200.000đ - 700.000đ' },
      { name: 'Nhuộm Balayage', price: '2.500.000đ' },
    ],
  },
  {
    title: 'Các Dịch Vụ Hóa Chất Khác',
    services: [
      { name: 'Bấm tóc', price: '250.000đ' },
      { name: 'Tạo phồng chân tóc', price: '200.000đ' },
      { name: 'Bấm + Tạo phồng chân tóc', price: '300.000đ' },
    ],
  },
  {
    title: 'Phục Hồi',
    services: [
      { name: 'Hấp dầu (Tóc ngắn - dài)', price: '280.000đ - 300.000đ' },
      { name: 'Tái tạo (Tóc ngắn - dài)', price: '650.000đ - 700.000đ' },
    ],
  },
  {
    title: 'Trang Điểm',
    services: [
      { name: 'Trang điểm', price: '200.000đ' },
      { name: 'Trang điểm + Tạo mẫu tóc', price: '250.000đ' },
    ],
  },
];

const MEN_SERVICES: ServiceGroup[] = [
  {
    title: 'Cắt Tóc Nam',
    services: [{ name: 'Cắt', price: '80.000đ' }],
  },
  {
    title: 'Uốn Tóc Nam',
    services: [
      { name: 'Uốn', price: '280.000đ' },
      { name: 'Uốn Wavy', price: '280.000đ' },
      { name: 'Uốn Ruffled', price: '350.000đ' },
      { name: 'Uốn Con Sâu', price: '350.000đ' },
      { name: 'Uốn Premlock', price: '500.000đ' },
      { name: 'Hair Tattoo', price: '80.000đ' },
    ],
  },
  {
    title: 'Nhuộm - Tẩy - Highlight - Balayage',
    services: [
      { name: 'Nhuộm', price: '400.000đ' },
      { name: 'Nhuộm màu thời trang', price: '700.000đ' },
    ],
  },
  {
    title: 'Combo',
    services: [
      { name: 'Cắt - Xả - Cạo mặt', price: '100.000đ' },
      { name: 'Cắt - Gội - Cạo mặt', price: '200.000đ' },
    ],
  },
];

function ServiceColumn({ label, groups }: { label: string; groups: ServiceGroup[] }) {
  return (
    <div>
      <h3
        className="mb-10 text-[28px] tracking-tight text-[#2a221c] md:mb-12 md:text-[32px]"
        style={{ fontFamily: "'Newsreader', serif", fontWeight: 500 }}
      >
        {label}
      </h3>

      {groups.map((group) => (
        <div key={group.title} className="mb-10 last:mb-0 md:mb-12">
          <h4
            className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[#7a6b5d]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {group.title}
          </h4>
          <div className="divide-y divide-[#2a221c]/8">
            {group.services.map((service) => (
              <div key={service.name} className="flex items-baseline gap-3 py-2.5 first:pt-0">
                <span
                  className="min-w-0 text-[16px] leading-[1.5] text-[#2a221c] md:text-[17px]"
                  style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
                >
                  {service.name}
                </span>
                <span className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-[#2a221c]/25" aria-hidden="true" />
                <span
                  className="shrink-0 text-right text-[13px] font-medium tracking-[-0.01em] text-[#2a221c] md:text-[14px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPricing() {
  return (
    <section id="services-pricing" aria-label="Services and pricing" className="bg-[#FAF8F5] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#7a6b5d]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Bảng Giá · Full Menu
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#2a221c] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Dịch Vụ & Bảng Giá
          </h2>
          <p
            className="max-w-[500px] text-[14px] leading-[1.8] text-[#7a6b5d] md:text-[15px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Những dịch vụ được thực hiện với sự chăm chút trong từng chi tiết, dành riêng cho chất tóc và phong cách của bạn.
          </p>
        </div>

        <div className="grid gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
          <ServiceColumn label="Nữ" groups={WOMEN_SERVICES} />
          <ServiceColumn label="Nam" groups={MEN_SERVICES} />
        </div>
      </div>
    </section>
  );
}
