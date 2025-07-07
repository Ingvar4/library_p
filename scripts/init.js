import { tabsSwitchMainPage } from "./utils/tabs_main_page.js";
import { prism } from "./utils/prism.js";
import { openHeaderMenu } from "./utils/open_menu_header.js";
import { switchTheme } from "./utils/switchTheme.js";
import { scrollToTopButton } from "./utils/scrollToTopButton.js";
// import { renderTabs } from "./render/renderTabs.js";
// import { SBclient } from "./api/SBclient.js";

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { initTabsModule} from './render/tabs-handler.js';

const supabase = createClient('https://dftxrmlepmufduwxtwxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHhybWxlcG11ZmR1d3h0d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTM3NzYsImV4cCI6MjA2NjU4OTc3Nn0.E5CDsvpDNzWhVATuqEcflQGtRH6jH3J1imtGKO3yX70');
initTabsModule(supabase);


export function initApp() {
  tabsSwitchMainPage();
  prism();
  openHeaderMenu();
  switchTheme();
  scrollToTopButton();
  // renderTabs();
  // SBclient();
}