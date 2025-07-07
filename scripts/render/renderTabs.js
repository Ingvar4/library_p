export function renderTabs () {
  

  const slug = new URLSearchParams(window.location.search).get('slug');
  const articleContainer = document.getElementById('article');

  const tabMap = {
    tab1: '../pages/toc-html.html',
    tab2: '../pages/toc-css.html',
    tab3: '../pages/toc-js.html',
    tab4: '../pages/toc-postgres.html',
    tab5: '../pages/toc-react.html',
    tab6: '../pages/toc-next.html'
  };

  // Состояние вкладки 1: статья или оглавление?
  let isTab1ShowingArticle = false;

  async function loadArticle(slug) {
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !article) {
      articleContainer.innerHTML = '<p>Статья не найдена.</p>';
      return;
    }

    // articleContainer.innerHTML = `
    //   <div class="article-head">
    //     <button id="back-to-html" class="back-button">← Назад к HTML</button>
    //     <h1>${article.title}</h1>
    //   </div>
    //   <div>${article.content}</div>
    // `;

    if (window.Prism) Prism.highlightAll();

    isTab1ShowingArticle = true;

    // Назад к оглавлению
    document.getElementById('back-to-html')?.addEventListener('click', () => {
      loadTabContent('tab1', tabMap['tab1']);
      isTab1ShowingArticle = false;
    });
    document.getElementById('back-to-css')?.addEventListener('click', () => {
      loadTabContent('tab2', tabMap['tab2']);
      isTab1ShowingArticle = false;
    });
  }

  async function loadTabContent(tabId, filePath) {
    const target = document.getElementById(tabId);
    if (!target) return;

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

  function setActiveTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    const tab = document.getElementById(tabId);
    if (btn) btn.classList.add('active');
    if (tab) tab.classList.add('active');
  }

  // Обработка кликов по вкладкам
  document.querySelectorAll('.tab-button').forEach(button => {
    if (!button.classList.contains('dropdown-toggle')) {
      button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        setActiveTab(tabId);

        if (tabId === 'tab1') {
          if (isTab1ShowingArticle) {
            // если сейчас показана статья → показать оглавление
            loadTabContent('tab1', tabMap['tab1']);
            isTab1ShowingArticle = false;
          }
        } else {
          loadTabContent(tabId, tabMap[tabId]);
        }
      });
    }
  });

  // Dropdown
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.dataset.tab;
      const dropdown = document.querySelector('.dropdown');
      dropdown.classList.remove('open');

      setActiveTab(tabId);
      loadTabContent(tabId, tabMap[tabId]);
    });
  });

  // Загрузка по умолчанию
  if (slug) {
    setActiveTab('tab1');
    loadArticle(slug);
  } else {
    setActiveTab('tab1');
    loadTabContent('tab1', tabMap['tab1']);
    isTab1ShowingArticle = false;
  }
}

