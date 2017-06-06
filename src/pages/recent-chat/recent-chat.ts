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
import {ChatPage} from "../chat/chat";
import {User} from "../../providers/user";
import {Dialogs} from "../../providers/dialogs";

/**
 * Generated class for the RecentChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-recent-chat',
  templateUrl: 'recent-chat.html',
})
export class RecentChatPage {
  currentItems: any[] = [
    {
      "name": "User1",
      "avatar": "assets/img/speakers/bear.jpg",
      "about": "晚上吃啥啊",
      "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User2",
      "avatar": "assets/img/speakers/cheetah.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User3",
      "avatar": "assets/img/speakers/duck.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User4",
      "avatar": "assets/img/speakers/eagle.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User5",
      "avatar": "assets/img/speakers/elephant.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User6",
      "avatar": "assets/img/speakers/mouse.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    },
    {
      "name": "User7",
      "avatar": "assets/img/speakers/puppy.jpg",
      "about": "晚上吃啥啊", "phone": "123456",
      "time": "17:36"
    }
  ];

  constructor(public dialogs: Dialogs, public toastCtrl: ToastController, public user: User, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {
  }


  addFriend() {
    this.dialogs.addClick(this.alertCtrl, this.user, this.toastCtrl, this.actionSheetCtrl, this.platform);
  }


  deleteItem(item) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }

  presentActionSheet(item) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: `将与${item.name}的对话`,
      buttons: [
        {
          text: '置顶',
          icon: !this.platform.is('ios') ? 'arrow-up' : null,
          handler: () => {
            that.makeItTop(item);
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
      item: item
    });
  }

  makeItTop(item: any) {

  }

  toggleMenu() {
    this.menu.toggle();
  }
}
