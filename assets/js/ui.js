/* =========================================================
   وهبة سيستم — واجهة مشتركة: أيقونات، تنقّل، نوافذ، تنبيهات
   ========================================================= */

const ICON_PATHS = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  scan: '<path d="M3 7V5.5A2.5 2.5 0 0 1 5.5 3H7"/><path d="M17 3h1.5A2.5 2.5 0 0 1 21 5.5V7"/><path d="M21 17v1.5a2.5 2.5 0 0 1-2.5 2.5H17"/><path d="M7 21H5.5A2.5 2.5 0 0 1 3 18.5V17"/><path d="M7 12h10"/>',
  bag: '<path d="M6 2 4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4Z"/><path d="M4 6h16"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  receipt: '<path d="M4 2v20l2.2-1.2L8.4 22l2.2-1.2L12.8 22l2.2-1.2L17.2 22l2.2-1.2L21.6 22V2l-2.2 1.2L17.2 2l-2.2 1.2L12.8 2l-2.2 1.2L8.4 2 6.2 3.2Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  box: '<path d="m7.5 4.3 9 5.1"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  warehouse: '<path d="M22 8.4V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.4a2 2 0 0 1 1.3-1.9l8-3.2a2 2 0 0 1 1.5 0l8 3.2A2 2 0 0 1 22 8.4Z"/><path d="M6 21v-7h12v7"/><path d="M6 17h12"/>',
  truck: '<path d="M14 18V6a1 1 0 0 0-1-1H2v13h2"/><path d="M14 9h4l4 4v5h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 18h6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-9"/>',
  settings: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowDown: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  trendUp: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  trendDown: '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 15.5 19.8 17.7 22 18.5l-2.2.8L19 21.5l-.8-2.2-2.2-.8 2.2-.8Z"/><path d="M5 2.5 5.5 4 7 4.5 5.5 5 5 6.5 4.5 5 3 4.5 4.5 4Z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/><path d="M6 15h4"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  wallet: '<path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0 0 4h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6"/><path d="M18 15h.01"/>',
  tag: '<path d="M12 2H2v10l10 10 10-10L12 2Z"/><circle cx="7" cy="7" r="1.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.1Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6L22 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  star: '<path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9Z"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><path d="M3 21v-5h5"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  pie: '<path d="M21.2 15.9A10 10 0 1 1 8.1 2.8"/><path d="M22 12A10 10 0 0 0 12 2v10Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  transfer: '<path d="M4 7h16M4 7l4-4M4 7l4 4"/><path d="M20 17H4M20 17l-4-4M20 17l-4 4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  ruler: '<path d="M3 15 15 3l6 6L9 21Z"/><path d="m7 11 2 2M11 7l2 2M5 13l2 2"/>',
  palette: '<path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 4-4 4h-2a2 2 0 0 0-1.5 3.3c.5.6.3 1.7-.5 2.3a4 4 0 0 1-2 .4Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/>',
};

function icon(name, cls = '') {
  const p = ICON_PATHS[name] || '';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function compact(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace('.0', '')}م`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '')}k`;
  return String(Math.round(n));
}

function avatarHTML(person, cls = '') {
  if (person && person.avatar) {
    return `<img class="avatar ${cls}" src="assets/img/${esc(person.avatar)}" alt="" loading="lazy" />`;
  }
  const text = (person && (person.initials || initials(person.name || ''))) || '—';
  return `<span class="avatar avatar-initial ${cls}" aria-hidden="true">${esc(text)}</span>`;
}

/* ---------- Sidebar ---------- */
function renderNav(active) {
  const nav = document.getElementById('side-nav');
  if (!nav) return;
  nav.innerHTML = DB.nav.map(group => `
    <div class="nav-group">
      <div class="nav-label">${esc(group.group)}</div>
      ${group.items.map(item => {
        let count = item.count;
        if (item.id === 'sales') count = DB.orders.filter(o => o.status === 'قيد التجهيز').length;
        if (item.id === 'invoices') count = invoices().filter(i => invoiceStatus(i) === 'متأخرة').length;
        if (item.id === 'inventory') count = lowStock().length;
        return `
        <a class="nav-link ${item.id === active ? 'active' : ''}" href="#/${item.id}" aria-label="${esc(item.label)}" title="${esc(item.label)}" ${item.id === active ? 'aria-current="page"' : ''}>
          ${icon(item.icon)}
          <span>${esc(item.label)}</span>
          ${count ? `<span class="nav-count">${count}</span>` : ''}
        </a>`;
      }).join('')}
    </div>
  `).join('');
}

function currentPageLabel(page) {
  for (const g of DB.nav) {
    const found = g.items.find(i => i.id === page);
    if (found) return found.label;
  }
  return 'لوحة التحكم';
}

/* ---------- Toast ---------- */
function toast(message, type = 'success') {
  const region = document.getElementById('toast-region');
  if (!region) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(type === 'success' ? 'check' : type === 'error' ? 'alert' : 'info')}<span>${esc(message)}</span>`;
  region.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 200);
  }, 3400);
}

/* ---------- Modal ---------- */
let modalCleanup = null;
let lastFocused = null;

function getFocusable(scope) {
  return [...scope.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
}

function trapFocus(scope) {
  const onKey = (e) => {
    if (e.key !== 'Tab' || !scope) return;
    const items = getFocusable(scope);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    const atEdge = active === scope || !scope.contains(active);
    if (e.shiftKey && (active === first || atEdge)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (active === last || atEdge)) {
      e.preventDefault(); first.focus();
    }
  };
  scope.addEventListener('keydown', onKey);
  return () => scope.removeEventListener('keydown', onKey);
}

function closeModal() {
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = '';
  document.body.style.overflow = '';
  if (modalCleanup) { modalCleanup(); modalCleanup = null; }
  if (lastFocused && lastFocused.isConnected) {
    try { lastFocused.focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }
  lastFocused = null;
}

function openModal(opts = {}) {
  const root = document.getElementById('modal-root');
  if (!root) return null;
  lastFocused = document.activeElement;
  root.innerHTML = `
    <div class="modal-backdrop" data-backdrop>
      <div class="modal ${opts.size || ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
        <div class="modal-head">
          <div>
            <div class="modal-title" id="modal-title">${opts.title || ''}</div>
            ${opts.sub ? `<div class="modal-sub">${opts.sub}</div>` : ''}
          </div>
          <button class="icon-btn sm" data-close aria-label="إغلاق">${icon('x')}</button>
        </div>
        <div class="modal-body ${opts.flush ? 'flush' : ''}">${opts.body || ''}</div>
        ${opts.footer ? `<div class="modal-foot">${opts.footer}</div>` : ''}
      </div>
    </div>`;

  const backdrop = root.querySelector('[data-backdrop]');
  const onBackdrop = (e) => { if (e.target === backdrop) closeModal(); };
  const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
  backdrop.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';

  root.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  const untrap = trapFocus(root.querySelector('.modal'));
  modalCleanup = () => {
    document.removeEventListener('keydown', onKey);
    backdrop.removeEventListener('click', onBackdrop);
    untrap();
  };

  if (typeof opts.onMount === 'function') opts.onMount(root.querySelector('.modal'));
  const modalEl = root.querySelector('.modal');
  const focusEl = modalEl.querySelector('[autofocus], [data-autofocus]') ||
    modalEl.querySelector('input:not([type="hidden"]), select, textarea') || modalEl;
  setTimeout(() => focusEl.focus({ preventScroll: true }), 60);
  return modalEl;
}

function openDrawer(opts = {}) {
  const root = document.getElementById('modal-root');
  if (!root) return null;
  lastFocused = document.activeElement;
  root.innerHTML = `
    <div class="drawer-backdrop" data-drawer-backdrop></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">
      <div class="drawer-head">
        <div style="min-width:0;flex:1">
          <div class="modal-title" id="drawer-title">${opts.title || ''}</div>
          ${opts.sub ? `<div class="modal-sub">${opts.sub}</div>` : ''}
        </div>
        <button class="icon-btn sm" data-close aria-label="إغلاق">${icon('x')}</button>
      </div>
      <div class="drawer-body">${opts.body || ''}</div>
      ${opts.footer ? `<div class="modal-foot">${opts.footer}</div>` : ''}
    </aside>`;

  const backdrop = root.querySelector('[data-drawer-backdrop]');
  const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  root.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  const untrap = trapFocus(root.querySelector('.drawer'));
  modalCleanup = () => { document.removeEventListener('keydown', onKey); untrap(); };
  if (typeof opts.onMount === 'function') opts.onMount(root.querySelector('.drawer'));
  const drawerEl = root.querySelector('.drawer');
  setTimeout(() => drawerEl.focus({ preventScroll: true }), 60);
  return drawerEl;
}

/* ---------- Charts ---------- */
function barChartHTML(series) {
  const max = Math.max(...series.map(s => s.value), 1);
  return `
    <div class="chart-bars" role="img" aria-label="المبيعات اليومية">
      ${series.map(s => `
        <div class="bar-col ${s.today ? 'today' : ''}" title="${esc(s.full || s.label)} — ${fmt(s.value)} ر.س">
          <span class="bar-val">${s.value ? compact(s.value) : '—'}</span>
          <div class="bar ${s.today ? 'today' : ''}" style="height:calc((100% - 46px) * ${s.value ? Math.max(0.02, s.value / max) : 0.01})"></div>
          <span class="bar-lbl">${esc(s.label)}</span>
        </div>
      `).join('')}
    </div>`;
}

function areaChartHTML(series, opts = {}) {
  const W = 760, H = opts.height || 250;
  const pad = { t: 16, r: 58, b: 30, l: 10 };
  const maxRaw = Math.max(...series.map(s => s.value), 1);
  const step = Math.pow(10, Math.floor(Math.log10(maxRaw)));
  const max = Math.ceil(maxRaw / step) * step;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const n = series.length;
  const px = i => pad.l + (n === 1 ? innerW / 2 : (innerW * i) / (n - 1));
  const py = v => pad.t + innerH * (1 - v / max);

  const pts = series.map((s, i) => [px(i), py(s.value)]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  const area = `${d} L ${pts[pts.length - 1][0]} ${pad.t + innerH} L ${pts[0][0]} ${pad.t + innerH} Z`;

  const gridCount = 4;
  let grid = '';
  for (let i = 0; i <= gridCount; i++) {
    const y = pad.t + (innerH * i) / gridCount;
    const val = Math.round(max - (max * i) / gridCount);
    grid += `<line class="grid-line" x1="${pad.l}" y1="${y}" x2="${W - pad.r}" y2="${y}" />`;
    grid += `<text class="axis-label" x="${W - pad.r + 10}" y="${y + 3}">${compact(val)}</text>`;
  }

  const labelEvery = n > 8 ? Math.ceil(n / 7) : 1;
  const xLabels = series.map((s, i) => {
    if (i % labelEvery !== 0 && i !== n - 1) return '';
    return `<text class="axis-label" x="${px(i)}" y="${H - 8}" text-anchor="middle">${esc(s.label)}</text>`;
  }).join('');

  const dots = series.map((s, i) => {
    if (i !== n - 1 && n > 9 && i % labelEvery !== 0) return '';
    return `<circle class="point ${i === n - 1 ? 'last' : ''}" cx="${px(i)}" cy="${py(s.value)}" r="${i === n - 1 ? 4 : 2.6}" />`;
  }).join('');

  return `
    <div class="report-chart">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${opts.label || 'الرسم البياني'}">
        ${grid}
        <path class="area" d="${area}" />
        <path class="line" d="${d}" />
        ${dots}
        ${xLabels}
      </svg>
    </div>`;
}

function sparkline(values) {
  const w = 120, h = 34;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [((w - 4) * i) / (values.length - 1) + 2, h - 4 - ((v - min) / range) * (h - 8)]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path class="line" d="${d}" /></svg>`;
}

/* ---------- Command palette ---------- */
function openPalette() {
  const root = document.getElementById('modal-root');
  if (!root) return;
  lastFocused = document.activeElement;

  const pages = DB.nav.flatMap(g => g.items).map(p => ({ type: 'شاشة', label: p.label, sub: 'انتقال', icon: p.icon, href: `#/${p.id}` }));
  const products = DB.products.map(p => ({ type: 'منتج', label: p.name, sub: `${p.sku} · ${p.stock} قطعة`, icon: 'box', href: `#/inventory`, action: 'product', id: p.id }));
  const customers = DB.customers.filter(c => !c.walkIn).map(c => ({ type: 'عميل', label: c.name, sub: `${c.city} · ${c.type}`, icon: 'users', href: `#/customers`, action: 'customer', id: c.id }));
  const invs = invoices().slice(0, 12).map(v => ({ type: 'فاتورة', label: v.id, sub: `${customerById(v.customerId).name} · ${fmt(v.total)} ر.س`, icon: 'receipt', action: 'invoice', id: v.id }));

  const build = (q) => {
    const query = q.trim();
    const match = (arr) => arr.filter(x => !query || `${x.label} ${x.sub}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
    const groups = [
      { title: 'الشاشات', items: match(pages) },
      { title: 'المنتجات', items: match(products) },
      { title: 'العملاء', items: match(customers) },
      { title: 'الفواتير', items: match(invs) },
    ].filter(g => g.items.length);

    if (!groups.length) {
      return `<div class="empty"><div class="empty-icon">${icon('search')}</div><b>لا نتائج</b><p>جرّب اسم منتج، عميل، أو رقم فاتورة.</p></div>`;
    }
    let idx = 0;
    return groups.map(g => `
      <div class="palette-group">${g.title}</div>
      ${g.items.map(it => {
        const i = idx++;
        return `<button class="palette-item" role="option" aria-selected="false" tabindex="-1" id="palette-opt-${i}" data-palette-idx="${i}" data-type="${it.type}" data-id="${it.id || ''}" data-href="${it.href || ''}" data-action="${it.action || ''}">
          <span class="pi-icon">${icon(it.icon)}</span>
          <span class="pi-main">${esc(it.label)}<span>${esc(it.sub)}</span></span>
          <span class="pi-enter">↵</span>
        </button>`;
      }).join('')}
    `).join('');
  };

  root.innerHTML = `
    <div class="palette-backdrop" data-palette-backdrop>
      <div class="palette" role="dialog" aria-modal="true" aria-label="بحث سريع">
        <div class="palette-input-wrap">
          ${icon('search')}
          <input class="palette-input" id="palette-input" placeholder="ابحث في النظام…" aria-label="بحث سريع" autocomplete="off" autofocus role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" />
          <kbd class="kbd">ESC</kbd>
        </div>
        <div class="palette-list" id="palette-list" role="listbox" aria-label="نتائج البحث">${build('')}</div>
        <div class="palette-foot"><span>↑↓ للتنقل</span><span>↵ للفتح</span><span>ESC للإغلاق</span></div>
      </div>
    </div>`;

  const backdrop = root.querySelector('[data-palette-backdrop]');
  const input = root.querySelector('#palette-input');
  const list = root.querySelector('#palette-list');
  let selected = 0;

  const items = () => [...list.querySelectorAll('.palette-item')];
  const paint = () => {
    const all = items();
    all.forEach((el, i) => {
      const on = i === selected;
      el.classList.toggle('sel', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (all[selected]) input.setAttribute('aria-activedescendant', all[selected].id);
    else input.removeAttribute('aria-activedescendant');
  };

  const choose = (el) => {
    if (!el) return;
    const { action, id, href } = el.dataset;
    closeModal();
    if (action === 'product') { location.hash = '#/inventory'; setTimeout(() => openProduct(id), 160); }
    else if (action === 'customer') { STATE.customerId = id; location.hash = '#/customers'; }
    else if (action === 'invoice') { openInvoice(id); }
    else if (href) {
      if (location.hash === href) renderCurrentPage();
      else location.hash = href;
    }
  };

  input.addEventListener('input', () => {
    list.innerHTML = build(input.value);
    selected = 0;
    paint();
  });
  list.addEventListener('click', (e) => {
    const el = e.target.closest('.palette-item');
    if (el) choose(el);
  });
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  document.body.style.overflow = 'hidden';

  const onKey = (e) => {
    if (e.key === 'Escape') { closeModal(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, items().length - 1); paint(); items()[selected]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); paint(); items()[selected]?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(items()[selected]); }
  };
  document.addEventListener('keydown', onKey);
  const untrap = trapFocus(root.querySelector('.palette'));
  modalCleanup = () => { document.removeEventListener('keydown', onKey); untrap(); };
  paint();
  setTimeout(() => input.focus({ preventScroll: true }), 30);
}

/* ---------- Notifications ---------- */
function openNotifications() {
  openModal({
    title: 'الإشعارات',
    sub: 'آخر التحديثات التي تحتاج انتباهك',
    body: `<div class="notif-list">${DB.notifications.map(n => `
      <button class="notif" data-goto="${n.page}">
        <span class="notif-icon ${n.tone}">${icon(n.tone === 'success' ? 'check' : n.tone === 'danger' ? 'alert' : n.tone === 'warning' ? 'clock' : 'info')}</span>
        <span class="notif-body"><b>${esc(n.title)}</b><span>${esc(n.body)}</span></span>
      </button>`).join('')}</div>`,
    footer: `<button class="btn btn-ghost btn-sm" data-close>إغلاق</button><button class="btn btn-primary btn-sm" id="mark-read">${icon('check')} تعليم الكل كمقروء</button>`,
    onMount: (modal) => {
      modal.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => {
        closeModal();
        location.hash = `#/${b.dataset.goto}`;
      }));
      modal.querySelector('#mark-read').addEventListener('click', () => {
        document.querySelector('.bell-dot')?.remove();
        closeModal();
        toast('تم تعليم كل الإشعارات كمقروءة');
      });
    },
  });
}

/* ---------- دليل الديمو ---------- */
function openDemoGuide() {
  const items = [
    { icon: 'scan', title: 'نقطة البيع', desc: 'أضف أصنافًا للسلة، جرّب الخصم وطريقة الدفع، ثم أتمم البيع واطبع الإيصال.', href: '#/pos' },
    { icon: 'box', title: 'المخزون', desc: 'ابحث وصفِّ المنتجات، افتح صنفًا لرؤية تفاصيله، أو أضف صنفًا جديدًا.', href: '#/inventory' },
    { icon: 'receipt', title: 'الفواتير', desc: 'افتح فاتورة ضريبية كاملة، سجّل دفعة، أو اطبعها.', href: '#/invoices' },
    { icon: 'chart', title: 'التقارير', desc: 'بدّل الفترة بين 7 أيام و30 يومًا و12 شهرًا وشاهد الأرقام تتغير.', href: '#/reports' },
  ];
  openModal({
    title: 'دليل النسخة التجريبية',
    sub: 'كل شيء يعمل محليًا — جرّب بحرية',
    body: `
      <p style="font-size:12.5px;color:var(--muted);line-height:1.8;margin-block-end:6px">
        هذه نسخة عرض كاملة لنظام <b style="color:var(--foreground)">وهبة سيستم</b>. البيانات والأسماء وهمية، وأي تعديل تجريه يبقى داخل المتصفح ويُعاد عند تحديث الصفحة.
      </p>
      <div>
        ${items.map(i => `
          <div class="guide-item">
            <span class="guide-icon">${icon(i.icon)}</span>
            <div class="guide-copy"><b>${i.title}</b><span>${i.desc}</span></div>
            <a class="btn btn-sm" href="${i.href}" data-close>جرّب</a>
          </div>`).join('')}
      </div>
      <div class="alert-bar" style="margin-block:12px 0">${icon('info')}<span>اختصار البحث السريع: <kbd class="kbd">⌘K</kbd> أو <kbd class="kbd">Ctrl K</kbd></span></div>`,
    footer: `<button class="btn btn-ghost btn-sm" id="demo-reset">${icon('refresh')} إعادة تحميل البيانات</button><button class="btn btn-primary btn-sm" data-close>ابدأ التجربة</button>`,
    onMount: (m) => {
      m.querySelector('#demo-reset').addEventListener('click', () => location.reload());
    },
  });
}
