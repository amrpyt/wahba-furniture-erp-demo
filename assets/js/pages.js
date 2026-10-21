/* =========================================================
   وهبة سيستم — شاشات النظام
   ========================================================= */

STATE.posPayment = 'مدى';
STATE.posDiscount = 0;
STATE.paidInvoices = STATE.paidInvoices || new Set();
let refreshCart = () => {};

/* ---------- عناصر مشتركة ---------- */
function headHTML({ eyebrow, title, sub, actions = '', back = false }) {
  return `
    <div class="page-head">
      <div>
        ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ''}
        <h1 class="page-title">${title}</h1>
        ${sub ? `<p class="page-sub">${sub}</p>` : ''}
      </div>
      <div class="page-actions">
        ${back ? `<a class="btn btn-ghost" href="#/inventory">${icon('arrowRight')} رجوع</a>` : ''}
        ${actions}
      </div>
    </div>`;
}

function sectionTitle(title, sub, extra = '') {
  return `<div class="card-head"><div><div class="card-title">${title}</div>${sub ? `<div class="card-sub">${sub}</div>` : ''}</div>${extra}</div>`;
}

/* =========================================================
   لوحة التحكم
   ========================================================= */
function dashboardHTML() {
  const k = kpis();
  const low = lowStock();
  const ySales = DB.orders.filter(o => o.offset === 1 && o.status !== 'ملغي').reduce((s, o) => s + orderTotal(o), 0);
  const delta = ySales ? ((k.sales - ySales) / ySales) * 100 : 0;
  const margin = k.sales ? Math.round((k.profit / k.sales) * 100) : 0;
  const pendingOrders = DB.orders.filter(o => o.status === 'قيد التجهيز').length;
  const series = salesSeries(7);
  const monthly = DB.monthly.slice(-6).map(m => ({ label: m.label, full: m.label, value: m.sales }));
  const tops = topProducts(5);
  const maxSold = tops[0]?.sold || 1;
  const team = DB.team;
  const todayLabel = dateLabel(isoOffset(0));

  return `
    <div class="dash-top">
      <div>
        <div class="eyebrow">${esc(WEEKDAYS_AR[new Date().getDay()])}، ${esc(todayLabel)}</div>
        <h1 class="dash-greeting">صباح الخير، أحمد</h1>
        <p class="dash-sub">المعرض اليوم فيه <b>${k.count} طلبات</b> بقيمة <b>${moneyPlain(k.sales)}</b>، و<b>${pendingOrders}</b> طلبات قيد التجهيز.</p>
      </div>
      <div class="page-actions">
        <button class="btn" id="dash-export">${icon('download')} تصدير ملخص اليوم</button>
        <a class="btn btn-primary" href="#/pos">${icon('plus')} طلب بيع جديد</a>
      </div>
    </div>

    ${low.length ? `
    <div class="alert-bar">
      ${icon('alert')}
      <span><b>${low.length} أصناف</b> وصلت حد الطلب — منها ${low.filter(p => p.stock === 0).length} نفد من المخزون.</span>
      <a class="link-more" href="#/inventory">استعراض المخزون ${icon('arrowLeft')}</a>
    </div>` : ''}

    <div class="kpi-strip">
      <div class="kpi">
        <div class="kpi-label">${icon('bag')} مبيعات اليوم</div>
        <div class="kpi-value">${money(k.sales)}</div>
        <div class="kpi-foot">
          <span class="kpi-delta ${delta >= 0 ? 'up' : 'down'}">${icon(delta >= 0 ? 'trendUp' : 'trendDown')} ${Math.abs(delta).toFixed(1)}%</span>
          <span class="kpi-note">مقارنة بالأمس</span>
        </div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('wallet')} صافي الربح</div>
        <div class="kpi-value">${money(k.profit)}</div>
        <div class="kpi-foot"><span class="kpi-note">هامش ${margin}% بعد التكلفة</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('receipt')} عدد الطلبات</div>
        <div class="kpi-value">${k.count} <span class="cur">${k.count === 1 ? 'طلب' : 'طلبات'}</span></div>
        <div class="kpi-foot"><span class="kpi-note">${pendingOrders} قيد التجهيز الآن</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('chart')} متوسط الطلب</div>
        <div class="kpi-value">${money(k.avg)}</div>
        <div class="kpi-foot"><span class="kpi-note">شامل ضريبة القيمة المضافة</span></div>
      </div>
    </div>

    <div class="dash-grid" style="margin-block-start:16px">
      <div class="card">
        ${sectionTitle('حركة المبيعات', 'القيمة شاملة الضريبة', `
          <div class="segmented" id="dash-range">
            <button class="seg active" data-range="week">7 أيام</button>
            <button class="seg" data-range="months">6 أشهر</button>
          </div>`)}
        <div class="card-body">
          <div class="chart-legend" style="margin-block-end:10px">
            <span class="legend-key"><i class="legend-swatch"></i> المبيعات</span>
            <span class="legend-key"><i class="legend-swatch" style="background:var(--accent)"></i> اليوم</span>
            <span style="margin-inline-start:auto">${icon('clock')} تحديث مباشر</span>
          </div>
          <div id="dash-chart">${barChartHTML(series)}</div>
        </div>
      </div>

      <div class="card">
        ${sectionTitle('الأكثر مبيعًا', 'خلال الشهر الحالي', `<a class="link-more" href="#/inventory">المخزون ${icon('arrowLeft')}</a>`)}
        <div class="card-body tight">
          <div class="top-list">
            ${tops.map((p, i) => `
              <div class="top-item">
                <span class="top-rank">${i + 1}</span>
                <img class="thumb" src="assets/img/${p.img}" alt="" loading="lazy" />
                <div class="top-main">
                  <div class="top-name">${esc(p.name)}</div>
                  <div class="top-meta">
                    <span>${p.sold} قطعة</span>
                    <div class="progress"><div class="progress-fill" style="width:${Math.round((p.sold / maxSold) * 100)}%"></div></div>
                  </div>
                </div>
                <span class="top-sales">${compact(p.sold * p.price)}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="dash-grid two" style="margin-block-start:16px">
      <div class="card">
        ${sectionTitle('مهام اليوم', `${DB.tasks.filter(t => !t.done).length} مهام متبقية`, `<span class="pill pill-gold">${icon('target')} أولوية</span>`)}
        <div class="card-body tight">
          <div class="task-list">
            ${DB.tasks.map(t => `
              <div class="task ${t.done ? 'done' : ''}" data-task="${t.id}">
                <button class="task-check" aria-label="${t.done ? 'إلغاء الإنجاز' : 'تعليم كمنجز'}" data-task-toggle="${t.id}">${icon('check')}</button>
                <div class="task-main">
                  <div class="task-title">${esc(t.title)}</div>
                  <div class="task-meta">
                    <span>${esc(t.meta)}</span>
                    <span>·</span>
                    <span class="${t.priority === 'متأخرة' ? 'late' : ''}">${esc(t.due)}</span>
                  </div>
                </div>
                ${t.priority === 'عالية' ? '<span class="task-pri" style="background:var(--danger-bg);color:var(--danger)">عالية</span>' : t.priority === 'متأخرة' ? '<span class="task-pri" style="background:var(--warning-bg);color:var(--warning)">متأخرة</span>' : ''}
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        ${sectionTitle('آخر الحركات', 'ما جرى في المعرض خلال 24 ساعة', `<button class="link-more" id="activity-all">عرض الكل ${icon('arrowLeft')}</button>`)}
        <div class="card-body tight">
          <div class="feed">
            ${DB.activity.map(a => {
              const u = teamById(a.userId);
              return `<div class="feed-item">
                ${avatarHTML(u)}
                <div class="feed-body">
                  <div class="feed-text"><b>${esc(u.name)}</b> ${esc(a.action)} <a href="#/${a.targetPage}">${esc(a.target)}</a></div>
                  <div class="feed-meta">${esc(a.meta)} · ${esc(a.time)}</div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function mountDashboard() {
  const chart = document.getElementById('dash-chart');
  const rangeWrap = document.getElementById('dash-range');
  const week = salesSeries(7);
  const months = DB.monthly.slice(-6).map(m => ({ label: m.label, full: m.label, value: m.sales }));
  rangeWrap?.addEventListener('click', (e) => {
    const b = e.target.closest('.seg');
    if (!b) return;
    rangeWrap.querySelectorAll('.seg').forEach(s => s.classList.toggle('active', s === b));
    chart.innerHTML = barChartHTML(b.dataset.range === 'week' ? week : months);
  });
  document.getElementById('dash-export')?.addEventListener('click', () => toast('تم تجهيز ملخص اليوم للتصدير (ديمو)'));
  document.getElementById('activity-all')?.addEventListener('click', () => toast('سجل الحركات الكامل متاح في التقارير (ديمو)'));
  document.querySelectorAll('[data-task-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.task');
      const task = DB.tasks.find(t => t.id === btn.dataset.taskToggle);
      task.done = !task.done;
      row.classList.toggle('done', task.done);
      toast(task.done ? 'تم تعليم المهمة كمنجزة' : 'أُعيدت المهمة إلى القائمة', task.done ? 'success' : 'info');
    });
  });
}

/* =========================================================
   نقطة البيع
   ========================================================= */
function posPageHTML() {
  return `
    ${headHTML({
      eyebrow: 'المبيعات',
      title: 'نقطة البيع',
      sub: 'اختر الأصناف، حدّد العميل وطريقة الدفع، ثم أتمّ البيع واطبع الفاتورة.',
      actions: `<button class="btn" id="pos-hold">${icon('clock')} تعليق الطلب</button>
                <a class="btn btn-ghost" href="#/sales">آخر الطلبات ${icon('arrowLeft')}</a>`,
    })}
    <div class="pos-layout">
      <div class="pos-main">
        <div class="search-field">
          ${icon('search')}
          <input class="input" id="pos-search" placeholder="ابحث بالاسم أو رمز الصنف…" aria-label="بحث في الأصناف" autocomplete="off" />
        </div>
        <div class="pos-cats" id="pos-cats">
          ${DB.categories.map((c, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
        </div>
        <div class="pos-grid" id="pos-grid"></div>
      </div>
      <div id="pos-cart">${cartHTML()}</div>
    </div>
    <div class="pos-mobile-bar" id="pos-mobile-bar" hidden>
      <div class="pmb-info"><span>السلة</span><b id="pmb-total">—</b></div>
      <span class="count-badge" id="pmb-count">0</span>
      <button class="btn btn-primary btn-sm" id="pmb-open">${icon('bag')} عرض السلة</button>
    </div>`;
}

function posProductsHTML(cat = 'الكل', query = '') {
  const q = query.trim();
  const list = DB.products.filter(p => {
    const inCat = cat === 'الكل' || p.cat === cat;
    const inQuery = !q || p.name.includes(q) || p.sku.toLowerCase().includes(q.toLowerCase());
    return inCat && inQuery;
  });
  if (!list.length) {
    return `<div class="empty" style="grid-column:1/-1"><div class="empty-icon">${icon('search')}</div><b>لا توجد أصناف مطابقة</b><p>جرّب كلمة أخرى أو صنفًا مختلفًا.</p></div>`;
  }
  return list.map(p => `
    <button class="pos-card" data-add="${p.id}" ${p.stock === 0 ? 'disabled style="opacity:.55;cursor:not-allowed"' : ''}>
      <div class="pos-img">
        <img src="assets/img/${p.img}" alt="${esc(p.name)}" loading="lazy" />
        ${p.stock > 0 ? `<span class="pos-add" aria-hidden="true">${icon('plus')}</span>` : ''}
      </div>
      <div class="pos-info">
        <div class="pos-name">${esc(p.name)}</div>
        <div class="pos-meta">
          <span>${p.cat}</span>
          <span class="pos-stock ${p.stock <= p.reorder ? 'low' : ''}">${p.stock === 0 ? 'نفد' : `${p.stock} متوفر`}</span>
        </div>
        <div class="pos-price">${money(p.price)}</div>
      </div>
    </button>`).join('');
}

function cartHTML() {
  const items = STATE.cart.map(c => ({ ...c, product: productById(c.pid) }));
  const gross = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const discount = Math.min(Number(STATE.posDiscount) || 0, gross);
  const total = gross - discount;
  const net = total / (1 + DB.store.vatRate / 100);
  const vat = total - net;
  const count = items.reduce((s, it) => s + it.qty, 0);

  return `
    <aside class="pos-cart" aria-label="سلة البيع">
      <div class="cart-head">
        <h2>السلة</h2>
        <span class="count-badge">${count}</span>
        ${items.length ? `<button class="icon-btn sm" style="margin-inline-start:auto" id="cart-clear" aria-label="تفريغ السلة">${icon('trash')}</button>` : ''}
      </div>
      <div class="cart-customer">
        <label class="label" for="pos-customer" style="display:block;margin-block-end:5px">العميل</label>
        <select class="select" id="pos-customer">
          <option value="">عميل نقدي (بدون حساب)</option>
          ${DB.customers.filter(c => !c.walkIn).map(c => `<option value="${c.id}" ${STATE.posCustomer === c.id ? 'selected' : ''}>${esc(c.name)} — ${c.type}</option>`).join('')}
        </select>
      </div>
      <div class="cart-items" id="cart-items">
        ${items.length ? items.map(it => `
          <div class="cart-item" data-cart="${it.pid}">
            <img src="assets/img/${it.product.img}" alt="" />
            <div class="cart-item-main">
              <div class="cart-item-name">${esc(it.product.name)}</div>
              <div class="cart-item-price">${money(it.product.price)} × ${it.qty}</div>
              <div class="cart-bottom">
                <div class="qty">
                  <button data-qty="-1" data-pid="${it.pid}" aria-label="تقليل">${icon('minus')}</button>
                  <span>${it.qty}</span>
                  <button data-qty="1" data-pid="${it.pid}" aria-label="زيادة">${icon('plus')}</button>
                </div>
                <span class="cart-line-total">${money(it.product.price * it.qty)}</span>
              </div>
            </div>
            <button class="cart-item-x" data-remove="${it.pid}" aria-label="إزالة">${icon('x')}</button>
          </div>`).join('') : `
          <div class="cart-empty">
            <div class="empty-icon">${icon('bag')}</div>
            <b>السلة فارغة</b>
            <p>اضغط على أي صنف لإضافته إلى الطلب.</p>
          </div>`}
      </div>
      <div class="cart-summary">
        <div class="summary-row"><span>الإجمالي قبل الضريبة</span><span>${money(net)}</span></div>
        <div class="summary-row"><span>ضريبة القيمة المضافة ${DB.store.vatRate}%</span><span>${money(vat)}</span></div>
        <div class="summary-row">
          <span>خصم</span>
          <span style="display:flex;align-items:center;gap:4px">
            <input class="discount-input" id="pos-discount" type="number" min="0" step="50" aria-label="قيمة الخصم" value="${STATE.posDiscount || ''}" placeholder="0" />
            <span class="cur">ر.س</span>
          </span>
        </div>
        <div class="summary-total"><span>الإجمالي</span><b id="pos-total">${money(gross - discount)}</b></div>
        <div class="pay-methods" role="group" aria-label="طريقة الدفع">
          ${[['مدى', 'card'], ['بطاقة', 'card'], ['نقدًا', 'cash'], ['تابي', 'wallet']].map(([m, ic]) => `
            <button class="pay-method ${STATE.posPayment === m ? 'active' : ''}" data-pay="${m}">${icon(ic)} ${m}</button>`).join('')}
        </div>
        <button class="btn btn-primary btn-block checkout-btn" id="checkout" ${items.length ? '' : 'disabled'}>
          ${icon('check')} إتمام البيع · ${money(gross - discount)}
        </button>
        <div class="cart-foot-note">${icon('shield')} تُصدر فاتورة إلكترونية متوافقة مع هيئة الزكاة</div>
      </div>
    </aside>`;
}

function mountPOS() {
  const grid = document.getElementById('pos-grid');
  const cats = document.getElementById('pos-cats');
  const search = document.getElementById('pos-search');
  let cat = 'الكل';
  const paint = () => { grid.innerHTML = posProductsHTML(cat, search.value); bindAdd(); };
  const bindAdd = () => {
    grid.querySelectorAll('[data-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = productById(btn.dataset.add);
        if (!p || p.stock === 0) return;
        const line = STATE.cart.find(c => c.pid === p.id);
        if (line && line.qty >= p.stock) { toast('الكمية المتاحة في المخزون لا تكفي', 'error'); return; }
        if (line) line.qty += 1; else STATE.cart.push({ pid: p.id, qty: 1 });
        refreshCart();
      });
    });
  };
  paint();
  cats.querySelectorAll('[data-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      cats.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      cat = chip.dataset.cat;
      paint();
    });
  });
  search.addEventListener('input', paint);
  document.getElementById('pos-hold')?.addEventListener('click', () => toast('تم تعليق الطلب — يمكن استعادته من «الطلبات المعلّقة»', 'info'));
  bindCart();
  document.getElementById('pmb-open')?.addEventListener('click', () => {
    document.getElementById('pos-cart')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  refreshCart = function () {
    const el = document.getElementById('pos-cart');
    el.innerHTML = cartHTML();
    bindCart();
  };
}

function bindCart() {
  const cart = document.getElementById('pos-cart');
  if (!cart) return;
  cart.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => {
      const it = STATE.cart.find(c => c.pid === btn.dataset.pid);
      if (!it) return;
      const p = productById(it.pid);
      const next = it.qty + Number(btn.dataset.qty);
      if (next <= 0) STATE.cart = STATE.cart.filter(c => c.pid !== it.pid);
      else if (next > p.stock) { toast('لا يوجد مخزون إضافي من هذا الصنف', 'error'); return; }
      else it.qty = next;
      document.getElementById('pos-cart').innerHTML = cartHTML();
      bindCart();
    });
  });
  cart.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.cart = STATE.cart.filter(c => c.pid !== btn.dataset.remove);
      document.getElementById('pos-cart').innerHTML = cartHTML();
      bindCart();
    });
  });
  cart.querySelector('#pos-customer')?.addEventListener('change', (e) => { STATE.posCustomer = e.target.value; });
  cart.querySelector('#pos-discount')?.addEventListener('input', (e) => {
    STATE.posDiscount = Math.max(0, Number(e.target.value) || 0);
    const gross = STATE.cart.reduce((s, c) => s + productById(c.pid).price * c.qty, 0);
    const total = Math.max(0, gross - STATE.posDiscount);
    const totalEl = cart.querySelector('#pos-total');
    if (totalEl) totalEl.innerHTML = money(total);
    const btn = cart.querySelector('#checkout');
    if (btn) btn.innerHTML = `${icon('check')} إتمام البيع · ${money(total)}`;
    updateMobileBar();
  });
  cart.querySelectorAll('[data-pay]').forEach(btn => {
    btn.addEventListener('click', () => { STATE.posPayment = btn.dataset.pay; cart.querySelectorAll('.pay-method').forEach(b => b.classList.toggle('active', b === btn)); });
  });
  cart.querySelector('#cart-clear')?.addEventListener('click', () => {
    STATE.cart = []; STATE.posDiscount = 0;
    document.getElementById('pos-cart').innerHTML = cartHTML();
    bindCart();
  });
  cart.querySelector('#checkout')?.addEventListener('click', checkout);
  updateMobileBar();
}

function updateMobileBar() {
  const bar = document.getElementById('pos-mobile-bar');
  if (!bar) return;
  const count = STATE.cart.reduce((s, c) => s + c.qty, 0);
  const gross = STATE.cart.reduce((s, c) => s + productById(c.pid).price * c.qty, 0);
  const total = Math.max(0, gross - (Number(STATE.posDiscount) || 0));
  bar.hidden = count === 0;
  bar.querySelector('#pmb-count').textContent = count;
  bar.querySelector('#pmb-total').innerHTML = money(total);
}

function checkout() {
  if (!STATE.cart.length) return;
  const gross = STATE.cart.reduce((s, c) => s + productById(c.pid).price * c.qty, 0);
  const discount = Math.min(Number(STATE.posDiscount) || 0, gross);
  const total = gross - discount;
  const maxId = Math.max(...DB.orders.map(o => Number(o.id.split('-')[1]) || 0));
  const id = `SO-${maxId + 1}`;
  const customerId = STATE.posCustomer || 'C00';
  const items = STATE.cart.map(c => ({ pid: c.pid, qty: c.qty }));

  const order = {
    id, customerId, offset: 0, status: 'مكتمل', channel: 'المعرض',
    payment: STATE.posPayment, salesperson: 'أحمد وهبة', items, note: discount ? `خصم ${fmt(discount)} ر.س` : '',
  };
  DB.orders.unshift(order);
  STATE.cart.forEach(c => { const p = productById(c.pid); p.stock = Math.max(0, p.stock - c.qty); });

  const cust = STATE.posCustomer ? customerById(STATE.posCustomer) : null;
  openModal({
    size: 'modal-sm',
    title: 'تم إتمام البيع',
    body: `
      <div style="text-align:center;padding-block:8px 4px">
        <div style="width:54px;height:54px;border-radius:99px;background:var(--success-bg);color:var(--success);display:grid;place-items:center;margin:0 auto 12px">${icon('check')}</div>
        <div style="font-size:13px;color:var(--muted)">تم تسجيل الطلب وإصدار الفاتورة</div>
        <div style="font-size:22px;font-weight:600;margin-block:4px 2px;font-variant-numeric:tabular-nums">${esc(id)}</div>
        <div style="font-size:13px;color:var(--muted)">${esc(cust ? cust.name : 'عميل نقدي')} · ${esc(STATE.posPayment)}</div>
        <div style="font-size:26px;font-weight:600;margin-block:12px">${money(total)}</div>
        <div style="font-size:11px;color:var(--muted)">${items.reduce((s, i) => s + i.qty, 0)} قطعة · ضريبة ${DB.store.vatRate}% مشمولة</div>
      </div>`,
    footer: `<button class="btn btn-ghost" data-close>إغلاق</button>
             <button class="btn" id="print-receipt">${icon('printer')} طباعة</button>
             <button class="btn btn-primary" data-close id="new-sale">بيع جديد</button>`,
    onMount: (modal) => {
      modal.querySelector('#print-receipt').addEventListener('click', () => window.print());
      modal.querySelector('#new-sale').addEventListener('click', () => {
        STATE.cart = []; STATE.posDiscount = 0; STATE.posCustomer = '';
        renderCurrentPage();
      });
    },
  });
  STATE.cart = [];
  STATE.posDiscount = 0;
  STATE.posCustomer = '';
  toast(`تم إتمام البيع ${id} بنجاح`);
  renderCurrentPage();
}

/* =========================================================
   طلبات البيع
   ========================================================= */
function salesPageHTML() {
  const statuses = ['الكل', 'مكتمل', 'قيد التجهيز', 'بانتظار الدفع', 'ملغي'];
  return `
    ${headHTML({
      eyebrow: 'المبيعات',
      title: 'طلبات البيع',
      sub: 'تابع الطلبات من الإنشاء حتى التسليم، وأصدر الفواتير المرتبطة بها.',
      actions: `<button class="btn" id="sales-export">${icon('download')} تصدير</button>
                <a class="btn btn-primary" href="#/pos">${icon('plus')} طلب جديد</a>`,
    })}
    <div class="card">
      <div style="padding:14px 16px 0">
        <div class="toolbar">
          <div class="search-field">
            ${icon('search')}
            <input class="input" id="sales-search" placeholder="ابحث برقم الطلب أو اسم العميل…" aria-label="بحث في الطلبات" />
          </div>
          <div class="segmented" id="sales-tabs">
            ${statuses.map(s => `<button class="seg ${STATE.sales.tab === s ? 'active' : ''}" data-tab="${s}">${s}${s !== 'الكل' ? ` <span class="tiny muted">${DB.orders.filter(o => o.status === s).length}</span>` : ''}</button>`).join('')}
          </div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table" id="sales-table">
          <thead><tr>
            <th>الطلب</th><th>العميل</th><th class="hide-sm">التاريخ</th><th class="hide-sm">القطع</th>
            <th class="hide-sm">القناة</th><th>الدفع</th><th class="num">الإجمالي</th><th>الحالة</th><th></th>
          </tr></thead>
          <tbody>
            ${DB.orders.map(o => salesRow(o)).join('')}
          </tbody>
        </table>
      </div>
      <div class="table-foot"><span id="sales-count">${DB.orders.length} طلبًا</span><span class="tiny">جميع القيم شاملة الضريبة</span></div>
    </div>`;
}

function salesRow(o) {
  const c = customerById(o.customerId);
  const inv = invoiceForOrder(o.id);
  return `<tr class="clickable" data-order="${o.id}" data-status="${o.status}" data-search="${esc(o.id + ' ' + c.name)}">
    <td class="cell-strong num" style="text-align:start">${esc(o.id)}</td>
    <td>
      <div class="cell-product" style="min-width:180px">
        ${avatarHTML(c, 'avatar-sm')}
        <div><div class="cell-strong">${esc(c.name.length > 26 ? c.name.slice(0, 26) + '…' : c.name)}</div><div class="cell-sub">${esc(c.city)} · ${esc(c.type)}</div></div>
      </div>
    </td>
    <td class="hide-sm muted">${esc(relativeDay(orderDate(o)))}</td>
    <td class="hide-sm num">${orderCount(o)}</td>
    <td class="hide-sm"><span class="tag">${esc(o.channel)}</span></td>
    <td>${esc(o.payment)}</td>
    <td class="num cell-strong">${money(orderTotal(o))}</td>
    <td>${statusPill(o.status)}</td>
    <td>
      <div class="row-actions">
        <button class="icon-btn sm" data-order-view="${o.id}" aria-label="عرض الطلب">${icon('eye')}</button>
        ${inv ? `<button class="icon-btn sm" data-invoice-view="${inv.id}" aria-label="عرض الفاتورة">${icon('receipt')}</button>` : ''}
      </div>
    </td>
  </tr>`;
}

function mountSales() {
  const tabs = document.getElementById('sales-tabs');
  const search = document.getElementById('sales-search');
  const rows = () => [...document.querySelectorAll('#sales-table tbody tr')];
  const filter = () => {
    const q = search.value.trim();
    let visible = 0;
    rows().forEach(r => {
      const okTab = STATE.sales.tab === 'الكل' || r.dataset.status === STATE.sales.tab;
      const okQ = !q || r.dataset.search.includes(q);
      const show = okTab && okQ;
      r.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.getElementById('sales-count').textContent = `${visible} من ${DB.orders.length} طلبًا`;
  };
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.seg');
    if (!b) return;
    STATE.sales.tab = b.dataset.tab;
    tabs.querySelectorAll('.seg').forEach(s => s.classList.toggle('active', s === b));
    filter();
  });
  search.addEventListener('input', filter);

  document.getElementById('sales-table').addEventListener('click', (e) => {
    const invBtn = e.target.closest('[data-invoice-view]');
    if (invBtn) { openInvoice(invBtn.dataset.invoiceView); return; }
    const row = e.target.closest('tr[data-order]');
    if (row) openOrder(row.dataset.order);
  });
  document.getElementById('sales-export')?.addEventListener('click', () => toast('تم تصدير ملف الطلبات (ديمو)'));
  filter();
}

function openOrder(id) {
  const o = DB.orders.find(x => x.id === id);
  if (!o) return;
  const c = customerById(o.customerId);
  const items = orderItems(o);
  const total = orderTotal(o);
  const net = total / (1 + DB.store.vatRate / 100);
  const inv = invoiceForOrder(o.id);
  const steps = [
    { label: 'تم إنشاء الطلب', done: true, at: `${relativeDay(orderDate(o))} · ${o.salesperson}` },
    { label: 'تأكيد الدفع', done: o.payment !== 'آجل' || o.status !== 'بانتظار الدفع', at: o.payment },
    { label: 'قيد التجهيز في المخزن', done: ['قيد التجهيز', 'مكتمل'].includes(o.status), at: o.status === 'قيد التجهيز' ? 'جارٍ العمل' : '' },
    { label: 'تم التسليم', done: o.status === 'مكتمل', at: o.status === 'مكتمل' ? 'تم التسليم للعميل' : '' },
  ];

  openDrawer({
    title: `${o.id} ${statusPill(o.status)}`,
    sub: `${esc(c.name)} · ${relativeDay(orderDate(o))}`,
    body: `
      <div class="detail-stats">
        <div class="detail-stat"><span>إجمالي الطلب</span><b>${money(total)}</b></div>
        <div class="detail-stat"><span>القطع</span><b>${orderCount(o)}</b></div>
        <div class="detail-stat"><span>طريقة الدفع</span><b style="font-size:12.5px">${esc(o.payment)}</b></div>
      </div>
      <div class="form-grid" style="margin-block-end:16px">
        <div class="meta-kv"><span>العميل</span><b>${esc(c.name)}</b></div>
        <div class="meta-kv"><span>الهاتف</span><b dir="ltr" style="text-align:start">${esc(c.phone)}</b></div>
        <div class="meta-kv"><span>القناة</span><b>${esc(o.channel)}</b></div>
        <div class="meta-kv"><span>مسؤول البيع</span><b>${esc(o.salesperson)}</b></div>
      </div>
      <div class="table-wrap" style="border:1px solid var(--border);border-radius:10px;margin-block-end:16px">
        <table class="table" style="min-width:0">
          <thead><tr><th>الصنف</th><th class="num">الكمية</th><th class="num">الإجمالي</th></tr></thead>
          <tbody>${items.map(it => `<tr><td><div class="cell-strong">${esc(it.product.name)}</div><div class="cell-sub">${esc(it.product.sku)}</div></td><td class="num">${it.qty}</td><td class="num">${money(it.total)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="summary-row"><span>قبل الضريبة</span><span>${money(net)}</span></div>
      <div class="summary-row"><span>ضريبة ${DB.store.vatRate}%</span><span>${money(total - net)}</span></div>
      <div class="summary-total"><span>الإجمالي</span><b>${money(total)}</b></div>
      ${o.note ? `<div class="note-box" style="margin-block-start:14px"><b>ملاحظة</b>${esc(o.note)}</div>` : ''}
      <div style="margin-block-start:18px">
        <div class="card-title" style="font-size:12px;margin-block-end:10px">مسار الطلب</div>
        <div class="timeline">
          ${steps.map(s => `<div class="tl-item ${s.done ? '' : 'pending'}"><span class="tl-dot"></span><div class="tl-body"><b>${s.label}</b><span>${esc(s.at || 'بانتظار الخطوة السابقة')}</span></div></div>`).join('')}
        </div>
      </div>`,
    footer: `<button class="btn btn-ghost btn-sm" data-close>إغلاق</button>
             ${inv ? `<button class="btn btn-sm" id="order-invoice">${icon('receipt')} الفاتورة ${inv.id}</button>` : ''}
             <button class="btn btn-primary btn-sm" id="order-print">${icon('printer')} طباعة</button>`,
    onMount: (el) => {
      el.querySelector('#order-invoice')?.addEventListener('click', () => { closeModal(); setTimeout(() => openInvoice(inv.id), 120); });
      el.querySelector('#order-print')?.addEventListener('click', () => {
        if (inv) { closeModal(); setTimeout(() => openInvoice(inv.id, true), 120); }
        else { toast('لا توجد فاتورة مرتبطة بهذا الطلب', 'info'); }
      });
    },
  });
}

/* =========================================================
   الفواتير
   ========================================================= */
function invoicesPageHTML() {
  const all = invoices();
  const tabs = ['الكل', 'مدفوعة', 'جزئية', 'متأخرة'];
  return `
    ${headHTML({
      eyebrow: 'المبيعات',
      title: 'الفواتير',
      sub: 'فواتير إلكترونية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك.',
      actions: `<button class="btn" id="inv-export">${icon('download')} تصدير</button>
                <a class="btn btn-primary" href="#/pos">${icon('plus')} فاتورة جديدة</a>`,
    })}
    <div class="inv-summary">
      <div class="mini-stat"><span>إجمالي المُحصّل</span><b>${moneyPlain(all.filter(i => invoiceStatus(i) === 'مدفوعة').reduce((s, i) => s + i.total, 0))}</b></div>
      <div class="mini-stat"><span>مبالغ مستحقة</span><b>${moneyPlain(all.reduce((s, i) => s + (i.total - invoicePaid(i)), 0))}</b></div>
      <div class="mini-stat"><span>فواتير متأخرة</span><b>${all.filter(i => invoiceStatus(i) === 'متأخرة').length}</b> <span class="pill pill-danger">تحتاج متابعة</span></div>
    </div>
    <div class="card">
      <div style="padding:14px 16px 0">
        <div class="toolbar">
          <div class="search-field">
            ${icon('search')}
            <input class="input" id="inv-search" placeholder="ابحث برقم الفاتورة أو العميل…" aria-label="بحث في الفواتير" />
          </div>
          <div class="segmented" id="inv-tabs">
            ${tabs.map(t => `<button class="seg ${t === 'الكل' ? 'active' : ''}" data-tab="${t}">${t}</button>`).join('')}
          </div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table" id="inv-table">
          <thead><tr><th>الفاتورة</th><th>العميل</th><th class="hide-sm">الإصدار</th><th class="hide-sm">الاستحقاق</th><th class="num">الإجمالي</th><th class="num hide-sm">المدفوع</th><th>الحالة</th><th></th></tr></thead>
          <tbody>
            ${all.map(i => invoiceRow(i)).join('')}
          </tbody>
        </table>
      </div>
      <div class="table-foot"><span id="inv-count">${all.length} فاتورة</span><span class="tiny">الأسعار شاملة ضريبة القيمة المضافة ${DB.store.vatRate}%</span></div>
    </div>`;
}

function invoiceStatus(inv) {
  return STATE.paidInvoices.has(inv.id) ? 'مدفوعة' : inv.status;
}

function invoicePaid(inv) {
  return STATE.paidInvoices.has(inv.id) ? inv.total : inv.paid;
}

function invoiceRow(inv) {
  const c = customerById(inv.customerId);
  const status = invoiceStatus(inv);
  return `<tr class="clickable" data-inv="${inv.id}" data-status="${status}" data-search="${esc(inv.id + ' ' + c.name)}">
    <td class="cell-strong num" style="text-align:start">${esc(inv.id)}</td>
    <td><div class="cell-product" style="min-width:170px">${avatarHTML(c, 'avatar-sm')}<div><div class="cell-strong">${esc(c.name.length > 24 ? c.name.slice(0, 24) + '…' : c.name)}</div><div class="cell-sub">${esc(c.type)} · ${esc(c.city)}</div></div></div></td>
    <td class="hide-sm muted">${esc(shortDate(inv.issued))}</td>
    <td class="hide-sm ${status === 'متأخرة' ? 'num' : 'muted'}" style="${status === 'متأخرة' ? 'color:var(--danger);font-weight:500' : ''}">${esc(shortDate(inv.due))}</td>
    <td class="num cell-strong">${money(inv.total)}</td>
    <td class="num hide-sm muted">${money(invoicePaid(inv))}</td>
    <td>${statusPill(status)}</td>
    <td><div class="row-actions"><button class="icon-btn sm" data-inv-view="${inv.id}" aria-label="عرض الفاتورة">${icon('eye')}</button><button class="icon-btn sm" data-inv-print="${inv.id}" aria-label="طباعة">${icon('printer')}</button></div></td>
  </tr>`;
}

function mountInvoices() {
  const tabs = document.getElementById('inv-tabs');
  const search = document.getElementById('inv-search');
  const rows = () => [...document.querySelectorAll('#inv-table tbody tr')];
  const filter = () => {
    const q = search.value.trim();
    let visible = 0;
    rows().forEach(r => {
      const okTab = STATE.invoiceTab === 'الكل' || r.dataset.status === STATE.invoiceTab;
      const okQ = !q || r.dataset.search.includes(q);
      r.style.display = okTab && okQ ? '' : 'none';
      if (okTab && okQ) visible++;
    });
    document.getElementById('inv-count').textContent = `${visible} من ${rows().length} فاتورة`;
  };
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('.seg');
    if (!b) return;
    STATE.invoiceTab = b.dataset.tab;
    tabs.querySelectorAll('.seg').forEach(s => s.classList.toggle('active', s === b));
    filter();
  });
  search.addEventListener('input', filter);
  document.getElementById('inv-table').addEventListener('click', (e) => {
    const print = e.target.closest('[data-inv-print]');
    if (print) { openInvoice(print.dataset.invPrint, true); return; }
    const row = e.target.closest('tr[data-inv]');
    if (row) openInvoice(row.dataset.inv);
  });
  document.getElementById('inv-export')?.addEventListener('click', () => toast('تم تصدير ملف الفواتير (ديمو)'));
  filter();
}

function invoiceSheetHTML(inv) {
  const c = customerById(inv.customerId);
  const status = invoiceStatus(inv);
  const net = inv.total / (1 + DB.store.vatRate / 100);
  const vat = inv.total - net;
  const paid = invoicePaid(inv);
  const due = inv.total - paid;
  const order = DB.orders.find(o => o.id === inv.orderId);
  return `
    <div class="invoice-sheet">
      <div class="inv-brand">
        <div class="inv-brand-left">
          <span class="brand-mark" style="width:44px;height:44px;border-radius:13px">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 18.5v-6.2a7.5 7.5 0 0 1 15 0v6.2"/><path d="M2.8 18.5h18.4"/><path d="M9 18.5v-3.3a3 3 0 0 1 6 0v3.3"/></svg>
          </span>
          <div>
            <div class="inv-title">${esc(DB.store.name)}</div>
            <div class="inv-sub">${esc(DB.store.legal)} · ${esc(DB.store.tagline)}</div>
            <div class="inv-sub">الرقم الضريبي ${esc(DB.store.vatNumber)}</div>
          </div>
        </div>
        <div class="inv-number">
          <b>${esc(inv.id)}</b>
          <span>فاتورة ضريبية مبسطة</span>
          <span style="display:block">${esc(dateLabel(inv.issued))}</span>
        </div>
      </div>

      <div class="inv-meta">
        <div><span>العميل</span><b>${esc(c.name)}</b><span style="margin-block-start:3px">${esc(c.phone)}${c.email ? ` · ${esc(c.email)}` : ''}</span></div>
        <div><span>طريقة الدفع</span><b>${esc(inv.payment)}</b><span style="margin-block-start:3px">${statusPill(status)}</span></div>
        <div><span>مرجع الطلب</span><b>${esc(inv.orderId)}</b><span style="margin-block-start:3px">مندوب البيع: ${esc(order ? order.salesperson : '—')}</span></div>
      </div>

      <table class="inv-table">
        <thead><tr><th style="width:44%">الوصف</th><th class="num">الكمية</th><th class="num">سعر الوحدة</th><th class="num">الإجمالي</th></tr></thead>
        <tbody>
          ${inv.items.map(it => `<tr><td>${esc(it.product.name)}<div class="cell-sub">${esc(it.product.sku)}</div></td><td class="num">${it.qty}</td><td class="num">${fmt(it.product.price)}</td><td class="num">${fmt(it.total)}</td></tr>`).join('')}
        </tbody>
      </table>

      <div class="inv-totals">
        <div class="inv-total-row"><span>الإجمالي قبل الضريبة</span><b>${money(net)}</b></div>
        <div class="inv-total-row"><span>ضريبة القيمة المضافة ${DB.store.vatRate}%</span><b>${money(vat)}</b></div>
        <div class="inv-total-row grand"><span>الإجمالي المستحق</span><b>${money(inv.total)}</b></div>
        <div class="inv-total-row"><span>المدفوع</span><b>${money(paid)}</b></div>
        ${due > 0 ? `<div class="inv-total-row" style="color:var(--danger)"><span>المتبقي</span><b style="color:var(--danger)">${money(due)}</b></div>` : ''}
      </div>

      <div class="inv-foot">
        <div>
          <b style="color:var(--foreground);font-weight:600">شروط الدفع</b><br />
          تستحق خلال 30 يومًا من تاريخ الإصدار. الأسعار شاملة ضريبة القيمة المضافة.<br />
          ${esc(DB.store.address)} · ${esc(DB.store.phone)}
        </div>
        <div class="inv-stamp"><div class="stamp">${status === 'مدفوعة' ? 'مدفوعة' : status === 'متأخرة' ? 'غير مسددة' : 'سُدد جزء'}<br />${esc(shortDate(inv.issued))}</div></div>
      </div>
    </div>`;
}

function openInvoice(id, print = false) {
  const inv = invoices().find(i => i.id === id);
  if (!inv) return;
  const status = invoiceStatus(inv);
  openModal({
    size: 'modal-lg',
    title: `فاتورة ${inv.id}`,
    sub: `${customerById(inv.customerId).name} · ${dateLabel(inv.issued)}`,
    body: invoiceSheetHTML(inv),
    flush: true,
    footer: `<button class="btn btn-ghost btn-sm" data-close>إغلاق</button>
             ${status !== 'مدفوعة' ? `<button class="btn btn-sm btn-soft" id="inv-pay">${icon('cash')} تسجيل دفعة</button>` : ''}
             <button class="btn btn-primary btn-sm" id="inv-print">${icon('printer')} طباعة</button>`,
    onMount: () => {
      document.getElementById('inv-print')?.addEventListener('click', () => window.print());
      document.getElementById('inv-pay')?.addEventListener('click', () => {
        STATE.paidInvoices.add(inv.id);
        closeModal();
        toast(`تم تسجيل سداد الفاتورة ${inv.id}`);
        if (location.hash.includes('invoices')) renderCurrentPage();
      });
      if (print) setTimeout(() => window.print(), 350);
    },
  });
}

/* =========================================================
   المنتجات / المخزون
   ========================================================= */
function inventoryPageHTML() {
  const totalUnits = DB.products.reduce((s, p) => s + p.stock, 0);
  const value = DB.products.reduce((s, p) => s + p.stock * p.cost, 0);
  const low = lowStock();
  return `
    ${headHTML({
      eyebrow: 'المخزون',
      title: 'المنتجات',
      sub: 'كتالوج الأثاث، الكميات المتاحة، وحدود إعادة الطلب لكل صنف.',
      actions: `<button class="btn" id="inv-import">${icon('upload')} استيراد</button>
                <button class="btn btn-primary" id="add-product">${icon('plus')} صنف جديد</button>`,
    })}
    <div class="inv-summary">
      <div class="mini-stat"><span>القطع المتاحة</span><b>${fmt(totalUnits)}</b></div>
      <div class="mini-stat"><span>قيمة المخزون بالتكلفة</span><b>${moneyPlain(value)}</b></div>
      <div class="mini-stat"><span>تحت حد الطلب</span><b>${low.length}</b> <span class="pill ${low.some(p => p.stock === 0) ? 'pill-danger' : 'pill-warning'}">${low.filter(p => p.stock === 0).length} نفد</span></div>
    </div>
    <div class="card">
      <div class="toolbar" style="padding:14px 16px 0">
        <div class="search-field">
          ${icon('search')}
          <input class="input" id="inv-q" placeholder="ابحث بالاسم أو الرمز…" aria-label="بحث في المنتجات" value="${esc(STATE.inventory.query)}" />
        </div>
        <select class="select" id="inv-cat" aria-label="الفئة">
          ${DB.categories.map(c => `<option ${STATE.inventory.cat === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <select class="select" id="inv-status" aria-label="الحالة">
          ${['الكل', 'متوفر', 'منخفض', 'نفد المخزون'].map(s => `<option ${STATE.inventory.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <select class="select" id="inv-sort" aria-label="الترتيب">
          <option value="name">الاسم</option>
          <option value="price-asc">السعر: الأقل</option>
          <option value="price-desc">السعر: الأعلى</option>
          <option value="stock-asc">المخزون: الأقل</option>
        </select>
        <div class="toolbar-spacer"></div>
        <button class="btn btn-sm" id="inv-export">${icon('download')} تصدير</button>
      </div>
      <div class="table-wrap" style="margin-block-start:12px">
        <table class="table">
          <thead><tr><th>الصنف</th><th class="hide-sm">الفئة</th><th class="hide-sm">المخزن</th><th class="num">المخزون</th><th class="num hide-sm">حد الطلب</th><th class="num">السعر</th><th>الحالة</th><th></th></tr></thead>
          <tbody id="inv-body"></tbody>
        </table>
      </div>
      <div class="table-foot">
        <span id="inv-count"></span>
        <div class="pager" id="inv-pager"></div>
      </div>
    </div>`;
}

function invRow(p) {
  const s = stockTone(p);
  return `<tr class="clickable" data-product="${p.id}">
    <td>
      <div class="cell-product">
        <img class="thumb" src="assets/img/${p.img}" alt="" loading="lazy" />
        <div><div class="cell-strong">${esc(p.name)}</div><div class="cell-sub">${esc(p.sku)}</div></div>
      </div>
    </td>
    <td class="hide-sm"><span class="tag">${esc(p.cat)}</span></td>
    <td class="hide-sm muted">${esc(p.warehouse)}</td>
    <td class="num ${p.stock === 0 ? '' : 'cell-strong'}" style="${p.stock === 0 ? 'color:var(--danger);font-weight:600' : ''}">${p.stock}</td>
    <td class="num hide-sm muted">${p.reorder}</td>
    <td class="num cell-strong">${money(p.price)}</td>
    <td>${statusPill(s.label)}</td>
    <td><div class="row-actions"><button class="icon-btn sm" data-product-view="${p.id}" aria-label="عرض">${icon('eye')}</button><button class="icon-btn sm" data-product-edit="${p.id}" aria-label="تعديل">${icon('edit')}</button></div></td>
  </tr>`;
}

function mountInventory() {
  const body = document.getElementById('inv-body');
  const pager = document.getElementById('inv-pager');
  const q = document.getElementById('inv-q');
  const cat = document.getElementById('inv-cat');
  const status = document.getElementById('inv-status');
  const sort = document.getElementById('inv-sort');

  const filtered = () => {
    const query = q.value.trim().toLowerCase();
    let list = DB.products.filter(p => {
      const s = stockTone(p).label;
      return (STATE.inventory.cat === 'الكل' || p.cat === STATE.inventory.cat)
        && (STATE.inventory.status === 'الكل' || s === STATE.inventory.status)
        && (!query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query));
    });
    const sv = sort.value;
    if (sv === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sv === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sv === 'stock-asc') list.sort((a, b) => a.stock - b.stock);
    else list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    return list;
  };

  const paint = () => {
    const list = filtered();
    const per = STATE.inventory.per;
    const pages = Math.max(1, Math.ceil(list.length / per));
    if (STATE.inventory.page > pages) STATE.inventory.page = pages;
    const start = (STATE.inventory.page - 1) * per;
    const slice = list.slice(start, start + per);
    body.innerHTML = slice.length ? slice.map(invRow).join('') : `<tr><td colspan="8"><div class="empty"><div class="empty-icon">${icon('box')}</div><b>لا أصناف مطابقة</b><p>غيّر الفئة أو كلمة البحث.</p></div></td></tr>`;
    document.getElementById('inv-count').textContent = list.length ? `عرض ${start + 1}–${Math.min(start + per, list.length)} من ${list.length} صنفًا` : 'لا نتائج';
    pager.innerHTML = pages > 1 ? `
      <button ${STATE.inventory.page === 1 ? 'disabled' : ''} data-page="${STATE.inventory.page - 1}" aria-label="السابق">${icon('chevronRight')}</button>
      ${Array.from({ length: pages }, (_, i) => `<button class="${STATE.inventory.page === i + 1 ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>`).join('')}
      <button ${STATE.inventory.page === pages ? 'disabled' : ''} data-page="${STATE.inventory.page + 1}" aria-label="التالي">${icon('chevronLeft')}</button>` : '';
  };

  q.addEventListener('input', () => { STATE.inventory.query = q.value; STATE.inventory.page = 1; paint(); });
  cat.addEventListener('change', () => { STATE.inventory.cat = cat.value; STATE.inventory.page = 1; paint(); });
  status.addEventListener('change', () => { STATE.inventory.status = status.value; STATE.inventory.page = 1; paint(); });
  sort.addEventListener('change', paint);
  pager.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b) return;
    STATE.inventory.page = Number(b.dataset.page);
    paint();
  });
  body.addEventListener('click', (e) => {
    const edit = e.target.closest('[data-product-edit]');
    if (edit) { toast('تعديل الأصناف متاح في النسخة الكاملة (ديمو)', 'info'); return; }
    const row = e.target.closest('[data-product]');
    if (row) openProduct(row.dataset.product);
  });
  document.getElementById('add-product')?.addEventListener('click', addProductModal);
  document.getElementById('inv-export')?.addEventListener('click', () => toast('تم تصدير قائمة الأصناف (ديمو)'));
  document.getElementById('inv-import')?.addEventListener('click', () => toast('استيراد Excel جاهز للربط (ديمو)', 'info'));
  paint();
}

function openProduct(id) {
  const p = productById(id);
  if (!p) return;
  const s = stockTone(p);
  const reserved = Math.min(p.stock, 2);
  openDrawer({
    title: p.name,
    sub: `${p.sku} · ${p.cat}`,
    body: `
      <div class="product-hero">
        <img src="assets/img/${p.img}" alt="${esc(p.name)}" />
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">${statusPill(s.label)}<span class="tag">${esc(p.material)}</span></div>
          <div style="font-size:22px;font-weight:600;margin-block:9px 2px">${money(p.price)}</div>
          <div class="tiny muted">السعر شامل الضريبة · التكلفة ${moneyPlain(p.cost)}</div>
          <div class="product-meta-grid">
            <div class="meta-kv"><span>المخزن</span><b>${esc(p.warehouse)}</b></div>
            <div class="meta-kv"><span>المورد</span><b>${esc(p.supplier)}</b></div>
            <div class="meta-kv"><span>اللون</span><b>${esc(p.color)}</b></div>
            <div class="meta-kv"><span>المقاس</span><b>${esc(p.size)}</b></div>
            <div class="meta-kv"><span>الضمان</span><b>${esc(p.warranty)}</b></div>
            <div class="meta-kv"><span>التقييم</span><b>${p.rating} من 5</b></div>
          </div>
        </div>
      </div>
      <div style="margin-block-start:18px">
        <div class="card-title" style="font-size:12px;margin-block-end:4px">تفاصيل المخزون</div>
        <div class="stock-line"><span>المتاح للبيع</span><b>${p.stock} قطعة</b></div>
        <div class="stock-line"><span>محجوز لطلبات قائمة</span><b>${reserved} قطعة</b></div>
        <div class="stock-line"><span>حد إعادة الطلب</span><b>${p.reorder} قطعة</b></div>
        <div class="stock-line"><span>مبيعات الشهر</span><b>${p.sold} قطعة</b></div>
      </div>
      ${p.stock === 0 ? `<div class="alert-bar" style="margin-block:14px 0">${icon('alert')}<span>هذا الصنف نفد من المخزون. أنشئ أمر شراء لتجنّب خسارة الطلب.</span></div>` : ''}`,
    footer: `<button class="btn btn-ghost btn-sm" data-close>إغلاق</button>
             <button class="btn btn-sm" id="prod-transfer">${icon('transfer')} تحويل مخزون</button>
             <button class="btn btn-primary btn-sm" id="prod-add" ${p.stock === 0 ? 'disabled' : ''}>${icon('bag')} إضافة للبيع</button>`,
    onMount: (el) => {
      el.querySelector('#prod-transfer').addEventListener('click', () => { closeModal(); setTimeout(transferModal, 120); });
      el.querySelector('#prod-add').addEventListener('click', () => {
        const line = STATE.cart.find(c => c.pid === p.id);
        if (line) line.qty += 1; else STATE.cart.push({ pid: p.id, qty: 1 });
        closeModal();
        location.hash = '#/pos';
        toast(`أضيف ${p.name} إلى سلة البيع`);
      });
    },
  });
}

function addProductModal() {
  const catOptions = DB.categories.filter(c => c !== 'الكل').map(c => `<option>${c}</option>`).join('');
  const whOptions = DB.warehouses.map(w => `<option>${w.name}</option>`).join('');
  openModal({
    title: 'صنف جديد',
    sub: 'أضف منتجًا إلى كتالوج المعرض',
    size: 'modal-lg',
    body: `
      <form id="product-form">
        <div class="form-grid">
          <div class="field full"><label class="label" for="pf-name">اسم الصنف</label><input class="input" id="pf-name" required placeholder="مثال: كنبة لانا المخملية" /></div>
          <div class="field"><label class="label" for="pf-cat">الفئة</label><select class="select" id="pf-cat">${catOptions}</select></div>
          <div class="field"><label class="label" for="pf-wh">المخزن</label><select class="select" id="pf-wh">${whOptions}</select></div>
          <div class="field"><label class="label" for="pf-price">سعر البيع (ر.س)</label><input class="input" id="pf-price" type="number" min="1" step="1" required placeholder="0" /></div>
          <div class="field"><label class="label" for="pf-cost">التكلفة (ر.س)</label><input class="input" id="pf-cost" type="number" min="0" step="1" placeholder="0" /></div>
          <div class="field"><label class="label" for="pf-stock">الكمية الافتتاحية</label><input class="input" id="pf-stock" type="number" min="0" step="1" value="1" /></div>
          <div class="field"><label class="label" for="pf-reorder">حد إعادة الطلب</label><input class="input" id="pf-reorder" type="number" min="0" step="1" value="2" /></div>
          <div class="field full"><label class="label" for="pf-supplier">المورد</label><input class="input" id="pf-supplier" placeholder="اسم المورد" /></div>
        </div>
        <div class="hint" style="margin-block-start:10px">سيُنشأ رمز الصنف تلقائيًا بناءً على الفئة. الأرقام تجريبية داخل الديمو.</div>
      </form>`,
    footer: `<button class="btn btn-ghost" data-close>إلغاء</button>
             <button class="btn btn-primary" id="pf-save">${icon('check')} حفظ الصنف</button>`,
    onMount: (modal) => {
      modal.querySelector('#pf-save').addEventListener('click', () => {
        const form = modal.querySelector('#product-form');
        if (!form.reportValidity()) return;
        const name = modal.querySelector('#pf-name').value.trim();
        const cat = modal.querySelector('#pf-cat').value;
        const price = Number(modal.querySelector('#pf-price').value) || 0;
        const cost = Number(modal.querySelector('#pf-cost').value) || Math.round(price * 0.65);
        const stock = Number(modal.querySelector('#pf-stock').value) || 0;
        const reorder = Number(modal.querySelector('#pf-reorder').value) || 2;
        const wh = modal.querySelector('#pf-wh').value;
        const supplier = modal.querySelector('#pf-supplier').value.trim() || 'مصنع الأثاث الوطني';
        const num = DB.products.length + 1;
        const p = {
          id: `P${String(num).padStart(2, '0')}`, sku: `WH-NEW-${9000 + num}`, name, cat,
          img: 'bed-linen.jpg', price, cost, stock, reorder, warehouse: wh, supplier,
          material: 'خشب وقماش', color: 'بيج', size: 'حسب الطلب', warranty: '3 سنوات', sold: 0, rating: 4.5, arrived: stock,
        };
        DB.products.unshift(p);
        closeModal();
        toast(`أُضيف الصنف «${name}» إلى الكتالوج`);
        if (location.hash.includes('inventory')) renderCurrentPage();
      });
    },
  });
}

/* =========================================================
   العملاء
   ========================================================= */
function customersPageHTML() {
  const c = customerById(STATE.customerId) || DB.customers[0];
  const visible = DB.customers.filter(x => !x.walkIn);
  return `
    ${headHTML({
      eyebrow: 'العلاقات',
      title: 'العملاء',
      sub: 'سجل العملاء، مشترياتهم، وأرصدتهم المستحقة في مكان واحد.',
      actions: `<button class="btn" id="cust-export">${icon('download')} تصدير</button>
                <button class="btn btn-primary" id="add-customer">${icon('userPlus')} عميل جديد</button>`,
    })}
    <div class="split">
      <div class="list-card">
        <div class="list-head">
          <div class="search-field">${icon('search')}<input class="input" id="cust-search" placeholder="ابحث بالاسم أو المدينة…" aria-label="بحث في العملاء" /></div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--muted)">
            <span>${visible.length} عميلًا</span><span>${visible.filter(x => x.balance > 0).length} عليهم رصيد</span>
          </div>
        </div>
        <div class="cust-list" id="cust-list">
          ${visible.map(x => `
            <button class="cust-row ${x.id === c.id ? 'active' : ''}" data-customer="${x.id}" data-search="${esc(x.name + ' ' + x.city + ' ' + x.phone)}">
              ${avatarHTML(x)}
              <span class="cust-main">
                <span class="cust-name">${esc(x.name)}</span>
                <span class="cust-meta">${esc(x.city)} · ${x.orders} طلبات</span>
              </span>
              <span class="cust-amount">${x.balance ? money(x.balance) : `<span class="pill pill-${x.tier === 'بلاتيني' ? 'gold' : x.tier === 'ذهبي' ? 'warning' : 'neutral'}" style="height:20px;font-size:10px">${x.tier}</span>`}</span>
            </button>`).join('')}
        </div>
      </div>
      <div id="customer-detail">${customerDetailHTML(c)}</div>
    </div>`;
}

function customerDetailHTML(c) {
  const orders = DB.orders.filter(o => o.customerId === c.id).slice(0, 5);
  return `
    <div class="card">
      <div class="card-body" style="padding-block-start:20px">
        <div class="detail-head">
          ${avatarHTML(c, 'xl')}
          <div style="min-width:0">
            <div class="detail-id">${esc(c.name)}</div>
            <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-block-start:4px">
              <span class="pill pill-${c.type === 'شركة' ? 'info' : 'neutral'}">${esc(c.type)}</span>
              <span class="pill pill-gold">${esc(c.tier)}</span>
              <span class="tiny muted">عميل منذ ${esc(dateLabel(c.since))}</span>
            </div>
          </div>
          <div class="detail-actions">
            <a class="btn btn-sm" href="tel:${esc(c.phone.replace(/\s/g, ''))}">${icon('phone')} اتصال</a>
            <a class="btn btn-sm btn-primary" href="#/pos">${icon('plus')} طلب بيع</a>
          </div>
        </div>

        <div class="detail-stats">
          <div class="detail-stat"><span>إجمالي المشتريات</span><b>${money(c.spent)}</b></div>
          <div class="detail-stat"><span>عدد الطلبات</span><b>${c.orders}</b></div>
          <div class="detail-stat"><span>الرصيد المستحق</span><b style="${c.balance > 0 ? 'color:var(--danger)' : ''}">${money(c.balance)}</b></div>
        </div>

        <div class="form-grid" style="margin-block-end:14px">
          <div class="meta-kv"><span>الهاتف</span><b dir="ltr" style="text-align:start">${esc(c.phone)}</b></div>
          <div class="meta-kv"><span>البريد</span><b>${c.email ? esc(c.email) : '<span class="muted">غير مسجّل</span>'}</b></div>
          <div class="meta-kv"><span>المدينة</span><b>${esc(c.city)}</b></div>
          <div class="meta-kv"><span>رقم العميل</span><b>${esc(c.id)}</b></div>
        </div>

        ${c.note ? `<div class="note-box"><b>ملاحظات الحساب</b>${esc(c.note)}</div>` : ''}
      </div>

      <div style="padding:4px 20px 0">
        <div style="display:flex;align-items:center;justify-content:space-between;padding-block:10px 0">
          <div class="card-title" style="font-size:12.5px">آخر الطلبات</div>
          <a class="link-more" href="#/sales">كل الطلبات ${icon('arrowLeft')}</a>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table" style="min-width:0">
          <thead><tr><th>الطلب</th><th class="hide-sm">التاريخ</th><th class="num">القطع</th><th class="num">الإجمالي</th><th>الحالة</th></tr></thead>
          <tbody>
            ${orders.length ? orders.map(o => `<tr class="clickable" data-open-order="${o.id}">
              <td class="cell-strong num" style="text-align:start">${esc(o.id)}</td>
              <td class="hide-sm muted">${esc(relativeDay(orderDate(o)))}</td>
              <td class="num">${orderCount(o)}</td>
              <td class="num cell-strong">${money(orderTotal(o))}</td>
              <td>${statusPill(o.status)}</td>
            </tr>`).join('') : `<tr><td colspan="5"><div class="empty" style="padding:26px"><b>لا طلبات بعد</b><p>ابدأ أول طلب لهذا العميل.</p></div></td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="card-foot" style="justify-content:flex-end">
        ${c.balance > 0 ? `<button class="btn btn-sm btn-soft" id="collect">${icon('cash')} تحصيل رصيد</button>` : ''}
        <button class="btn btn-sm" id="cust-note">${icon('edit')} تعديل الملاحظات</button>
      </div>
    </div>`;
}

function mountCustomers() {
  const list = document.getElementById('cust-list');
  const search = document.getElementById('cust-search');
  search.addEventListener('input', () => {
    const q = search.value.trim();
    list.querySelectorAll('.cust-row').forEach(r => {
      r.style.display = !q || r.dataset.search.includes(q) ? '' : 'none';
    });
  });
  list.addEventListener('click', (e) => {
    const row = e.target.closest('[data-customer]');
    if (!row) return;
    STATE.customerId = row.dataset.customer;
    list.querySelectorAll('.cust-row').forEach(r => r.classList.toggle('active', r === row));
    document.getElementById('customer-detail').innerHTML = customerDetailHTML(customerById(STATE.customerId));
    bindCustomerDetail();
  });
  document.getElementById('add-customer')?.addEventListener('click', newCustomerModal);
  document.getElementById('cust-export')?.addEventListener('click', () => toast('تم تصدير سجل العملاء (ديمو)'));
  bindCustomerDetail();
}

function bindCustomerDetail() {
  const detail = document.getElementById('customer-detail');
  if (!detail) return;
  detail.querySelectorAll('[data-open-order]').forEach(row => {
    row.addEventListener('click', () => openOrder(row.dataset.openOrder));
  });
  detail.querySelector('#collect')?.addEventListener('click', () => toast('تم إنشاء إشعار تحصيل للعميل (ديمو)'));
  detail.querySelector('#cust-note')?.addEventListener('click', () => toast('تعديل الملاحظات متاح في النسخة الكاملة (ديمو)', 'info'));
}

function newCustomerModal() {
  openModal({
    title: 'عميل جديد',
    sub: 'أضف عميلًا فرديًا أو شركة',
    body: `
      <form id="cust-form" class="form-grid">
        <div class="field full"><label class="label" for="cf-name">الاسم</label><input class="input" id="cf-name" required placeholder="الاسم الكامل أو اسم الشركة" /></div>
        <div class="field"><label class="label" for="cf-type">النوع</label><select class="select" id="cf-type"><option>فرد</option><option>شركة</option></select></div>
        <div class="field"><label class="label" for="cf-city">المدينة</label><select class="select" id="cf-city"><option>جدة</option><option>الرياض</option><option>المدينة</option><option>الدمام</option><option>الخبر</option></select></div>
        <div class="field"><label class="label" for="cf-phone">الهاتف</label><input class="input" id="cf-phone" dir="ltr" placeholder="05x xxx xxxx" /></div>
        <div class="field"><label class="label" for="cf-email">البريد الإلكتروني</label><input class="input" id="cf-email" type="email" dir="ltr" placeholder="name@example.com" /></div>
        <div class="field full"><label class="label" for="cf-note">ملاحظة</label><textarea class="textarea" id="cf-note" placeholder="تفضيلات العميل أو تفاصيل الحساب…"></textarea></div>
      </form>`,
    footer: `<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" id="cf-save">${icon('check')} حفظ العميل</button>`,
    onMount: (modal) => {
      modal.querySelector('#cf-save').addEventListener('click', () => {
        if (!modal.querySelector('#cust-form').reportValidity()) return;
        const name = modal.querySelector('#cf-name').value.trim();
        const newC = {
          id: `C${String(DB.customers.length + 1).padStart(2, '0')}`, name,
          type: modal.querySelector('#cf-type').value, phone: modal.querySelector('#cf-phone').value || '—',
          email: modal.querySelector('#cf-email').value, city: modal.querySelector('#cf-city').value,
          since: isoOffset(0), tier: 'جديد', orders: 0, spent: 0, balance: 0, avatar: null,
          initials: name.slice(0, 2), note: modal.querySelector('#cf-note').value,
        };
        DB.customers.unshift(newC);
        STATE.customerId = newC.id;
        closeModal();
        toast(`أُضيف العميل «${name}»`);
        if (location.hash.includes('customers')) renderCurrentPage();
      });
    },
  });
}

/* =========================================================
   المشتريات والموردون
   ========================================================= */
function purchasesPageHTML() {
  const isOrders = STATE.purchasesTab === 'orders';
  return `
    ${headHTML({
      eyebrow: 'المخزون',
      title: 'المشتريات والموردون',
      sub: 'أوامر الشراء، الشحنات الواردة، وأرصدة الموردين.',
      actions: `<button class="btn" id="po-export">${icon('download')} تصدير</button>
                <button class="btn btn-primary" id="new-po">${icon('plus')} أمر شراء</button>`,
    })}
    <div class="toolbar">
      <div class="segmented" id="po-tabs">
        <button class="seg ${isOrders ? 'active' : ''}" data-tab="orders">أوامر الشراء</button>
        <button class="seg ${!isOrders ? 'active' : ''}" data-tab="suppliers">الموردون</button>
      </div>
      <div class="toolbar-spacer"></div>
      <span class="pill ${DB.purchaseOrders.some(p => p.status === 'متأخر') ? 'pill-danger' : 'pill-neutral'}">${icon('alert')} ${DB.purchaseOrders.filter(p => p.status === 'متأخر').length} شحنة متأخرة</span>
    </div>

    ${isOrders ? `
    <div class="card">
      <div class="table-wrap" style="border-radius:var(--radius-lg)">
        <table class="table">
          <thead><tr><th>أمر الشراء</th><th>المورد</th><th class="hide-sm">التاريخ</th><th class="num hide-sm">الأصناف</th><th>الوصول المتوقع</th><th class="num">الإجمالي</th><th>الحالة</th></tr></thead>
          <tbody>
            ${DB.purchaseOrders.map(po => {
              const s = supplierById(po.supplierId);
              return `<tr>
                <td class="cell-strong num" style="text-align:start">${esc(po.id)}</td>
                <td><div class="cell-strong">${esc(s.name)}</div><div class="cell-sub">${esc(s.city)} · ${esc(s.category)}</div></td>
                <td class="hide-sm muted">${esc(shortDate(isoOffset(po.offset)))}</td>
                <td class="num hide-sm">${po.items}</td>
                <td class="${po.status === 'متأخر' ? '' : 'muted'}" style="${po.status === 'متأخر' ? 'color:var(--danger);font-size:11.5px' : ''}">${esc(po.expected)}</td>
                <td class="num cell-strong">${money(po.total)}</td>
                <td>${statusPill(po.status)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="table-foot"><span>${DB.purchaseOrders.length} أوامر شراء</span><span class="tiny">إجمالي الالتزامات ${moneyPlain(DB.purchaseOrders.reduce((s, p) => s + p.total, 0))}</span></div>
    </div>` : `
    <div class="supplier-grid">
      ${DB.suppliers.map(s => `
        <div class="supplier-card">
          <div class="supplier-top">
            <span class="supplier-mark">${esc(s.name.slice(0, 2))}</span>
            <div style="min-width:0">
              <div class="supplier-name">${esc(s.name)}</div>
              <div class="supplier-sub">${esc(s.category)} · ${esc(s.city)}</div>
            </div>
            <span class="rating" style="margin-inline-start:auto">${icon('star')} ${s.rating}</span>
          </div>
          <div class="supplier-stats">
            <div><span>الرصيد المستحق</span><b>${money(s.balance)}</b></div>
            <div><span>مدة التوريد</span><b>${s.lead} يومًا</b></div>
            <div style="text-align:end"><span>جهة الاتصال</span><b style="font-size:11px">${esc(s.contact)}</b></div>
          </div>
          <div style="display:flex;gap:6px;margin-block-start:12px">
            <button class="btn btn-sm" data-supplier-po="${s.id}" style="flex:1">${icon('plus')} أمر شراء</button>
            <a class="btn btn-sm btn-icon-square" href="tel:${esc(s.phone.replace(/\s/g, ''))}" aria-label="اتصال">${icon('phone')}</a>
          </div>
        </div>`).join('')}
    </div>`}`;
}

function mountPurchases() {
  document.getElementById('po-tabs')?.addEventListener('click', (e) => {
    const b = e.target.closest('.seg');
    if (!b || b.dataset.tab === STATE.purchasesTab) return;
    STATE.purchasesTab = b.dataset.tab;
    renderCurrentPage();
  });
  document.getElementById('new-po')?.addEventListener('click', () => newPOModal());
  document.getElementById('po-export')?.addEventListener('click', () => toast('تم تصدير المشتريات (ديمو)'));
  document.querySelectorAll('[data-supplier-po]').forEach(b => b.addEventListener('click', () => newPOModal(b.dataset.supplierPo)));
}

function newPOModal(supplierId = '') {
  openModal({
    title: 'أمر شراء جديد',
    sub: 'سيُرسل للمورد بعد الاعتماد',
    body: `
      <form id="po-form" class="form-grid">
        <div class="field full"><label class="label" for="po-supplier">المورد</label>
          <select class="select" id="po-supplier">${DB.suppliers.map(s => `<option value="${s.id}" ${s.id === supplierId ? 'selected' : ''}>${esc(s.name)} — ${esc(s.category)}</option>`).join('')}</select></div>
        <div class="field"><label class="label" for="po-date">تاريخ الاستلام المتوقع</label><input class="input" id="po-date" type="date" value="${isoOffset(-7)}" /></div>
        <div class="field"><label class="label" for="po-amount">قيمة الأمر (ر.س)</label><input class="input" id="po-amount" type="number" min="1" step="100" placeholder="0" required /></div>
        <div class="field full"><label class="label" for="po-items">وصف الأصناف</label><textarea class="textarea" id="po-items" placeholder="مثال: 12 كنبة لانا — 20 كرسي طعام…"></textarea></div>
      </form>`,
    footer: `<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" id="po-save">${icon('check')} إنشاء الأمر</button>`,
    onMount: (modal) => {
      modal.querySelector('#po-save').addEventListener('click', () => {
        if (!modal.querySelector('#po-form').reportValidity()) return;
        const total = Number(modal.querySelector('#po-amount').value) || 0;
        const s = supplierById(modal.querySelector('#po-supplier').value);
        const num = DB.purchaseOrders.length + 119;
        DB.purchaseOrders.unshift({
          id: `PO-2026-${num}`, supplierId: s.id, offset: 0, status: 'مسودة', total,
          items: Number(modal.querySelector('#po-items').value.length) || 1, expected: 'بانتظار الاعتماد',
        });
        closeModal();
        toast(`أُنشئ أمر شراء بقيمة ${moneyPlain(total)} — بانتظار الاعتماد`);
        renderCurrentPage();
      });
    },
  });
}

/* =========================================================
   المخازن
   ========================================================= */
function warehousesPageHTML() {
  const rows = DB.warehouses.map(w => {
    const items = DB.products.filter(p => p.warehouse === w.name);
    const units = items.reduce((s, p) => s + p.stock, 0);
    const valueOf = items.reduce((s, p) => s + p.stock * p.cost, 0);
    return { ...w, items: items.length, units, valueOf, used: units };
  });
  return `
    ${headHTML({
      eyebrow: 'المخزون',
      title: 'المخازن والفروع',
      sub: 'توزيع المخزون بين المعارض والمستودعات، وسعة كل موقع.',
      actions: `<button class="btn" id="stock-count">${icon('list')} جرد جديد</button>
                <button class="btn btn-primary" id="transfer-stock">${icon('transfer')} تحويل مخزون</button>`,
    })}
    <div class="wh-grid">
      ${rows.map(w => {
        const usage = Math.round((w.used / w.capacity) * 100);
        return `<div class="wh-card">
          <div class="wh-head">
            <span class="wh-icon">${icon('warehouse')}</span>
            <span class="pill ${usage >= 85 ? 'pill-warning' : 'pill-success'}">${usage}% إشغال</span>
          </div>
          <div class="wh-name">${esc(w.name)}</div>
          <div class="wh-city">${esc(w.city)} · ${esc(w.manager)}</div>
          <div class="wh-figures"><b>${fmt(w.used)}</b> من ${fmt(w.capacity)} قطعة</div>
          <div class="progress"><div class="progress-fill ${usage >= 85 ? 'warn' : ''}" style="width:${usage}%"></div></div>
          <div class="wh-foot"><span>قيمة: ${compact(w.valueOf)} ر.س</span><span>آخر جرد: قبل ${w.lastCount} أيام</span></div>
        </div>`;
      }).join('')}
    </div>

    <div class="card" style="margin-block-start:16px">
      ${sectionTitle('توزيع المخزون', 'القطع المسجّلة فعليًا في كل موقع')}
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>الموقع</th><th>المسؤول</th><th class="num">عدد الأصناف</th><th class="num">القطع</th><th class="num">قيمة التكلفة</th><th>السعة</th><th></th></tr></thead>
          <tbody>
            ${rows.map(w => {
              const usage = Math.round((w.used / w.capacity) * 100);
              return `<tr>
                <td><div class="cell-product"><span class="wh-icon" style="width:32px;height:32px">${icon('warehouse')}</span><div><div class="cell-strong">${esc(w.name)}</div><div class="cell-sub">${esc(w.city)}</div></div></div></td>
                <td class="muted">${esc(w.manager)}</td>
                <td class="num">${w.items}</td>
                <td class="num cell-strong">${fmt(w.units)}</td>
                <td class="num">${money(w.valueOf)}</td>
                <td style="min-width:130px"><div style="display:flex;align-items:center;gap:8px"><div class="progress" style="flex:1"><div class="progress-fill ${usage >= 85 ? 'warn' : ''}" style="width:${usage}%"></div></div><span class="tiny muted" style="min-width:30px">${usage}%</span></div></td>
                <td><div class="row-actions"><button class="icon-btn sm" data-wh-transfer aria-label="تحويل">${icon('transfer')}</button></div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function mountWarehouses() {
  document.getElementById('transfer-stock')?.addEventListener('click', transferModal);
  document.querySelectorAll('[data-wh-transfer]').forEach(b => b.addEventListener('click', transferModal));
  document.getElementById('stock-count')?.addEventListener('click', () => toast('تم إنشاء مسودة جرد جديدة (ديمو)', 'info'));
}

function transferModal() {
  openModal({
    title: 'تحويل مخزون',
    sub: 'نقل أصناف بين المواقع دون التأثير على إجمالي المخزون',
    body: `
      <form id="tr-form" class="form-grid">
        <div class="field"><label class="label" for="tr-from">من مخزن</label><select class="select" id="tr-from">${DB.warehouses.map(w => `<option>${esc(w.name)}</option>`).join('')}</select></div>
        <div class="field"><label class="label" for="tr-to">إلى مخزن</label><select class="select" id="tr-to">${DB.warehouses.map((w, i) => `<option ${i === 1 ? 'selected' : ''}>${esc(w.name)}</option>`).join('')}</select></div>
        <div class="field full"><label class="label" for="tr-product">الصنف</label><select class="select" id="tr-product">${DB.products.filter(p => p.stock > 0).map(p => `<option value="${p.id}">${esc(p.name)} — متاح ${p.stock}</option>`).join('')}</select></div>
        <div class="field"><label class="label" for="tr-qty">الكمية</label><input class="input" id="tr-qty" type="number" min="1" value="1" /></div>
        <div class="field"><label class="label" for="tr-note">ملاحظة</label><input class="input" id="tr-note" placeholder="اختياري" /></div>
      </form>
      <div class="alert-bar" style="margin-block:14px 0">${icon('info')}<span>التحويل يسجّل حركة في سجل المخزون ويحدّث الكميات في الموقعين.</span></div>`,
    footer: `<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" id="tr-save">${icon('transfer')} تنفيذ التحويل</button>`,
    onMount: (modal) => {
      modal.querySelector('#tr-save').addEventListener('click', () => {
        const from = modal.querySelector('#tr-from').value;
        const to = modal.querySelector('#tr-to').value;
        if (from === to) { toast('اختر موقعين مختلفين', 'error'); return; }
        const pid = modal.querySelector('#tr-product').value;
        const qty = Number(modal.querySelector('#tr-qty').value) || 1;
        const p = productById(pid);
        if (qty > p.stock) { toast('الكمية أكبر من المتاح', 'error'); return; }
        closeModal();
        toast(`تم تحويل ${qty} من «${p.name}» إلى ${to}`);
      });
    },
  });
}

/* =========================================================
   التقارير
   ========================================================= */
function reportData(range) {
  if (range === '7d') {
    const s = salesSeries(7);
    const total = s.reduce((a, b) => a + b.value, 0);
    const orders = DB.orders.filter(o => o.offset < 7 && o.status !== 'ملغي').length;
    return { series: s.map(x => ({ label: x.label, value: x.value })), total, orders, rangeLabel: 'آخر 7 أيام' };
  }
  if (range === '30d') {
    const total = DB.monthly[DB.monthly.length - 1].sales;
    const orders = DB.monthly[DB.monthly.length - 1].orders;
    const shares = [0.09, 0.1, 0.08, 0.11, 0.09, 0.1, 0.12, 0.09, 0.11, 0.11];
    const series = shares.map((v, i) => ({ label: `${(i * 3) + 1}`, value: Math.round(total * v) }));
    return { series, total, orders, rangeLabel: 'آخر 30 يومًا' };
  }
  const total = DB.monthly.reduce((s, m) => s + m.sales, 0);
  const orders = DB.monthly.reduce((s, m) => s + m.orders, 0);
  return {
    series: DB.monthly.map(m => ({ label: m.label, value: m.sales })),
    total, orders, rangeLabel: 'آخر 12 شهرًا',
  };
}

function reportsPageHTML() {
  const d = reportData(STATE.reportRange);
  const profit = Math.round(d.total * 0.38);
  const avg = d.orders ? d.total / d.orders : 0;
  const cats = categorySales(d.total);
  const catTotal = cats.reduce((s, c) => s + c.amount, 0);
  const yearTotal = DB.monthly.reduce((s, m) => s + m.sales, 0);
  const factor = d.total / yearTotal;
  const tops = topProducts(6).map(p => {
    const qty = Math.max(1, Math.round(p.sold * factor));
    return { ...p, qty, revenue: qty * p.price };
  });

  return `
    ${headHTML({
      eyebrow: 'التحليلات',
      title: 'التقارير',
      sub: 'أداء المبيعات، الفئات الأكثر ربحية، وأداء الفروع.',
      actions: `<div class="segmented" id="report-range">
          ${[['7d', '7 أيام'], ['30d', '30 يومًا'], ['12m', '12 شهرًا']].map(([v, l]) => `<button class="seg ${STATE.reportRange === v ? 'active' : ''}" data-range="${v}">${l}</button>`).join('')}
        </div>
        <button class="btn" id="report-export">${icon('download')} تصدير PDF</button>`,
    })}

    <div class="kpi-strip">
      <div class="kpi">
        <div class="kpi-label">${icon('bag')} إجمالي المبيعات</div>
        <div class="kpi-value">${money(d.total)}</div>
        <div class="kpi-foot"><span class="kpi-delta up">${icon('trendUp')} 12.4%</span><span class="kpi-note">${d.rangeLabel}</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('wallet')} صافي الربح</div>
        <div class="kpi-value">${money(profit)}</div>
        <div class="kpi-foot"><span class="kpi-note">هامش تقديري 38%</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('receipt')} عدد الطلبات</div>
        <div class="kpi-value">${fmt(d.orders)}</div>
        <div class="kpi-foot"><span class="kpi-note">${d.rangeLabel}</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">${icon('chart')} متوسط الطلب</div>
        <div class="kpi-value">${money(avg)}</div>
        <div class="kpi-foot"><span class="kpi-note">قيمة الفاتورة المتوسطة</span></div>
      </div>
    </div>

    <div class="dash-grid" style="margin-block-start:16px">
      <div class="card">
        ${sectionTitle('تطور المبيعات', `${d.rangeLabel} · القيمة شاملة الضريبة`, `<span class="pill pill-gold">${icon('sparkles')} نمو مستمر</span>`)}
        <div class="card-body">
          ${areaChartHTML(d.series, { label: 'تطور المبيعات' })}
        </div>
      </div>
      <div class="card">
        ${sectionTitle('المبيعات حسب الفئة', 'حصة كل فئة من الإيراد')}
        <div class="card-body">
          <div class="donut-wrap">
            <div class="donut" style="background:conic-gradient(var(--chart-1) 0 34%, var(--chart-2) 34% 58%, var(--chart-3) 58% 75%, var(--chart-4) 75% 90%, var(--chart-5) 90% 100%)">
              <div class="donut-center"><b>${compact(catTotal)}</b><span>ر.س</span></div>
            </div>
            <div class="donut-legend">
              ${cats.map((c, i) => `<div class="donut-key"><i style="background:var(--chart-${i + 1})"></i>${c.label}<b>${c.value}%</b></div>`).join('')}
            </div>
          </div>
          <div class="divider" style="margin-block:16px"></div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted)"><span>أعلى فئة ربحية</span><b style="color:var(--foreground)">أطقم الجلوس · 41%</b></div>
        </div>
      </div>
    </div>

    <div class="dash-grid two" style="margin-block-start:16px">
      <div class="card">
        ${sectionTitle('أفضل الأصناف', `الكمية والإيراد — ${d.rangeLabel}`)}
        <div class="table-wrap">
          <table class="table" style="min-width:0">
            <thead><tr><th>الصنف</th><th class="num">الكمية</th><th class="num">الإيراد</th></tr></thead>
            <tbody>
              ${tops.map((p, i) => `<tr>
                <td><div class="cell-product"><span class="top-rank">${i + 1}</span><img class="thumb" style="width:34px;height:34px" src="assets/img/${p.img}" alt="" loading="lazy" /><div><div class="cell-strong">${esc(p.name)}</div><div class="cell-sub">${esc(p.cat)}</div></div></div></td>
                <td class="num">${p.qty}</td>
                <td class="num cell-strong">${money(p.revenue)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        ${sectionTitle('أداء الفروع', 'مبيعات أكتوبر مقابل المستهدف — بالألف ر.س')}
        <div class="card-body">
          <div class="branch-list">
            ${DB.branches.map(b => {
              const pct = Math.min(100, Math.round((b.value / b.target) * 100));
              return `<div class="branch-row">
                <div class="branch-top"><b>${esc(b.name)}</b><span>${b.value} من ${b.target} · ${pct}%</span></div>
                <div class="progress"><div class="progress-fill ${pct >= 80 ? '' : pct >= 65 ? 'gold' : 'warn'}" style="width:${pct}%"></div></div>
              </div>`;
            }).join('')}
          </div>
          <div class="alert-bar" style="margin-block:16px 0">${icon('info')}<span>مستودع الشرقية يعمل بنسبة إشغال 62% — يمكن تحويل جزء من مخزون جدة إليه.</span></div>
        </div>
      </div>
    </div>`;
}

function mountReports() {
  document.getElementById('report-range')?.addEventListener('click', (e) => {
    const b = e.target.closest('.seg');
    if (!b || b.dataset.range === STATE.reportRange) return;
    STATE.reportRange = b.dataset.range;
    renderCurrentPage();
  });
  document.getElementById('report-export')?.addEventListener('click', () => toast('تم تجهيز تقرير PDF (ديمو)'));
}

/* =========================================================
   الإعدادات
   ========================================================= */
const SETTINGS_TABS = [
  { id: 'store', label: 'بيانات المتجر', icon: 'building' },
  { id: 'branches', label: 'الفروع والمخازن', icon: 'pin' },
  { id: 'tax', label: 'الضرائب والفواتير', icon: 'percent' },
  { id: 'users', label: 'المستخدمون والصلاحيات', icon: 'users' },
  { id: 'notifications', label: 'الإشعارات', icon: 'bell' },
];

function settingsPageHTML() {
  return `
    ${headHTML({
      eyebrow: 'النظام',
      title: 'الإعدادات',
      sub: 'بيانات المنشأة، الضرائب، المستخدمون، وتفضيلات التشغيل.',
      actions: `<span class="pill pill-success">${icon('shield')} نسخة آمنة</span>`,
    })}
    <div class="settings-layout">
      <nav class="settings-nav" id="settings-nav" aria-label="أقسام الإعدادات">
        ${SETTINGS_TABS.map(t => `<button class="settings-link ${STATE.settingsTab === t.id ? 'active' : ''}" data-settings="${t.id}">${icon(t.icon)} ${t.label}</button>`).join('')}
      </nav>
      <div id="settings-panel">${settingsPanelHTML()}</div>
    </div>`;
}

function settingsPanelHTML() {
  const t = STATE.settingsTab;
  if (t === 'store') {
    return `
      <div class="settings-panel">
        <div class="settings-panel-head"><h2>بيانات المتجر</h2><p>تظهر هذه البيانات على الفواتير وتقارير العملاء.</p></div>
        <div class="settings-panel-body">
          <div class="logo-row" style="margin-block-end:20px">
            <span class="logo-preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 18.5v-6.2a7.5 7.5 0 0 1 15 0v6.2"/><path d="M2.8 18.5h18.4"/><path d="M9 18.5v-3.3a3 3 0 0 1 6 0v3.3"/></svg></span>
            <div><div style="font-size:12.5px;font-weight:600">شعار المتجر</div><div class="hint">PNG أو SVG · 512×512 · يُحدَّث فورًا</div></div>
            <button class="btn btn-sm" style="margin-inline-start:auto" data-demo-action="الشعار">${icon('upload')} رفع شعار</button>
          </div>
          <div class="form-grid">
            <div class="field"><label class="label" for="st-name">اسم المتجر</label><input class="input" id="st-name" value="${esc(DB.store.name)}" /></div>
            <div class="field"><label class="label" for="st-legal">الاسم القانوني</label><input class="input" id="st-legal" value="${esc(DB.store.legal)}" /></div>
            <div class="field"><label class="label" for="st-vat">الرقم الضريبي</label><input class="input" id="st-vat" dir="ltr" value="${esc(DB.store.vatNumber)}" /></div>
            <div class="field"><label class="label" for="st-cr">السجل التجاري</label><input class="input" id="st-cr" dir="ltr" value="${esc(DB.store.crNumber)}" /></div>
            <div class="field"><label class="label" for="st-phone">هاتف المتجر</label><input class="input" id="st-phone" dir="ltr" value="${esc(DB.store.phone)}" /></div>
            <div class="field"><label class="label" for="st-email">البريد الإلكتروني</label><input class="input" id="st-email" dir="ltr" value="${esc(DB.store.email)}" /></div>
            <div class="field full"><label class="label" for="st-address">العنوان</label><input class="input" id="st-address" value="${esc(DB.store.address)}" /></div>
            <div class="field"><label class="label" for="st-currency">العملة</label><select class="select" id="st-currency"><option>ريال سعودي (SAR)</option><option>درهم إماراتي (AED)</option></select></div>
            <div class="field"><label class="label" for="st-tz">المنطقة الزمنية</label><select class="select" id="st-tz"><option>الرياض (GMT+3)</option><option>دبي (GMT+4)</option></select></div>
          </div>
        </div>
        <div class="settings-panel-foot"><button class="btn btn-ghost btn-sm">إلغاء</button><button class="btn btn-primary btn-sm" data-save>${icon('check')} حفظ التغييرات</button></div>
      </div>`;
  }
  if (t === 'branches') {
    return `
      <div class="settings-panel">
        <div class="settings-panel-head"><h2>الفروع والمخازن</h2><p>المواقع التي يظهر منها المخزون وتُسجَّل منها المبيعات.</p></div>
        <div class="table-wrap">
          <table class="table" style="min-width:520px">
            <thead><tr><th>الموقع</th><th>المدير</th><th class="num">السعة</th><th class="hide-sm">النوع</th><th></th></tr></thead>
            <tbody>
              ${DB.warehouses.map(w => `<tr>
                <td><div class="cell-strong">${esc(w.name)}</div><div class="cell-sub">${esc(w.city)}</div></td>
                <td class="muted">${esc(w.manager)}</td>
                <td class="num">${fmt(w.capacity)}</td>
                <td class="hide-sm"><span class="tag">${w.name.includes('مستودع') ? 'مستودع' : 'معرض'}</span></td>
                <td><div class="row-actions"><button class="icon-btn sm" data-demo-action="تعديل الموقع">${icon('edit')}</button></div></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="settings-panel-foot"><button class="btn btn-sm" data-demo-action="إضافة فرع">${icon('plus')} إضافة فرع</button><button class="btn btn-primary btn-sm" data-save>${icon('check')} حفظ</button></div>
      </div>`;
  }
  if (t === 'tax') {
    return `
      <div class="settings-panel">
        <div class="settings-panel-head"><h2>الضرائب والفواتير</h2><p>إعدادات الفاتورة الإلكترونية وضريبة القيمة المضافة.</p></div>
        <div class="settings-panel-body">
          <div class="form-grid">
            <div class="field"><label class="label" for="tax-rate">نسبة ضريبة القيمة المضافة</label><input class="input" id="tax-rate" type="number" value="15" /></div>
            <div class="field"><label class="label" for="tax-prefix">بادئة رقم الفاتورة</label><input class="input" id="tax-prefix" dir="ltr" value="INV-2026-" /></div>
            <div class="field full"><label class="label" for="tax-terms">شروط الدفع المطبوعة على الفاتورة</label><textarea class="textarea" id="tax-terms">تستحق خلال 30 يومًا من تاريخ الإصدار. الأسعار شاملة ضريبة القيمة المضافة. البضاعة المباعة لا تُرد إلا خلال 7 أيام بحالتها الأصلية.</textarea></div>
          </div>
          <div class="divider" style="margin-block:16px"></div>
          <div class="switch-row">
            <div class="switch-copy"><b>الأسعار شاملة الضريبة</b><span>يُحسب الضريبة من الإجمالي المعروض للعميل.</span></div>
            <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
          </div>
          <div class="switch-row">
            <div class="switch-copy"><b>فوترة إلكترونية (فاتورة)</b><span>ربط تلقائي مع منصة هيئة الزكاة والضريبة والجمارك.</span></div>
            <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
          </div>
          <div class="switch-row">
            <div class="switch-copy"><b>إظهار رمز QR على الفاتورة</b><span>رمز التحقق الإلكتروني أسفل كل فاتورة ضريبية.</span></div>
            <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
          </div>
        </div>
        <div class="settings-panel-foot"><span class="pill pill-success" style="margin-inline-end:auto">${icon('shield')} متوافق مع ZATCA</span><button class="btn btn-primary btn-sm" data-save>${icon('check')} حفظ الإعدادات</button></div>
      </div>`;
  }
  if (t === 'users') {
    return `
      <div class="settings-panel">
        <div class="settings-panel-head"><h2>المستخدمون والصلاحيات</h2><p>تحكم في من يدخل النظام وما يمكنه فعله.</p></div>
        <div class="table-wrap">
          <table class="table" style="min-width:540px">
            <thead><tr><th>المستخدم</th><th>الدور</th><th class="hide-sm">آخر دخول</th><th>الحالة</th><th></th></tr></thead>
            <tbody>
              ${DB.team.map((u, i) => `<tr>
                <td><div class="cell-product">${avatarHTML(u, 'avatar-sm')}<div><div class="cell-strong">${esc(u.name)}</div><div class="cell-sub">${esc(u.name.split(' ')[0].toLowerCase())}@wahba.sa</div></div></div></td>
                <td><span class="role-pill">${esc(u.role)}</span></td>
                <td class="hide-sm muted">${i === 0 ? 'الآن' : `قبل ${i + 1} ساعة`}</td>
                <td><span class="pill pill-success"><span class="dot"></span>نشط</span></td>
                <td><div class="row-actions"><button class="icon-btn sm" data-demo-action="تعديل الصلاحيات">${icon('settings')}</button></div></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="settings-panel-foot"><button class="btn btn-sm" id="invite-user">${icon('userPlus')} دعوة مستخدم</button><button class="btn btn-primary btn-sm" data-save>${icon('check')} حفظ</button></div>
      </div>`;
  }
  return `
    <div class="settings-panel">
      <div class="settings-panel-head"><h2>الإشعارات</h2><p>متى يرسل النظام تنبيهًا، ولمن.</p></div>
      <div class="settings-panel-body">
        <div class="switch-row">
          <div class="switch-copy"><b>تنبيه نفاد المخزون</b><span>عند وصول أي صنف إلى حد إعادة الطلب.</span></div>
          <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
        </div>
        <div class="switch-row">
          <div class="switch-copy"><b>الفواتير المتأخرة</b><span>ملخص يومي بالفواتير التي تجاوزت تاريخ الاستحقاق.</span></div>
          <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
        </div>
        <div class="switch-row">
          <div class="switch-copy"><b>ملخص المبيعات اليومي</b><span>يُرسل 11 مساءً إلى بريد المدير العام.</span></div>
          <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
        </div>
        <div class="switch-row">
          <div class="switch-copy"><b>تنبيهات واتساب للعملاء</b><span>إشعار العميل عند تجهيز الطلب وخروجه للتسليم.</span></div>
          <label class="switch"><input type="checkbox" /><span class="track"></span></label>
        </div>
        <div class="switch-row">
          <div class="switch-copy"><b>تقرير أسبوعي للإدارة</b><span>كل يوم أحد صباحًا.</span></div>
          <label class="switch"><input type="checkbox" checked /><span class="track"></span></label>
        </div>
      </div>
      <div class="settings-panel-foot"><button class="btn btn-primary btn-sm" data-save>${icon('check')} حفظ التفضيلات</button></div>
    </div>`;
}

function mountSettings() {
  document.getElementById('settings-nav')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-settings]');
    if (!b || b.dataset.settings === STATE.settingsTab) return;
    STATE.settingsTab = b.dataset.settings;
    document.querySelectorAll('.settings-link').forEach(x => x.classList.toggle('active', x === b));
    document.getElementById('settings-panel').innerHTML = settingsPanelHTML();
    bindSettingsPanel();
  });
  bindSettingsPanel();
}

function bindSettingsPanel() {
  document.querySelectorAll('[data-save]').forEach(b => b.addEventListener('click', () => toast('تم حفظ الإعدادات بنجاح')));
  document.querySelectorAll('[data-demo-action]').forEach(b => b.addEventListener('click', () => toast(`${b.dataset.demoAction} — متاح في النسخة الكاملة (ديمو)`, 'info')));
  document.querySelector('#invite-user')?.addEventListener('click', () => {
    openModal({
      title: 'دعوة مستخدم',
      sub: 'سيصل رابط التفعيل إلى بريده',
      body: `<div class="form-grid">
        <div class="field full"><label class="label" for="inv-name">الاسم</label><input class="input" id="inv-name" placeholder="اسم الموظف" /></div>
        <div class="field full"><label class="label" for="inv-email">البريد الإلكتروني</label><input class="input" id="inv-email" dir="ltr" placeholder="name@wahba.sa" /></div>
        <div class="field full"><label class="label" for="inv-role">الدور</label><select class="select" id="inv-role"><option>مبيعات</option><option>مسؤول مخزون</option><option>محاسبة</option><option>مشتريات</option></select></div>
      </div>`,
      footer: `<button class="btn btn-ghost" data-close>إلغاء</button><button class="btn btn-primary" id="invite-send">${icon('mail')} إرسال الدعوة</button>`,
      onMount: (m) => m.querySelector('#invite-send').addEventListener('click', () => { closeModal(); toast('أُرسلت الدعوة بنجاح'); }),
    });
  });
  document.querySelectorAll('.switch input').forEach(inp => {
    const row = inp.closest('.switch-row');
    const label = row?.querySelector('.switch-copy b')?.textContent;
    if (label && !inp.getAttribute('aria-label')) inp.setAttribute('aria-label', label);
    inp.addEventListener('change', () => toast('تم تحديث التفضيل'));
  });
}

/* ---------- رسم الشاشة الحالية ---------- */
const PAGE_HTML = {
  dashboard: dashboardHTML,
  pos: posPageHTML,
  sales: salesPageHTML,
  invoices: invoicesPageHTML,
  inventory: inventoryPageHTML,
  customers: customersPageHTML,
  purchases: purchasesPageHTML,
  warehouses: warehousesPageHTML,
  reports: reportsPageHTML,
  settings: settingsPageHTML,
};

const PAGE_MOUNT = {
  dashboard: mountDashboard,
  pos: mountPOS,
  sales: mountSales,
  invoices: mountInvoices,
  inventory: mountInventory,
  customers: mountCustomers,
  purchases: mountPurchases,
  warehouses: mountWarehouses,
  reports: mountReports,
  settings: mountSettings,
};
