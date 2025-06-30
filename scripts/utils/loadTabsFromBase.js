export async function loadTabsAndArticles() {
  // Получаем вкладки
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  // Получаем группы внутри dropdown (например, frameworks)
  const dropdownCategory = categories.find(c => c.slug === 'frameworks');
  let subcategories = [];

  if (dropdownCategory) {
    const { data: subs } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', dropdownCategory.id)
      .order('order', { ascending: true });
    subcategories = subs;
  }

  renderTabs(categories, subcategories);
}