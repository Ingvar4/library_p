import { tabsSwitchMainPage } from "./utils/tabs_main_page.js";
import { prism } from "./utils/prism.js";
import { openHeaderMenu } from "./utils/open_menu_header.js";
import { switchTheme } from "./utils/switchTheme.js";
import { scrollToTopButton } from "./utils/scrollToTopButton.js";
import { renderTabs } from "./render/renderTabs.js";

export function initApp() {
  tabsSwitchMainPage();
  prism();
  openHeaderMenu();
  switchTheme();
  scrollToTopButton();
  renderTabs();
}