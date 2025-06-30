export async function loadArticlesByCategorySlug(slug) {
  const { data: categories } = await supabase.from('categories').select('*');
  const category = categories.find(c => c.slug === slug);
  if (!category) return;

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('category_id', category.id)
    .order('order', { ascending: true });

  renderArticleList(articles);
}