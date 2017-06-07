import {Component} from "@angular/core";
import {ActionSheetController, MenuController, ModalController, NavController, Platform} from "ionic-angular";
import {RecentChatPage} from "../recent-chat/recent-chat";
import {ContactsPage} from "../contacts/contacts";
import {User} from "../../providers/user";
import {WelcomePage} from "../welcome/welcome";


@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  private tab1: any;
  private tab2: any;
  private tab3: any;
  private items: [{ icon: string; handle: any; title: string }];


  constructor(public user: User, public navCtrl: NavController, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    let that = this;
    this.tab1 = RecentChatPage;
    this.tab2 = ContactsPage;
    this.tab3 = RecentChatPage;
    this.items = [{
      icon: 'log-out', handle: () => {
        that.menu.toggle();
        that.navCtrl.popToRoot();
        that.navCtrl.setRoot(WelcomePage, {}, {
          animate: true,
          direction: 'forward'
        });
        that.user.logout();
      }, title: '退出登录'
    }];
  }


  ionViewDidEnter() {
    this.menu.enable(true);
  }


}
