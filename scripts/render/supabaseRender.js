import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export function supabaseRender() {
  const supabaseUrl = 'https://dftxrmlepmufduwxtwxr.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHhybWxlcG11ZmR1d3h0d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTM3NzYsImV4cCI6MjA2NjU4OTc3Nn0.E5CDsvpDNzWhVATuqEcflQGtRH6jH3J1imtGKO3yX70';
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function loadTOC() {
    // 1. Вкладки
    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true });

    // 2. Для dropdown-категории (пример: slug = 'frameworks')
    const dropdownCategory = categories.find(c => c.slug === 'frameworks');
    let subcategories = [];
    if (dropdownCategory) {
      const { data } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', dropdownCategory.id)
        .order('order', { ascending: true });
      subcategories = data;
    }

    // 3. Статьи в каждой категории
    const allArticlePromises = categories.map(async cat => {
      const { data: articles } = await supabase
        .from('articles')
        .select('id, title, slug, subcategory_id')
        .or(`category_id.eq.${cat.id},subcategory_id.is.null`) // для прямых вкладок
        .eq('category_id', cat.id)
        .order('order', { ascending: true });
      return { category: cat, articles };
    });
    const articlesByCategory = await Promise.all(allArticlePromises);

    // 4. Статьи в группах dropdown
    const subcatPromises = subcategories.map(async sub => {
      const { data: articles } = await supabase
        .from('articles')
        .select('id, title, slug')
        .eq('subcategory_id', sub.id)
        .order('order', { ascending: true });
      return { subcategory: sub, articles };
    });
    const articlesBySubcategory = await Promise.all(subcatPromises);

    return { categories, articlesByCategory, subcategories, articlesBySubcategory };
  }
}
