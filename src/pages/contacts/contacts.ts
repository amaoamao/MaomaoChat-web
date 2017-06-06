import {Component} from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  MenuController,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from "ionic-angular";
import {User} from "../../providers/user";
import {Dialogs} from "../../providers/dialogs";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the Contacts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  contactList: any[];

  constructor(public dialogs: Dialogs, public toastCtrl: ToastController, public user: User, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {
    user.getFriends().map(data => data.json()).subscribe(data => {
      console.log(data);
      this.contactList = data.data;
    });
  }


  toggleMenu() {
    this.menu.toggle();
  }

  addFriend() {
    this.dialogs.addClick(this.alertCtrl, this.user, this.toastCtrl, this.actionSheetCtrl, this.platform);
  }

  openItem(item: any) {
    this.navCtrl.push(ChatPage, {
      item: item
    });
  }
}
