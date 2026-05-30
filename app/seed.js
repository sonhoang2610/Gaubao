// ============================================================
// GAUBAO — Dữ liệu gốc (seed). Lấy từ product.csv & config.csv.
// Đây là dữ liệu mặc định; khi admin chỉnh sửa, bản mới sẽ được
// lưu vào localStorage và thay thế bản này.
// ============================================================

window.GAUBAO_SEED = {
  // --- Văn bản trên đầu trang (hero) ---
  hero: {
    badge: 'Bánh Bao Cao Cấp Từ 2020',
    titleTop: 'Bánh Bao',
    titleHighlight: 'Cao Cấp',
    subtitle:
      'Hoàn toàn không chất bảo quản. GAUBAO tự hào mang đến những chiếc bánh bao nóng hổi, nguyên cám tốt cho sức khỏe với lớp nhân thượng hạng.',
    ctaText: 'Đặt Hàng Ngay',
  },

  // --- Ảnh slide banner (hero media). Có thể là tên file hoặc URL. ---
  banners: ['banh1.jpeg', 'thapcamdacbiet.jpg', 'haisanpesto.jpg'],

  // --- Thông tin liên hệ ---
  contact: {
    phone: '0981234567',
    zalo: 'https://zalo.me/0981234567',
    facebook: 'https://www.facebook.com/messages/t/100044635860172/',
    map: 'https://goo.gl/maps/f3Cyefm6y1A2',
  },

  // --- Cấu hình gửi email đơn hàng (EmailJS) ---
  // Để trống = chưa bật. Điền trong trang quản trị > tab "Đơn hàng / Email".
  email: {
    enabled: false,
    publicKey: '',        // EmailJS Public Key
    serviceId: '',        // EmailJS Service ID
    templateAdmin: '',    // Template ID gửi cho admin
    templateCustomer: '', // Template ID gửi cho khách
    adminEmail: '',       // Email admin nhận đơn
  },

  // --- Cơ sở / chi nhánh ---
  stores: [
    {
      id: 's1',
      name: 'Cơ sở 1: Hoàng Văn Thái',
      address: '293 Hoàng Văn Thái, P. Khương Trung, Thanh Xuân, Hà Nội',
      mapLink: 'https://maps.app.goo.gl/9zdDNYz9RFZ3h92j9',
    },
    {
      id: 's2',
      name: 'Cơ sở 2: Bạch Đằng',
      address: 'Ngõ 639 Bạch Đằng, Quận Hoàn Kiếm, Hà Nội',
      mapLink: 'https://goo.gl/maps/f3Cyefm6y1A2',
    },
  ],

  // --- Sản phẩm ---
  products: [
    { id: '1', name: 'Bánh bông lan chuối yến mạch 500g', price: 65000, img: 'banhchuoi.jpg', tags: [], ingredients: 'Bột mì trắng 85% (Vimaflour), bột yến mạch nguyên hạt 15% (Quaker), trứng gà tươi (Metro), chuối tiêu (25%), đường kính (Vinasugar1), sữa tươi (TH True milk), sữa bột (Synlait - Newzeland), dầu ăn (Tường An)...', note: 'Bánh hoàn toàn không dùng chất bảo quản. Lưu ý: Bánh không dùng cho người tiểu đường.' },
    { id: '2', name: 'Bánh bao thập cẩm 2 trứng cút', price: 22000, img: 'thapcam2trungcut.jpg', tags: [], ingredients: 'Bột mì trắng (Vimaflour), đường kính, muối, nấm men (Lesaffre), bột nở, nhân thịt thập cẩm (thịt heo - Metro, miến, mộc nhĩ, nấm hương, dầu Tường An, hành, nước mắm, dầu hào), trứng chim cút.', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '3', name: 'Bánh bao gà nấm phomai', price: 24000, img: 'ganam.jpg', tags: [], ingredients: 'Bột mì trắng (Vimaflour), đường (Vinasugar1), nấm men (Lesaffre), bột nở, thịt gà, nấm hương, phomai cream cheese (Anchor), dầu hào, xì dầu, bột ngô….', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '4', name: 'Bánh bao xá xíu Thượng Hải', price: 24000, img: 'xxth.jpg', tags: ['Best Seller'], ingredients: 'Bột mì trắng (Vimaflour), đường (Vinasugar1), nấm men (Lesaffre), bột nở, nhân thịt xá xíu (thịt heo Metro, rau mùi, vừng, xì dầu, tương, chao, ngũ vị hương, ớt, dầu Tường An, hành, tỏi, bột ngô, màu thực phẩm - Nhất Hương)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '5', name: 'Bánh bao hải sản Pesto', price: 29000, img: 'haisanpesto.jpg', tags: ['Đặc biệt'], ingredients: 'Thịt lợn, tôm tươi, thanh cua, phomai Mozzarella, phomai Anchor, kem tươi Anchor, bột mì, đường, nấm men, bột nở, sốt Pesto (lá húng tây, oregano, hạt óc chó, phomai…).', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '6', name: 'Bánh bao chay vỏ cốm tươi không nhân', price: 15000, img: 'comtuoi.jpg', tags: ['Chay'], ingredients: 'Bột mì trắng (Vimaflour), cốm tươi (10% trong bột), đường kính (Vinasugar1), muối, nấm men, bột nở, lá dứa tươi, sữa bột (Newzeland)…', note: 'Bánh hoàn toàn không dùng chất bảo quản, hương liệu, phẩm màu' },
    { id: '7', name: 'Bánh bao bò sốt tiêu', price: 27000, img: 'bosottieu.jpg', tags: [], ingredients: 'Bột mì (Vimaflour), đường (Vinasugar1), nấm men (Lesaffre), bột nở, nhân thịt bò (thịt bắp bò Metro), hạt tiêu, dầu hào, xì dầu, sốt tiêu đen, dầu ăn, hành, tỏi, bột bắp)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '8', name: 'Bánh bao xá xíu trứng muối', price: 26000, img: 'xxtrungmuoi.jpg', tags: [], ingredients: 'Bột mì (Vimaflour), đường (Vinasugar1), nấm men (Lesaffre), trứng vịt muối, bột nở, nhân thịt xá xíu (thịt heo Metro, rau mùi, vừng, xì dầu, tương, chao, ngũ vị hương, ớt, dầu Tường An, hành, tỏi, bột ngô, màu thực phẩm - Nhất Hương)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '9', name: 'Bánh bao xá xíu phomai', price: 27000, img: 'xxphomai.jpg', tags: [], ingredients: 'Bột mì (Vimaflour), đường (Vinasugar1), nấm men (Lesaffre), trứng vịt muối, bột nở, nhân thịt xá xíu (thịt heo Metro, phomai Mozzarella, rau mùi, vừng, xì dầu, tương, chao, ngũ vị hương, ớt, dầu Tường An, hành, tỏi, bột ngô, màu thực phẩm - Nhất Hương)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '10', name: 'Bánh bao thập cẩm lạp xưởng', price: 22000, img: 'thapcamlapxuong.jpg', tags: [], ingredients: 'Bột mì (Vimaflour), đường, muối, nấm men (Lesaffre), bột nở, nhân thịt thập cẩm (thịt heo - Metro, miến, mộc nhĩ, nấm hương, dầu Tường An, hành, nước mắm, dầu hào), lạp xưởng.', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '11', name: 'Bánh bao gà nấm bột nguyên cám', price: 25000, img: 'ganamnguyencam.jpg', tags: ['Nguyên cám'], ingredients: 'Bột mì nguyên cám (35%), bột mì trắng (65%), đường (Vinasugar1), nấm men (Lesaffre), bột nở, thịt gà, nấm hương, phomai cream cheese (Anchor), dầu hào, xì dầu, hạt ngô nếp….', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '12', name: 'Bánh bao bò phomai', price: 29000, img: 'bophomai.jpg', tags: [], ingredients: 'Thịt (bò 75%, lợn 25%), sốt cà chua, bột mì, đường, nấm men, bột nở, dầu hào, xì dầu, dầu ăn, tỏi, bột bắp)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '13', name: 'Bánh bao xúc xích phomai', price: 24000, img: 'xucxichphomai.jpg', tags: [], ingredients: 'Phomai Mozzarella, cream cheese Anchor, xúc xích Đức Việt, bột mì, đường, nấm men, bột nở...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '14', name: 'Bánh bao bò phomai nguyên cám', price: 29000, img: 'phomainguyencam.jpg', tags: ['Nguyên cám'], ingredients: 'Thịt (bò 80%, lợn 20%), sốt cà chua, bột mì nguyên cám (35%), bột mì trắng (65%), đường, nấm men, bột nở, dầu hào, xì dầu, dầu ăn, tỏi, bột bắp)...', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '15', name: 'Bánh bao thập cẩm đặc biệt', price: 27000, img: 'thapcamdacbiet.jpg', tags: ['Đặc biệt'], ingredients: 'Bột mì trắng (Vimaflour), đường, muối, nấm men (Lesaffre), bột nở, nhân thịt thập cẩm (thịt heo - Metro, miến, mộc nhĩ, nấm hương, dầu Tường An, hành, nước mắm, dầu hào), trứng vịt muối, trứng chim cút, lạp xưởng.', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '16', name: 'Bánh bao chay nguyên cám', price: 12000, img: 'chaynguyencam.jpg', tags: ['Chay', 'Nguyên cám'], ingredients: 'Bột mì nguyên cám (35%), bột mì trắng (65%), đường, nấm men, bột nở.', note: 'Bánh hoàn toàn không dùng chất bảo quản' },
    { id: '17', name: 'Bánh bao Cadé trứng muối', price: 15000, img: 'cadetrungmuoi.jpg', tags: [], ingredients: 'Bánh bao nhân ngọt, trứng chảy, trứng muối xay mịn trộn cùng nhân. Bánh 60g.', note: '' },
    { id: '18', name: 'Bánh bao Chocolate phomai', price: 19000, img: 'chocolatephomai.jpg', tags: [], ingredients: 'Bánh bao Chocolate kết hợp 02 loại phomai nguyên chất 55%, đặc biệt thơm ngon.', note: '' },
    { id: '19', name: 'Bánh bao rau củ phomai', price: 18000, img: 'raucuphomai.jpg', tags: ['Chay'], ingredients: 'Bánh gồm cream cheese, phomai Mozzarella, rau củ tổng hợp.', note: '' },
    { id: '20', name: 'Bánh bao sữa chua phomai', price: 19000, img: 'suachuaphofai.jpg', tags: [], ingredients: '', note: '' },
    { id: '21', name: 'Bánh bao chay trắng', price: 9000, img: 'chaytrang.jpg', tags: ['Chay'], ingredients: 'Bột mì trắng, đường trắng tinh luyện, muối, men.', note: '' },
    { id: '22', name: 'Bánh bao cốm xào', price: 20000, img: 'com xao.jpg', tags: [], ingredients: 'Cốm tươi nguyên chất xào với dừa tươi, hương vị rất thơm ngon.', note: '' },
    { id: '23', name: 'Bánh bao đậu xanh hạt sen', price: 16000, img: 'dauxanhhatsen.jpg', tags: [], ingredients: 'Bánh bao gồm đậu xanh xay nhuyễn, hạt sen hầm nhừ, mứt bí, đường kính, bột mì trắng.', note: 'Bánh không dùng hương liệu hay chất bảo quản.' },
  ],
};
