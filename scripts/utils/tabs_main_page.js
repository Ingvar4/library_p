export function tabsSwitchMainPage() {
  document.addEventListener('DOMContentLoaded', function () {
    const allTabButtons = document.querySelectorAll('.tab-button');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.dropdown');

    function activateTab(tabId) {
      // Удаляем активность у всех
      allTabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Отмечаем активной кнопку, если она не внутри dropdown
      const matchingButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
      if (matchingButton) matchingButton.classList.add('active');

      // Показываем нужный контент
      const content = document.getElementById(tabId);
      if (content) content.classList.add('active');

      // Закрываем dropdown, если он был открыт
      dropdownContainer.classList.remove('open');
    }

    // Обычные кнопки вкладок
    allTabButtons.forEach(button => {
      if (!button.classList.contains('dropdown-toggle')) {
        button.addEventListener('click', () => {
          const tabId = button.dataset.tab;
          activateTab(tabId);
        });
      }
    });

    // Dropdown вкладки
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.dataset.tab;
        activateTab(tabId);
      });
    });

    // Кнопка "Ещё ▾" открывает/закрывает dropdown
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownContainer.classList.toggle('open');
    });

    // Клик вне dropdown закрывает его
    document.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove('open');
      }
    });
  });
};

