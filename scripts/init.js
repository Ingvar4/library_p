import { tabsSwitchMainPage } from "./utils/tabs_main_page.js";
import { prism } from "./utils/prism.js";
import { openHeaderMenu } from "./utils/open_menu_header.js";

export function initApp() {
  tabsSwitchMainPage();
  prism();
  openHeaderMenu();
}