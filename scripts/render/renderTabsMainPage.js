export function renderTabs(categories, subcategories) {
  const tabButtonsContainer = document.querySelector('.tab-buttons');

  categories.forEach(cat => {
    if (cat.slug !== 'frameworks') {
      const btn = document.createElement('button');
      btn.classList.add('tab-button');
      btn.textContent = cat.name;
      btn.dataset.tab = cat.slug;
      tabButtonsContainer.appendChild(btn);
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
    item.textContent = sub.name;
    item.dataset.sub = sub.slug;
    menu.appendChild(item);
  });

  dropdown.appendChild(menu);
  tabButtonsContainer.appendChild(dropdown);
}