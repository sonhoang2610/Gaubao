// ============================================================
// GAUBAO — Gửi email đơn hàng qua EmailJS.
// Tự sinh mã đơn, dựng bảng món, gửi cho admin & khách hàng.
// ============================================================

(function () {
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function genOrderCode() {
    const d = new Date();
    const ymd = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate());
    const rnd = Math.floor(1000 + Math.random() * 9000);
    return 'GB' + ymd + '-' + rnd;
  }

  function nowString() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())} - ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  function money(n) { return (n || 0).toLocaleString('vi-VN') + 'đ'; }

  // Dựng các dòng <tr> HTML cho bảng món trong email
  function buildItemsHtml(items) {
    return items.map((it) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f1ece4;color:#292524;font-size:14px;">${it.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1ece4;text-align:center;color:#78716c;font-size:14px;">x${it.quantity}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1ece4;text-align:right;color:#ea580c;font-weight:700;font-size:14px;white-space:nowrap;">${money(it.price * it.quantity)}</td>
      </tr>`).join('');
  }

  // Bản tóm tắt dạng text (dự phòng / dễ đọc)
  function buildItemsText(items) {
    return items.map((it) => `• ${it.name} x${it.quantity} = ${money(it.price * it.quantity)}`).join('\n');
  }

  // Gửi 2 email: admin + khách. Trả về Promise.
  // cfg: data.email ; order: {code,time,customer,items,total,shopName,shopPhone}
  async function sendOrderEmails(cfg, order) {
    if (!window.emailjs) throw new Error('Chưa tải được EmailJS SDK.');
    if (!cfg || !cfg.publicKey || !cfg.serviceId) throw new Error('Chưa cấu hình EmailJS.');

    emailjs.init({ publicKey: cfg.publicKey });

    const itemsHtml = buildItemsHtml(order.items);
    const itemsText = buildItemsText(order.items);

    const baseParams = {
      order_code: order.code,
      order_time: order.time,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email,
      customer_address: order.customer.address,
      customer_note: order.customer.note || '(không có)',
      items_block: itemsHtml,
      items_text: itemsText,
      total: money(order.total),
      shop_name: order.shopName || 'GAUBAO',
      shop_phone: order.shopPhone || '',
    };

    const jobs = [];

    // 1) Email cho admin (đầy đủ thông tin)
    if (cfg.templateAdmin && cfg.adminEmail) {
      jobs.push(emailjs.send(cfg.serviceId, cfg.templateAdmin, {
        ...baseParams,
        to_email: cfg.adminEmail,
        email_title: 'ĐƠN HÀNG MỚI',
      }));
    }

    // 2) Email xác nhận cho khách
    if (cfg.templateCustomer && order.customer.email) {
      jobs.push(emailjs.send(cfg.serviceId, cfg.templateCustomer, {
        ...baseParams,
        to_email: order.customer.email,
        email_title: 'CẢM ƠN BẠN ĐÃ ĐẶT HÀNG',
      }));
    }

    if (jobs.length === 0) throw new Error('Chưa đủ cấu hình template/email để gửi.');
    return Promise.all(jobs);
  }

  window.GauBaoEmail = { genOrderCode, nowString, money, sendOrderEmails };
})();
