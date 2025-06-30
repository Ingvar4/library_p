export function renderArticleList(articles) {
  const container = document.querySelector('.tab-content');
  container.innerHTML = ''; // очищаем

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article-item');

    const title = document.createElement('h3');
    title.textContent = article.title;

    const content = document.createElement('div');
    content.innerHTML = article.content;

    articleElement.appendChild(title);
    articleElement.appendChild(content);
    container.appendChild(articleElement);
  });
}