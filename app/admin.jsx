// ============================================================
// GAUBAO — Trang quản trị ẩn (admin).
// Mở bằng cách bấm logo "GAUBAO." 5 lần liên tiếp -> nhập mật khẩu.
// Cho phép: thêm/sửa/xoá sản phẩm, sửa banner & chữ trang chủ,
// quản lý cơ sở, đổi thông tin liên hệ. Lưu vào localStorage.
// ============================================================

// ---------- Hộp nhập mật khẩu ----------
function LoginModal({ onSuccess, onClose }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  const submit = (e) => {
    e.preventDefault();
    if (pw === window.GauBaoStore.ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setErr(true);
      setPw('');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-orange-100 relative">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-stone-600 transition"><i className="fas fa-times text-[20px]"></i></button>
        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
          <i className="fas fa-lock text-[26px]"></i>
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-1">Khu vực quản trị</h2>
        <p className="text-stone-500 text-sm mb-6">Nhập mật khẩu để vào trang chỉnh sửa nội dung.</p>
        <input
          ref={inputRef}
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          placeholder="Mật khẩu"
          className={`w-full px-4 py-3 rounded-xl border ${err ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50/50 mb-2`}
        />
        {err && <p className="text-red-500 text-sm mb-2 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> Sai mật khẩu, thử lại nhé!</p>}
        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-600/30 mt-3">Đăng nhập</button>
      </form>
    </div>
  );
}

// ---------- Tiện ích nhỏ ----------
function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(file);
  });
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-stone-700 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-stone-400 mt-1">{hint}</span>}
    </label>
  );
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50/50 text-sm';

// Ô nhập ảnh: dán đường dẫn/URL hoặc tải ảnh từ máy
function ImageInput({ value, onChange }) {
  const onPick = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = await fileToDataUrl(f);
    onChange(url);
  };
  return (
    <div className="flex gap-3 items-start">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 border border-gray-200 flex-shrink-0">
        {value ? <img src={value} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.opacity = 0.2; }} /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><i className="fas fa-image text-[24px]"></i></div>}
      </div>
      <div className="flex-1 space-y-2">
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="tên-file.jpg hoặc https://..." className={inputCls} />
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 cursor-pointer hover:text-orange-700">
          <i className="fas fa-upload"></i> Tải ảnh từ máy
          <input type="file" accept="image/*" className="hidden" onChange={onPick} />
        </label>
      </div>
    </div>
  );
}

// ---------- Form sản phẩm ----------
function ProductForm({ initial, onSave, onCancel }) {
  const [p, setP] = useState(initial);
  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const tagsStr = (p.tags || []).join(', ');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
          <h3 className="text-xl font-black text-stone-900">{initial.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
          <button onClick={onCancel} className="text-gray-300 hover:text-stone-600"><i className="fas fa-times text-[20px]"></i></button>
        </div>
        <div className="p-6 space-y-4">
          <Field label="Tên sản phẩm"><input className={inputCls} value={p.name} onChange={(e) => set('name', e.target.value)} placeholder="VD: Bánh bao xá xíu" /></Field>
          <Field label="Giá (VNĐ)"><input type="number" className={inputCls} value={p.price} onChange={(e) => set('price', parseInt(e.target.value, 10) || 0)} placeholder="24000" /></Field>
          <Field label="Ảnh sản phẩm"><ImageInput value={p.img} onChange={(v) => set('img', v)} /></Field>
          <Field label="Thành phần / mô tả"><textarea rows="3" className={inputCls + ' resize-none'} value={p.ingredients} onChange={(e) => set('ingredients', e.target.value)} placeholder="Bột mì, thịt heo, nấm hương..." /></Field>
          <Field label="Ghi chú (hiện dưới tên)"><input className={inputCls} value={p.note} onChange={(e) => set('note', e.target.value)} placeholder="Không chất bảo quản" /></Field>
          <Field label="Nhãn (cách nhau bởi dấu phẩy)" hint="VD: Best Seller, Chay, Đặc biệt"><input className={inputCls} value={tagsStr} onChange={(e) => set('tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} placeholder="Best Seller, Chay" /></Field>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white rounded-b-3xl">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-stone-600 hover:bg-gray-50 transition">Huỷ</button>
          <button onClick={() => onSave(p)} disabled={!p.name} className="flex-1 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition disabled:opacity-40 disabled:cursor-not-allowed">Lưu sản phẩm</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Trang quản trị chính ----------
function AdminPanel({ data, onCommit, onClose }) {
  const S = window.GauBaoStore;
  const [draft, setDraft] = useState(() => S.clone(data));
  const [tab, setTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null); // object đang sửa hoặc null
  const [toast, setToast] = useState('');
  const [dirty, setDirty] = useState(false);

  const update = (patch) => { setDraft((d) => ({ ...d, ...patch })); setDirty(true); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2200); };

  const commit = () => {
    const res = onCommit(draft);
    if (res && res.ok === false) {
      showToast('⚠ Dung lượng ảnh quá lớn, không lưu được. Hãy dùng đường dẫn ảnh thay vì tải ảnh nặng.');
    } else {
      setDirty(false);
      showToast('✓ Đã lưu! Trang chủ đã được cập nhật.');
    }
  };

  const tabs = [
    { id: 'products', label: 'Sản phẩm', icon: 'fa-bowl-food' },
    { id: 'hero', label: 'Banner & Chữ', icon: 'fa-image' },
    { id: 'stores', label: 'Cơ sở', icon: 'fa-store' },
    { id: 'contact', label: 'Liên hệ', icon: 'fa-address-book' },
    { id: 'email', label: 'Đơn hàng / Email', icon: 'fa-envelope-circle-check' },
  ];

  // ----- Sản phẩm -----
  const saveProduct = (p) => {
    setDraft((d) => {
      const exists = d.products.some((x) => x.id === p.id);
      const products = exists ? d.products.map((x) => (x.id === p.id ? p : x)) : [...d.products, p];
      return { ...d, products };
    });
    setDirty(true);
    setEditingProduct(null);
  };
  const deleteProduct = (id) => {
    if (!confirm('Xoá sản phẩm này?')) return;
    update({ products: draft.products.filter((x) => x.id !== id) });
  };

  // ----- Banner -----
  const moveBanner = (i, dir) => {
    const arr = [...draft.banners];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    update({ banners: arr });
  };

  // ----- Cơ sở -----
  const addStore = () => update({ stores: [...draft.stores, { id: 's' + Date.now(), name: '', address: '', mapLink: '' }] });
  const setStore = (id, k, v) => update({ stores: draft.stores.map((s) => (s.id === id ? { ...s, [k]: v } : s)) });
  const delStore = (id) => { if (confirm('Xoá cơ sở này?')) update({ stores: draft.stores.filter((s) => s.id !== id) }); };

  return (
    <div className="fixed inset-0 z-[150] bg-[#FBF8F3] flex flex-col">
      {/* Thanh trên */}
      <div className="bg-stone-900 text-white px-4 md:px-8 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tighter">GAU<span className="text-orange-500">BAO.</span></span>
          <span className="text-xs bg-orange-600 px-2.5 py-1 rounded-full font-bold">QUẢN TRỊ</span>
        </div>
        <div className="flex items-center gap-3">
          {dirty && <span className="hidden sm:inline text-xs text-amber-300 font-medium"><i className="fas fa-circle text-[8px] mr-1.5 animate-pulse"></i>Có thay đổi chưa lưu</span>}
          <button onClick={commit} className="bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2"><i className="fas fa-save"></i> Lưu thay đổi</button>
          <button onClick={onClose} className="px-3 py-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition text-sm font-semibold flex items-center gap-2"><i className="fas fa-eye"></i> <span className="hidden sm:inline">Xem trang</span></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-16 md:w-56 bg-white border-r border-stone-100 flex-shrink-0 py-4 flex flex-col">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-3 px-4 md:px-6 py-3.5 text-sm font-semibold transition ${tab === t.id ? 'text-orange-600 bg-orange-50 border-r-4 border-orange-600' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}`}>
              <i className={`fas ${t.icon} text-[18px] w-5 text-center`}></i>
              <span className="hidden md:inline">{t.label}</span>
            </button>
          ))}
          <div className="mt-auto px-4 md:px-6 pt-4">
            <button onClick={() => { if (confirm('Khôi phục toàn bộ dữ liệu về mặc định? Mọi chỉnh sửa sẽ mất.')) { const fresh = S.resetData(); setDraft(S.clone(fresh)); onCommit(fresh); setDirty(false); showToast('Đã khôi phục mặc định.'); } }} className="text-xs text-stone-400 hover:text-red-500 transition flex items-center gap-2"><i className="fas fa-rotate-left"></i> <span className="hidden md:inline">Khôi phục mặc định</span></button>
          </div>
        </nav>

        {/* Nội dung */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          {/* ===== TAB SẢN PHẨM ===== */}
          {tab === 'products' && (
            <div className="max-w-5xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-stone-900">Sản phẩm <span className="text-stone-400 font-bold">({draft.products.length})</span></h2>
                  <p className="text-stone-500 text-sm">Thêm, sửa, xoá các loại bánh bao hiển thị trên thực đơn.</p>
                </div>
                <button onClick={() => setEditingProduct({ id: '', name: '', price: 0, img: '', ingredients: '', note: '', tags: [] })} className="bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-700 transition flex items-center gap-2 flex-shrink-0"><i className="fas fa-plus"></i> Thêm sản phẩm</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {draft.products.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-stone-100 p-3 flex gap-3 shadow-sm">
                    <img src={p.img} alt="" className="w-16 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0" onError={(e) => { e.target.src = window.FALLBACK_IMG; }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-800 text-sm leading-tight line-clamp-2">{p.name || '(chưa có tên)'}</p>
                      <p className="text-orange-600 font-black text-sm mt-1">{p.price.toLocaleString('vi-VN')}đ</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => setEditingProduct(S.clone(p))} className="text-xs font-semibold text-stone-500 hover:text-orange-600"><i className="fas fa-pen mr-1"></i>Sửa</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-xs font-semibold text-stone-400 hover:text-red-500"><i className="fas fa-trash mr-1"></i>Xoá</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TAB BANNER & CHỮ ===== */}
          {tab === 'hero' && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="text-2xl font-black text-stone-900 mb-1">Chữ trên đầu trang</h2>
                <p className="text-stone-500 text-sm mb-5">Nội dung chữ hiển thị ở khu vực đầu trang chủ.</p>
                <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4 shadow-sm">
                  <Field label="Nhãn nhỏ (badge)"><input className={inputCls} value={draft.hero.badge} onChange={(e) => update({ hero: { ...draft.hero, badge: e.target.value } })} /></Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Tiêu đề (dòng 1)"><input className={inputCls} value={draft.hero.titleTop} onChange={(e) => update({ hero: { ...draft.hero, titleTop: e.target.value } })} /></Field>
                    <Field label="Tiêu đề nhấn (cam)"><input className={inputCls} value={draft.hero.titleHighlight} onChange={(e) => update({ hero: { ...draft.hero, titleHighlight: e.target.value } })} /></Field>
                  </div>
                  <Field label="Mô tả"><textarea rows="3" className={inputCls + ' resize-none'} value={draft.hero.subtitle} onChange={(e) => update({ hero: { ...draft.hero, subtitle: e.target.value } })} /></Field>
                  <Field label="Chữ trên nút bấm"><input className={inputCls} value={draft.hero.ctaText} onChange={(e) => update({ hero: { ...draft.hero, ctaText: e.target.value } })} /></Field>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-2xl font-black text-stone-900">Ảnh slide banner</h2>
                  <button onClick={() => update({ banners: [...draft.banners, ''] })} className="bg-orange-600 text-white px-3 py-2 rounded-lg font-bold text-xs hover:bg-orange-700 transition flex items-center gap-2"><i className="fas fa-plus"></i> Thêm ảnh</button>
                </div>
                <p className="text-stone-500 text-sm mb-5">Các ảnh tự động chuyển vòng tròn ở đầu trang.</p>
                <div className="space-y-3">
                  {draft.banners.map((b, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-stone-400">Ảnh #{i + 1}</span>
                        <div className="flex gap-1">
                          <button onClick={() => moveBanner(i, -1)} disabled={i === 0} className="w-7 h-7 rounded-lg text-stone-400 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30"><i className="fas fa-arrow-up text-[12px]"></i></button>
                          <button onClick={() => moveBanner(i, 1)} disabled={i === draft.banners.length - 1} className="w-7 h-7 rounded-lg text-stone-400 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30"><i className="fas fa-arrow-down text-[12px]"></i></button>
                          <button onClick={() => update({ banners: draft.banners.filter((_, k) => k !== i) })} className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50"><i className="fas fa-trash text-[12px]"></i></button>
                        </div>
                      </div>
                      <ImageInput value={b} onChange={(v) => { const arr = [...draft.banners]; arr[i] = v; update({ banners: arr }); }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== TAB CƠ SỞ ===== */}
          {tab === 'stores' && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-stone-900">Cơ sở / Chi nhánh</h2>
                  <p className="text-stone-500 text-sm">Danh sách cửa hàng hiển thị ở chân trang.</p>
                </div>
                <button onClick={addStore} className="bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-700 transition flex items-center gap-2 flex-shrink-0"><i className="fas fa-plus"></i> Thêm cơ sở</button>
              </div>
              <div className="space-y-4">
                {draft.stores.map((s) => (
                  <div key={s.id} className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm space-y-3 relative">
                    <button onClick={() => delStore(s.id)} className="absolute top-4 right-4 text-stone-300 hover:text-red-500"><i className="fas fa-trash text-[16px]"></i></button>
                    <Field label="Tên cơ sở"><input className={inputCls} value={s.name} onChange={(e) => setStore(s.id, 'name', e.target.value)} placeholder="Cơ sở 1: ..." /></Field>
                    <Field label="Địa chỉ"><input className={inputCls} value={s.address} onChange={(e) => setStore(s.id, 'address', e.target.value)} placeholder="Số nhà, đường, quận..." /></Field>
                    <Field label="Link bản đồ (Google Maps)"><input className={inputCls} value={s.mapLink} onChange={(e) => setStore(s.id, 'mapLink', e.target.value)} placeholder="https://maps.app.goo.gl/..." /></Field>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TAB LIÊN HỆ ===== */}
          {tab === 'contact' && (
            <div className="max-w-xl">
              <h2 className="text-2xl font-black text-stone-900 mb-1">Thông tin liên hệ</h2>
              <p className="text-stone-500 text-sm mb-5">Dùng cho nút gọi/Zalo/Facebook/bản đồ và số điện thoại trên đầu trang.</p>
              <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4 shadow-sm">
                <Field label="Số điện thoại"><input className={inputCls} value={draft.contact.phone} onChange={(e) => update({ contact: { ...draft.contact, phone: e.target.value } })} placeholder="0981234567" /></Field>
                <Field label="Link Zalo"><input className={inputCls} value={draft.contact.zalo} onChange={(e) => update({ contact: { ...draft.contact, zalo: e.target.value } })} placeholder="https://zalo.me/..." /></Field>
                <Field label="Link Facebook / Messenger"><input className={inputCls} value={draft.contact.facebook} onChange={(e) => update({ contact: { ...draft.contact, facebook: e.target.value } })} placeholder="https://m.me/..." /></Field>
                <Field label="Link bản đồ chính"><input className={inputCls} value={draft.contact.map} onChange={(e) => update({ contact: { ...draft.contact, map: e.target.value } })} placeholder="https://goo.gl/maps/..." /></Field>
              </div>
            </div>
          )}

          {/* ===== TAB ĐƠN HÀNG / EMAIL ===== */}
          {tab === 'email' && (
            <div className="max-w-xl">
              <h2 className="text-2xl font-black text-stone-900 mb-1">Gửi email đơn hàng</h2>
              <p className="text-stone-500 text-sm mb-5">Khi khách bấm "Xác nhận đơn hàng", hệ thống gửi email cho admin và cho khách. Cần cấu hình EmailJS (miễn phí).</p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex gap-3">
                <i className="fas fa-circle-info text-amber-500 text-[18px] mt-0.5"></i>
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Chưa biết lấy các mã này ở đâu?</p>
                  <p>Mở file hướng dẫn <a href="huong-dan-email.html" target="_blank" className="font-bold underline hover:text-amber-900">huong-dan-email.html</a> — có các bước tạo tài khoản EmailJS và mẫu email đẹp để dán vào.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4 shadow-sm">
                <label className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <span className="text-sm font-bold text-stone-800">Bật gửi email tự động</span>
                  <button onClick={() => update({ email: { ...draft.email, enabled: !draft.email.enabled } })} className={`relative w-12 h-7 rounded-full transition ${draft.email.enabled ? 'bg-orange-600' : 'bg-stone-300'}`}>
                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${draft.email.enabled ? 'left-6' : 'left-1'}`}></span>
                  </button>
                </label>
                <Field label="Email admin nhận đơn"><input className={inputCls} value={draft.email.adminEmail} onChange={(e) => update({ email: { ...draft.email, adminEmail: e.target.value } })} placeholder="gaubao.donhang@gmail.com" /></Field>
                <Field label="EmailJS — Public Key"><input className={inputCls} value={draft.email.publicKey} onChange={(e) => update({ email: { ...draft.email, publicKey: e.target.value } })} placeholder="VD: 4kP2..." /></Field>
                <Field label="EmailJS — Service ID"><input className={inputCls} value={draft.email.serviceId} onChange={(e) => update({ email: { ...draft.email, serviceId: e.target.value } })} placeholder="VD: service_xxx" /></Field>
                <Field label="Template ID — gửi cho ADMIN" hint="Mẫu chứa đầy đủ thông tin đơn"><input className={inputCls} value={draft.email.templateAdmin} onChange={(e) => update({ email: { ...draft.email, templateAdmin: e.target.value } })} placeholder="VD: template_admin" /></Field>
                <Field label="Template ID — gửi cho KHÁCH" hint="Mẫu cảm ơn / xác nhận đơn"><input className={inputCls} value={draft.email.templateCustomer} onChange={(e) => update({ email: { ...draft.email, templateCustomer: e.target.value } })} placeholder="VD: template_khach" /></Field>
              </div>

              {draft.email.enabled && (!draft.email.publicKey || !draft.email.serviceId) && (
                <p className="text-sm text-red-500 font-medium mt-3"><i className="fas fa-triangle-exclamation mr-1"></i> Đã bật nhưng chưa đủ Public Key / Service ID — email sẽ không gửi được.</p>
              )}

              <div className="mt-8 bg-white rounded-2xl border border-stone-100 p-5 space-y-4 shadow-sm">
                <label className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <span className="text-sm font-bold text-stone-800">Bật lưu đơn lên Google Sheet</span>
                  <button onClick={() => update({ sheet: { ...draft.sheet, enabled: !draft.sheet.enabled } })} className={`relative w-12 h-7 rounded-full transition ${draft.sheet.enabled ? 'bg-orange-600' : 'bg-stone-300'}`}>
                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${draft.sheet.enabled ? 'left-6' : 'left-1'}`}></span>
                  </button>
                </label>
                <Field label="Google Apps Script URL" hint="URL web app do Google Apps Script tạo, dùng để ghi đơn vào Sheet.">
                  <input className={inputCls} value={draft.sheet.endpoint} onChange={(e) => update({ sheet: { ...draft.sheet, endpoint: e.target.value } })} placeholder="https://script.google.com/macros/s/xxxx/exec" />
                </Field>
                {draft.sheet.enabled && !draft.sheet.endpoint && (
                  <p className="text-sm text-red-500 font-medium"><i className="fas fa-triangle-exclamation mr-1"></i> Nhập URL Google Sheet để lưu đơn được kích hoạt.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {editingProduct && (
        <ProductForm
          initial={editingProduct.id ? editingProduct : { ...editingProduct, id: window.GauBaoStore.newId() }}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[160] bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl font-semibold text-sm animate-[fadeIn_0.2s_ease]">{toast}</div>
      )}
    </div>
  );
}

Object.assign(window, { LoginModal, AdminPanel });
