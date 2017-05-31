import {Component} from "@angular/core";

import {MenuController, NavController} from "ionic-angular";

import {WelcomePage} from "../welcome/welcome";

import {Storage} from "@ionic/storage";

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage) {
    storage.ready().then(() => {
      storage.get("first_launch").then(val => {
        if (val != "false") {
          storage.set("first_launch", "false");
        } else {
          this.startApp();
        }
      })
    });
    this.slides = [
      {
        title: "欢迎来到MaomaoChat",
        description: "有眼光",
        image: 'assets/img/ica-slidebox-img-1.png'
      },
      {
        title: "特点",
        description: "极简，跨平台",
        image: 'assets/img/ica-slidebox-img-2.png'
      },
      {
        title: "现在就开始",
        description: "惊了惊了",
        image: 'assets/img/ica-slidebox-img-3.png'
      }
    ];
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

}
