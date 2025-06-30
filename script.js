const supabaseUrl = 'https://dftxrmlepmufduwxtwxr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHhybWxlcG11ZmR1d3h0d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTM3NzYsImV4cCI6MjA2NjU4OTc3Nn0.E5CDsvpDNzWhVATuqEcflQGtRH6jH3J1imtGKO3yX70';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
  const categories = await loadCategories();
  const frameworks = categories.find(c => c.slug === 'frameworks');
  const subcategories = frameworks ? await loadSubcategories(frameworks.id) : [];

  renderTabs(categories, subcategories);

  // Загружаем статьи первой вкладки по умолчанию
  if (categories.length > 0) {
    await loadArticlesByCategorySlug(categories[0].slug);
  }

  // Обработчик вкладок
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('tab-button') && !e.target.classList.contains('dropdown-toggle')) {
      const slug = e.target.dataset.tab;
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      await loadArticlesByCategorySlug(slug);
    }

    if (e.target.classList.contains('dropdown-toggle')) {
      const dropdown = e.target.closest('.dropdown');
      dropdown.classList.toggle('open');
    }

    if (e.target.classList.contains('dropdown-item')) {
      const slug = e.target.dataset.sub;
      document.querySelector('.dropdown').classList.remove('open');
      await loadArticlesBySubcategorySlug(slug);
    }
  });
});

async function loadCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true });
  return data || [];
}

async function loadSubcategories(categoryId) {
  const { data } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .order('order', { ascending: true });
  return data || [];
}

function renderTabs(categories, subcategories) {
  const container = document.querySelector('.tab-buttons');
  container.innerHTML = '';

  categories.forEach(cat => {
    if (cat.slug !== 'frameworks') {
      const btn = document.createElement('button');
      btn.classList.add('tab-button');
      btn.dataset.tab = cat.slug;
      btn.textContent = cat.name;
      container.appendChild(btn);
    }
  });

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  const toggle = document.createElement('button');
  toggle.classList.add('tab-button', 'dropdown-toggle');
  toggle.textContent = 'Ещё ▾';
  dropdown.appendChild(toggle);

  const menu = document.createElement('div');
  menu.classList.add('dropdown-menu');

  subcategories.forEach(sub => {
    const item = document.createElement('button');
    item.classList.add('dropdown-item');
    item.dataset.sub = sub.slug;
    item.textContent = sub.name;
    menu.appendChild(item);
  });

  dropdown.appendChild(menu);
  container.appendChild(dropdown);
}

async function loadArticlesByCategorySlug(slug) {
  const { data: categories } = await supabase.from('categories').select('*');
  const category = categories.find(c => c.slug === slug);
  if (!category) return;

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('category_id', category.id)
    .order('order', { ascending: true });

  renderArticles(articles);
}

async function loadArticlesBySubcategorySlug(slug) {
  const { data: subcategories } = await supabase.from('subcategories').select('*');
  const sub = subcategories.find(s => s.slug === slug);
  if (!sub) return;

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('subcategory_id', sub.id)
    .order('order', { ascending: true });

  renderArticles(articles);
}

function renderArticles(articles) {
  const container = document.querySelector('.tab-content');
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = '<p>Нет доступных статей.</p>';
    return;
  }

  articles.forEach(article => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('article-item');

    const title = document.createElement('h3');
    title.textContent = article.title;

    const content = document.createElement('div');
    content.innerHTML = article.content;

    wrapper.appendChild(title);
    wrapper.appendChild(content);
    container.appendChild(wrapper);
  });
}
