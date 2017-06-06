import {Component} from "@angular/core";
import {ActionSheetController, MenuController, ModalController, NavController, Platform} from "ionic-angular";
import {RecentChatPage} from "../recent-chat/recent-chat";
import {ContactsPage} from "../contacts/contacts";


@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  private tab1: any;
  private tab2: any;
  private tab3: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    this.tab1 = RecentChatPage;
    this.tab2 = ContactsPage;
    this.tab3 = RecentChatPage;
  }


  ionViewDidEnter() {
    this.menu.enable(true);
  }



}
