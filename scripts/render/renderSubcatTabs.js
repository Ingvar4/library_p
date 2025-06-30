export async function loadArticlesBySubcategorySlug(slug) {
  const { data: subcategories } = await supabase.from('subcategories').select('*');
  const sub = subcategories.find(s => s.slug === slug);
  if (!sub) return;

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('subcategory_id', sub.id)
    .order('order', { ascending: true });

  renderArticleList(articles);
}