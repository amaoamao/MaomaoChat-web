import {Component, ViewChild} from "@angular/core";

import {MenuController, Nav, Platform} from "ionic-angular";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TutorialPage} from "../pages/tutorial/tutorial";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TutorialPage;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      // {title: 'tutorial', component: TutorialPage, icon: 'flower'},
      // {title: 'welcome', component: WelcomePage, icon: 'flower'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
