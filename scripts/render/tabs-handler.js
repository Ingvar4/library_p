// import { scrollToTopButton } from "../utils/scrollToTopButton";

export function initTabsModule(supabase) {
    const tabMap = {
    tab1: 'pages/toc-html.html',
    tab2: 'pages/toc-css.html',
    tab3: 'pages/toc-js.html',
    tab4: 'pages/toc-postgres.html',
    tab5: 'pages/toc-react.html',
    tab6: 'pages/toc-next.html',
    tab1: '../pages/toc-html.html',
  };

  let currentTab = 'tab1';

  function setActiveTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId)?.classList.add('active');

    currentTab = tabId;
  }
  // loadTabContent ОРИГИНАЛЬНЫЙ

  // async function loadTabContent(tabId) {
  //   const target = document.getElementById(tabId);
  //   if (!target) return;
  //   target.innerHTML = '<p>Загрузка...</p>';

  //   try {
  //     const res = await fetch(tabMap[tabId]);
  //     if (!res.ok) throw new Error('Ошибка загрузки');
  //     const html = await res.text();
  //     target.innerHTML = html;
  //   } catch (err) {
  //     target.innerHTML = '<p>Не удалось загрузить оглавление.</p>';
  //   }
  // }

  
  async function loadTabContent(tabId) {
    const filePath = tabMap[tabId];
    const target = document.getElementById(tabId);
    if (!filePath || !target) return;

    target.innerHTML = '<p>Загрузка...</p>';
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Ошибка загрузки');
      const html = await response.text();
      target.innerHTML = html;
    } catch (err) {
      target.innerHTML = '<p>Не удалось загрузить оглавление.</p>';
      console.error(err);
    }
  }

  async function loadArticle(slug, tabId) {
    const tab = document.getElementById(tabId);
    if (!tab) return;

    const center = document.querySelector('.center-block');
    if (center) center.style.display = 'none';

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
      return;
    }

    articleDiv.innerHTML = `<h1>${data.title}</h1><div>${data.content}</div>`;
    if (window.Prism) Prism.highlightAll();
  }

  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', async () => {
      const tabId = btn.dataset.tab;
      setActiveTab(tabId);
      await loadTabContent(tabId);

      const center = document.querySelector('.center-block');
      if (center) center.style.display = '';
    });
  });

  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-slug]');
    if (link) {
      e.preventDefault();
      const slug = link.dataset.slug;
      const tabId = link.dataset.tab || currentTabId;
      if (slug && tabId) {
        loadArticle(slug, tabId);
      }
    }
  });
  // Глобальный делегат для статей ОРИГИНАЛЬНЫЙ

  // document.addEventListener('click', e => {
  //   const link = e.target.closest('a.pagesLinks');
  //   if (!link) return;

  //   const href = link.getAttribute('href'); // index.html?slug=...
  //   const url = new URL(href, window.location.origin);
  //   const slug = url.searchParams.get('slug');
  //   if (!slug) return;

  //   e.preventDefault();
  //   history.pushState({}, '', `?slug=${slug}`);
  //   loadArticle(slug, currentTab);
  // });

  // при загрузке страницы
  const urlSlug = new URLSearchParams(location.search).get('slug');
  if (urlSlug) {
    setActiveTab('tab1');
    loadArticle(urlSlug, 'tab1');
  } else {
    setActiveTab('tab1');
    loadTabContent('tab1');
  }
}