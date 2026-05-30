// ============================================================
// GAUBAO — Lớp dữ liệu (data store).
// Đọc / ghi toàn bộ nội dung site vào localStorage để các chỉnh
// sửa của admin được lưu lại sau khi tải lại trang.
// ============================================================

(function () {
  const KEY = 'gaubao_data_v1';
  const ADMIN_PASSWORD = 'Kuong69';

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Hợp nhất bản lưu với seed để bổ sung field mới nếu có.
  function withDefaults(saved) {
    const seed = window.GAUBAO_SEED;
    return {
      hero: { ...clone(seed.hero), ...(saved.hero || {}) },
      banners: Array.isArray(saved.banners) ? saved.banners : clone(seed.banners),
      contact: { ...clone(seed.contact), ...(saved.contact || {}) },
      email: { ...clone(seed.email), ...(saved.email || {}) },
      sheet: { ...clone(seed.sheet), ...(saved.sheet || {}) },
      stores: Array.isArray(saved.stores) ? saved.stores : clone(seed.stores),
      products: Array.isArray(saved.products) ? saved.products : clone(seed.products),
    };
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(window.GAUBAO_SEED);
      return withDefaults(JSON.parse(raw));
    } catch (e) {
      console.warn('Không đọc được dữ liệu đã lưu, dùng mặc định.', e);
      return clone(window.GAUBAO_SEED);
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return { ok: true };
    } catch (e) {
      // Thường gặp khi ảnh base64 quá lớn vượt hạn mức ~5MB.
      console.error('Lưu dữ liệu thất bại:', e);
      return { ok: false, error: e };
    }
  }

  function resetData() {
    localStorage.removeItem(KEY);
    return clone(window.GAUBAO_SEED);
  }

  function newId() {
    return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  window.GauBaoStore = {
    ADMIN_PASSWORD,
    loadData,
    saveData,
    resetData,
    newId,
    clone,
  };
})();
