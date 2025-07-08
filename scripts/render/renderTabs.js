const tabMap = {
  tab1: 'pages/toc-html.html',
  tab2: 'pages/toc-css.html',
  tab3: 'pages/toc-js.html',
  tab4: 'pages/toc-postgres.html',
  tab5: 'pages/toc-react.html',
  tab6: 'pages/toc-next.html'
};

let currentTab = null;

function setActiveTab(tabId) {
  // Удаляем активные классы
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  // Добавляем активность
  const btn = document.querySelector(`[data-tab="${tabId}"]`);
  const content = document.getElementById(tabId);
  if (btn) btn.classList.add('active');
  if (content) content.classList.add('active');

  currentTab = tabId;
}

async function loadTabContent(tabId) {
  const el = document.getElementById(tabId);
  if (!el) return;

  el.innerHTML = '<p class="loading">Загрузка содержимого...</p>';

  const file = tabMap[tabId];
  if (!file) {
    el.innerHTML = '<p class="empty">Содержимое ещё не добавлено.</p>';
    return;
  }

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error();
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    el.innerHTML = '<p class="empty">Ошибка загрузки содержимого.</p>';
    console.error(err);
  }
}

function setupTabs() {
  // Основные кнопки вкладок
  document.querySelectorAll('.tab-button').forEach(btn => {
    if (!btn.classList.contains('dropdown-toggle')) {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        if (tabId) {
          setActiveTab(tabId);
          loadTabContent(tabId);
        }
      });
    }
  });

  // Кнопки из выпадающего меню
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.dataset.tab;
      if (tabId) {
        setActiveTab(tabId);
        loadTabContent(tabId);
        // закрыть меню (если оно раскрывается по hover, можно убрать)
        document.querySelector('.dropdown-menu')?.classList.remove('open');
      }
    });
  });
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setActiveTab('tab1');
  loadTabContent('tab1');
});