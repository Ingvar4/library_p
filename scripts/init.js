import { tabsSwitchMainPage } from "./utils/tabs_main_page.js";
// import { supabaseRender } from "./render/supabaseRender.js";
import { loadTabsAndArticles } from "./utils/loadTabsFromBase.js";
import { renderTabs } from "./render/renderTabsMainPage.js";
import { loadArticlesByCategorySlug } from "./utils/loadTopics.js";
import { loadArticlesBySubcategorySlug } from "./render/renderSubcatTabs.js";
import { renderArticleList } from "./render/renderArticleList.js";
import { tabsClick } from "./utils/tabsClick.js";

export function initApp() {
  tabsSwitchMainPage();
  // supabaseRender();
  loadTabsAndArticles();
  renderTabs();
  loadArticlesByCategorySlug();
  loadArticlesBySubcategorySlug();
  renderArticleList();
  tabsClick();
}