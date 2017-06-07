import {Component} from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
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

  constructor(public loadingCtrl: LoadingController, public dialogs: Dialogs, public toastCtrl: ToastController, public user: User, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {
    user.getFriends().subscribe(data => {
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

  deleteFriend(item: any) {
    let loader = this.loadingCtrl.create({
      content: "稍等哦..."
    });
    loader.present();
    this.user.deleteFriend(item.phone).subscribe(data => {
      this.toastCtrl.create({
        message: data.error.message,
        duration: 3000
      }).present();
      this.contactList.splice(this.contactList.indexOf(item), 1);
    }, err => {
    }, () => {
      loader.dismiss();
    });
  }
}
