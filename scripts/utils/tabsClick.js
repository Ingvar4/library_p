export function tabsClick() {
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('tab-button') && !e.target.classList.contains('dropdown-toggle')) {
      const slug = e.target.dataset.tab;
      await loadArticlesByCategorySlug(slug);
    }

    if (e.target.classList.contains('dropdown-item')) {
      const slug = e.target.dataset.sub;
      await loadArticlesBySubcategorySlug(slug);
      document.querySelector('.dropdown').classList.remove('open');
    }

    if (e.target.classList.contains('dropdown-toggle')) {
      document.querySelector('.dropdown').classList.toggle('open');
    }
  });
}