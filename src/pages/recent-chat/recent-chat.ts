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
import {ChatPage} from "../chat/chat";
import {User} from "../../providers/user";
import {Dialogs} from "../../providers/dialogs";
import {ChatController} from "../../providers/chat-controller";

/**
 * Generated class for the RecentChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-recent-chat',
  templateUrl: 'recent-chat.html'
})
export class RecentChatPage {
  currentItems: [{ sender: string, receiver: { type: number, id: string }, message: { type: number, content: string, time: string } }];


  constructor(public chatCtrl: ChatController, public loadingCtrl: LoadingController, public dialogs: Dialogs, public toastCtrl: ToastController, public user: User, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {
    this.currentItems = this.chatCtrl.getAll();

  }


  addFriend() {
    this.dialogs.addClick(this.loadingCtrl, this.alertCtrl, this.user, this.toastCtrl, this.actionSheetCtrl, this.platform);
  }


  deleteItem(item) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }

  presentActionSheet(item, sliding) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: `将与${item.name}的对话`,
      buttons: [
        {
          text: `${item.fixed ? '取消' : ''}置顶`,
          icon: !this.platform.is('ios') ? 'arrow-up' : null,
          handler: () => {
            that.makeItTop(item, sliding);
          }
        }, {
          text: '删除',
          icon: !this.platform.is('ios') ? 'trash' : null,
          role: 'destructive',
          handler: () => {
            that.deleteItem(item);
          }
        }
      ]
    });
    actionSheet.present();
  }

  openItem(item: any) {
    this.navCtrl.push(ChatPage, {
      item: {phone: item.sender != this.user.phone ? item.sender : item.receiver.id}
    });
  }

  makeItTop(item: any, sliding: any) {
    item.fixed = !item.fixed;
    sliding.close();
    console.log(item);
  }

  toggleMenu() {
    this.menu.toggle();
  }
}

