// ============================================================
// GAUBAO — Giao diện công khai (public). Các component hiển thị
// cho khách hàng. Nhận dữ liệu qua props từ data store.
// ============================================================
const { useState, useEffect, useRef } = React;

// Ảnh bay vào giỏ khi bấm "thêm"
function FlyingImage({ anim }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 10);
    return () => clearTimeout(t);
  }, []);
  const targetX = window.innerWidth > 768 ? window.innerWidth - 120 : window.innerWidth - 60;
  const targetY = 25;
  return (
    <img
      src={anim.img}
      alt="flying"
      className="fixed z-[100] rounded-full object-cover shadow-2xl pointer-events-none"
      style={{
        width: '60px', height: '60px',
        left: active ? targetX : anim.startX, top: active ? targetY : anim.startY,
        opacity: active ? 0 : 1, transform: active ? 'scale(0.1)' : 'scale(1)',
        transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    />
  );
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 border border-orange-50 group flex flex-col h-full relative">
      <div className="relative h-56 md:h-64 rounded-[1.5rem] overflow-hidden mb-5 bg-stone-100">
        <img
          src={product.img} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide z-10">
            {product.tags[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-stone-900/95 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center p-5 translate-y-2 group-hover:translate-y-0 z-20 backdrop-blur-sm cursor-default overflow-y-auto">
          <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2 flex-shrink-0">
            <i className="fas fa-info-circle text-[18px]"></i> Thông tin chi tiết
          </h4>
          <p className="text-sm text-gray-200 mb-4 leading-relaxed"><span className="font-semibold text-white">Thành phần: </span>{product.ingredients || 'Đang cập nhật...'}</p>
          {product.note && (
            <div className="mt-auto pt-3 border-t border-gray-600">
              <p className="text-xs text-orange-200 font-medium italic"><i className="fas fa-star mr-1"></i> {product.note}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow px-2">
        <h3 className="text-xl font-bold text-stone-800 mb-2 leading-tight group-hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
        <p className="text-stone-500 text-xs mb-6 flex items-start gap-1.5 font-medium line-clamp-2">
          <i className="fas fa-leaf text-[12px] text-orange-500 mt-0.5"></i>{product.note ? product.note : 'Hoàn toàn không dùng chất bảo quản'}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-black text-orange-600">{product.price.toLocaleString('vi-VN')}đ</span>
          <button onClick={(e) => onAddToCart(product, e)} className="bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 relative z-30">
            <i className="fas fa-shopping-cart text-[20px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactHUD({ contact }) {
  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col gap-3 items-center">
      <a href={contact.map} target="_blank" rel="noreferrer" className="w-11 h-11 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(34,197,94,0.4)] hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer">
        <i className="fas fa-map-marker-alt text-[20px]"></i>
      </a>
      <a href={contact.zalo} target="_blank" rel="noreferrer" className="w-11 h-11 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer font-black text-[11px] tracking-wider">
        Zalo
      </a>
      <a href={contact.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer">
        <i className="fab fa-facebook-messenger text-[22px] fill-current"></i>
      </a>
      <a href={`tel:${contact.phone}`} className="w-14 h-14 mt-1 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.6)] hover:scale-110 transition-all cursor-pointer animate-bounce relative">
        <i className="fas fa-phone-alt text-[26px] animate-pulse"></i>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </a>
    </div>
  );
}

function PublicHeader({ contact, cartCount, onCartOpen, onLogoClick, isPlain }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer select-none" onClick={onLogoClick} title="GAUBAO">
            <span className="text-3xl font-black tracking-tighter text-orange-600">GAU<span className="text-stone-800">BAO.</span></span>
          </div>
          {!isPlain && (
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-stone-800 hover:text-orange-600 font-semibold transition" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>Trang chủ</a>
              <a href="#menu" className="text-stone-800 hover:text-orange-600 font-semibold transition">Thực đơn</a>
              <a href="#stores" className="text-stone-800 hover:text-orange-600 font-semibold transition">Cơ sở</a>
            </nav>
          )}
          <div className="flex items-center space-x-5">
            <div className="hidden md:flex items-center text-stone-600">
              <i className="fas fa-phone-alt text-[18px] mr-2 text-orange-600"></i>
              <span className="font-bold text-sm">{contact.phone}</span>
            </div>
            <button className="relative p-2 text-stone-800 hover:text-orange-600 transition" onClick={onCartOpen}>
              <i className="fas fa-shopping-cart text-[24px]"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ hero, banners }) {
  const [idx, setIdx] = useState(0);
  const list = banners && banners.length ? banners : [FALLBACK_IMG];
  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % list.length), 3000);
    return () => clearInterval(i);
  }, [list.length]);
  return (
    <section className="pt-28 pb-16 px-4 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center space-x-2 bg-orange-100/80 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span><span>{hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-stone-900 mb-6 leading-[1.15]">{hero.titleTop}<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">{hero.titleHighlight}</span></h1>
          <p className="text-stone-600 text-lg md:text-xl mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="#menu" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 flex items-center justify-center">{hero.ctaText} <i className="fas fa-chevron-right text-[20px] ml-1"></i></a>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-200/50 rounded-full blur-3xl -z-10"></div>
          <div className="relative rounded-full p-2 bg-white/50 backdrop-blur-sm border border-white/50 shadow-2xl">
            <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-inner bg-stone-100">
              {list.map((src, i) => {
                const isVideo = typeof src === 'string' && src.endsWith('.mp4');
                return isVideo ? (
                  <video key={i} src={src} autoPlay loop muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} />
                ) : (
                  <img key={i} src={src} alt="Bánh Bao" onError={(e) => { e.target.src = FALLBACK_IMG; }} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} />
                );
              })}
            </div>
            <div className="absolute -bottom-4 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-orange-50 animate-bounce z-20" style={{ animationDuration: '3s' }}>
              <div className="bg-orange-100 p-2 rounded-full text-orange-600"><i className="fas fa-leaf text-[24px]"></i></div>
              <div><p className="text-xs text-stone-500 font-medium">Nguyên liệu</p><p className="font-bold text-stone-800">100% Tự nhiên</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu({ products, onAddToCart }) {
  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto min-h-[500px]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-4">Thực Đơn <span className="text-orange-600">Hôm Nay</span></h2>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">Khám phá những chiếc bánh bao thủ công được làm bằng tình yêu và sự tỉ mỉ.</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center text-stone-500 font-medium py-10 border-2 border-dashed border-gray-200 rounded-2xl">Chưa có sản phẩm nào. Vào trang quản trị để thêm sản phẩm!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
        </div>
      )}
    </section>
  );
}

function Footer({ stores }) {
  return (
    <footer id="stores" className="bg-stone-900 text-stone-300 py-16 border-t-8 border-orange-600 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="text-3xl font-black tracking-tighter text-white mb-6">GAU<span className="text-orange-500">BAO.</span></div>
          <p className="text-stone-400 leading-relaxed">Hương vị bánh bao cao cấp, chuẩn vị Thượng Hải. Chăm chút từ lớp vỏ mềm xốp đến nhân bánh đậm đà.</p>
        </div>
        <div className="lg:col-span-2">
          <h4 className="text-white font-bold text-lg mb-6">Hệ Thống Cửa Hàng</h4>
          <div className="space-y-6">
            {stores.map((store) => (
              <div key={store.id} className="flex items-start space-x-3 group">
                <i className="fas fa-map-marker-alt text-[20px] text-orange-500 flex-shrink-0 mt-1 group-hover:animate-bounce"></i>
                <div>
                  <p className="font-bold text-white group-hover:text-orange-400 transition cursor-pointer"><a href={store.mapLink} target="_blank" rel="noreferrer">{store.name}</a></p>
                  <p className="text-stone-400 mt-1">{store.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Theo Dõi</h4>
          <p className="text-stone-400 text-sm leading-relaxed">Đặt bánh nóng mỗi ngày. Giao tận nơi nội thành Hà Nội.</p>
        </div>
      </div>
    </footer>
  );
}

function CartSidebar({ open, items, onClose, totalPrice, updateQuantity, removeItem, onCheckout }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2"><i className="fas fa-shopping-cart text-[20px] text-orange-600"></i> Giỏ hàng của bạn</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"><i className="fas fa-times text-[20px]"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3"><i className="fas fa-shopping-cart text-[48px] opacity-20"></i><p>Giỏ hàng đang trống</p></div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="font-semibold text-sm text-stone-800 pr-6 leading-tight">{item.name}</h4>
                  <p className="font-bold text-orange-600 text-sm">{item.price.toLocaleString('vi-VN')}đ</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 hover:text-orange-600"><i className="fas fa-minus text-[14px]"></i></button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 hover:text-orange-600"><i className="fas fa-plus text-[14px]"></i></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition"><i className="fas fa-trash text-[16px]"></i></button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4"><span className="text-gray-500 font-medium">Tổng cộng:</span><span className="text-2xl font-black text-orange-600">{totalPrice.toLocaleString('vi-VN')}đ</span></div>
            <button onClick={onCheckout} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2">Tiến Hành Đặt Hàng <i className="fas fa-chevron-right text-[18px]"></i></button>
          </div>
        )}
      </div>
    </>
  );
}

Object.assign(window, {
  FlyingImage, ProductCard, ContactHUD, PublicHeader, Hero, Menu, Footer, CartSidebar, FALLBACK_IMG,
});
