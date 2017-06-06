import {Component, ViewChild} from "@angular/core";

import {App, IonicApp, MenuController, Nav, Platform} from "ionic-angular";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
// import {MainPage} from "../pages/main/main";
import {TutorialPage} from "../pages/tutorial/tutorial";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TutorialPage;
  // rootPage = MainPage;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen, private app: App, private ionicApp: IonicApp) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupBackButtonBehavior();
    });
  }


  private setupBackButtonBehavior() {

    // If on web version (browser)
    if (window.location.protocol !== "file:") {

      // Register browser back button action(s)
      window.onpopstate = () => {

        // Close menu if open
        if (this.menu.isOpen()) {
          this.menu.close();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this.app.getRootNav().canGoBack()) this.app.getRootNav().pop();

      };

      // Fake browser history on each view enter
      this.app.viewDidEnter.subscribe(() => {
        history.pushState(null, null, "");
      });

    }

  }
}
