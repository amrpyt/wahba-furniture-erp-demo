/* =========================================================
   وهبة سيستم — التوجيه، الهيكل، واختصارات لوحة المفاتيح
   ========================================================= */

let currentRoute = 'dashboard';

function parseRoute() {
  const raw = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
  return PAGE_HTML[raw] ? raw : 'dashboard';
}

function renderRoute(resetScroll = true) {
  const page = parseRoute();
  currentRoute = page;
  const view = document.getElementById('view');
  if (!view) return;

  view.innerHTML = `<div class="page">${PAGE_HTML[page]()}</div>`;
  document.getElementById('crumb-current').textContent = currentPageLabel(page);
  document.title = `${currentPageLabel(page)} — وهبة سيستم`;
  renderNav(page);

  if (typeof PAGE_MOUNT[page] === 'function') PAGE_MOUNT[page]();

  document.getElementById('app').classList.remove('nav-open');
  document.getElementById('sidebar-toggle')?.setAttribute('aria-expanded', 'false');

  if (resetScroll) {
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }
}

function renderCurrentPage() {
  renderRoute(false);
}

/* ---------- Sidebar ---------- */
function applyCollapsed(collapsed) {
  const app = document.getElementById('app');
  STATE.sidebarCollapsed = collapsed;
  app.classList.toggle('collapsed', collapsed);
  const btn = document.getElementById('collapse-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', String(!collapsed));
    btn.setAttribute('aria-label', collapsed ? 'توسيع القائمة الجانبية' : 'تصغير القائمة الجانبية');
  }
  try { localStorage.setItem('wahba:collapsed', collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
}

function toggleMobileNav(open) {
  const app = document.getElementById('app');
  const isOpen = typeof open === 'boolean' ? open : !app.classList.contains('nav-open');
  app.classList.toggle('nav-open', isOpen);
  document.getElementById('sidebar-toggle')?.setAttribute('aria-expanded', String(isOpen));
}

/* ---------- Account menu ---------- */
function openUserMenu() {
  openModal({
    size: 'modal-sm',
    title: 'الحساب',
    body: `
      <div style="display:flex;align-items:center;gap:13px;margin-block-end:16px">
        <img class="avatar xl round" src="assets/img/u-ahmed.jpg" alt="" />
        <div>
          <div style="font-size:14px;font-weight:600">أحمد وهبة</div>
          <div class="tiny muted">المدير العام · فرع جدة</div>
          <div class="tiny muted" dir="ltr" style="text-align:start">ahmed@wahba.sa</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px">
        <button class="palette-item" data-account="profile">${icon('users')}<span class="pi-main">الملف الشخصي<span>بياناتك وتفضيلاتك</span></span></button>
        <button class="palette-item" data-account="settings">${icon('settings')}<span class="pi-main">إعدادات النظام<span>المتجر، الضرائب، الصلاحيات</span></span></button>
        <button class="palette-item" data-account="shift">${icon('clock')}<span class="pi-main">إغلاق الوردية<span>ملخص مبيعات اليوم</span></span></button>
      </div>`,
    footer: `<button class="btn btn-ghost btn-sm" data-close>إغلاق</button><button class="btn btn-danger btn-sm" id="logout">${icon('logout')} تسجيل الخروج</button>`,
    onMount: (m) => {
      m.querySelector('[data-account="settings"]').addEventListener('click', () => { closeModal(); location.hash = '#/settings'; });
      m.querySelector('[data-account="profile"]').addEventListener('click', () => toast('الملف الشخصي متاح في النسخة الكاملة (ديمو)', 'info'));
      m.querySelector('[data-account="shift"]').addEventListener('click', () => {
        closeModal();
        const k = kpis();
        toast(`الوردية: ${k.count} طلبات · ${moneyPlain(k.sales)}`);
      });
      m.querySelector('#logout').addEventListener('click', () => { closeModal(); toast('وضع تجريبي — لا يوجد تسجيل خروج فعلي', 'info'); });
    },
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const scrim = document.getElementById('scrim');
  if (scrim) scrim.hidden = false;

  try {
    if (localStorage.getItem('wahba:collapsed') === '1') applyCollapsed(true);
  } catch (e) { /* ignore */ }

  renderRoute();

  document.getElementById('collapse-btn')?.addEventListener('click', () => {
    applyCollapsed(!STATE.sidebarCollapsed);
  });
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => toggleMobileNav());
  scrim?.addEventListener('click', () => toggleMobileNav(false));

  document.getElementById('search-trigger')?.addEventListener('click', openPalette);
  document.getElementById('bell-btn')?.addEventListener('click', openNotifications);
  document.getElementById('demo-guide')?.addEventListener('click', openDemoGuide);
  document.getElementById('user-chip')?.addEventListener('click', openUserMenu);

  window.addEventListener('hashchange', () => renderRoute());
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar a[href^="#/"]');
    if (link) toggleMobileNav(false);
  });

  document.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (document.getElementById('modal-root')?.children.length) closeModal();
      openPalette();
    }
    if (e.key === 'Escape') {
      const app = document.getElementById('app');
      if (app.classList.contains('nav-open')) toggleMobileNav(false);
    }
  });
});
