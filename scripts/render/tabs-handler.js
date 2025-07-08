import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://dftxrmlepmufduwxtwxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHhybWxlcG11ZmR1d3h0d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTM3NzYsImV4cCI6MjA2NjU4OTc3Nn0.E5CDsvpDNzWhVATuqEcflQGtRH6jH3J1imtGKO3yX70');

// 1. Карта toc-файлов
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
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');

  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');

  // Удаление статьи из всех вкладок
  document.querySelectorAll('.tab-content').forEach(c => {
    const article = c.querySelector('#article');
    if (article) article.remove();
  });

  currentTab = tabId;
}

async function loadTabContent(tabId) {
  const el = document.getElementById(tabId);
  if (!el) return;

  el.innerHTML = '<p class="loading">Загрузка содержимого...</p>';

  const file = tabMap[tabId];
  if (!file) {
    el.innerHTML = '<p class="empty">Содержимое пока не добавлено.</p>';
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

async function loadArticle(slug, tabId) {
  setActiveTab(tabId);
  const tab = document.getElementById(tabId);
  if (!tab) return;

  const articleDiv = document.createElement('div');
  articleDiv.id = 'article';
  articleDiv.innerHTML = '<p class="loading">Загрузка статьи...</p>';
  tab.innerHTML = '';
  tab.appendChild(articleDiv);

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    articleDiv.innerHTML = '<p>Статья не найдена.</p>';
  } else {
    articleDiv.innerHTML = `<h1>${data.title}</h1><div>${data.content}</div>`;
    if (window.Prism) Prism.highlightAll();
  }
}

// Навешивание обработчиков
function setupTabs() {
  // Обычные вкладки (без dropdown-toggle)
  document.querySelectorAll('.tab-button').forEach(btn => {
    if (!btn.classList.contains('dropdown-toggle')) {
      btn.addEventListener('click', async () => {
        const tabId = btn.dataset.tab;
        if (tabId) {
          setActiveTab(tabId);
          await loadTabContent(tabId);
        }
      });
    }
  });

  // Dropdown-вкладки
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', async () => {
      const tabId = item.dataset.tab;
      if (tabId) {
        setActiveTab(tabId);
        await loadTabContent(tabId);
        document.querySelector('.dropdown-menu')?.classList.remove('open');
      }
    });
  });
}

// Делегирование кликов по ссылкам на статьи
document.addEventListener('click', e => {
  const a = e.target.closest('a.pagesLinks');
  if (!a) return;
  e.preventDefault();

  const url = new URL(a.href, location.origin);
  const slug = url.searchParams.get('slug');
  const tabId = a.dataset.tab || currentTab;

  const pathname = location.pathname;
  const targetPage =
    tabId === 'tab1' ? 'article.html' :
    tabId === 'tab2' ? 'article-css.html' :
    tabId === 'tab3' ? 'article-js.html' :
    tabId === 'tab4' ? 'article-postgres.html' :
    tabId === 'tab5' ? 'article-react.html' :
    tabId === 'tab6' ? 'article-next.html' :
    '';

  if (!pathname.endsWith(targetPage)) {
    window.location.href = `${targetPage}?slug=${slug}`;
  } else {
    loadArticle(slug, tabId);
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();

  const pathname = location.pathname;
  const initialTab =
    pathname.endsWith('article-css.html') ? 'tab2' :
    pathname.endsWith('article-js.html') ? 'tab3' :
    pathname.endsWith('article-postgres.html') ? 'tab4' :
    pathname.endsWith('article-react.html') ? 'tab5' :
    pathname.endsWith('article-next.html') ? 'tab6' :
    'tab1';

  setActiveTab(initialTab);

  const urlSlug = new URLSearchParams(location.search).get('slug');
  if (urlSlug) {
    loadArticle(urlSlug, initialTab);
  } else {
    loadTabContent(initialTab);
  }
});