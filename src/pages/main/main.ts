import {Component} from "@angular/core";
import {ActionSheetController, MenuController, ModalController, NavController, Platform} from "ionic-angular";
import {ChatPage} from "../chat/chat";


@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  currentItems: any[] = [
    {
      "name": "User1",
      "profilePic": "assets/img/speakers/bear.jpg",
      "about": "晚上吃啥啊",
      "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User2",
      "profilePic": "assets/img/speakers/cheetah.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User3",
      "profilePic": "assets/img/speakers/duck.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User4",
      "profilePic": "assets/img/speakers/eagle.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User5",
      "profilePic": "assets/img/speakers/elephant.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User6",
      "profilePic": "assets/img/speakers/mouse.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    },
    {
      "name": "User7",
      "profilePic": "assets/img/speakers/puppy.jpg",
      "about": "晚上吃啥啊", "id": "123456",
      "time": "17:36"
    }
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public platform: Platform,) {
  }


  addItem() {
    // let addModal = this.modalCtrl.create(ItemCreatePage);
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.items.add(item);
    //   }
    // });
    // addModal.present();
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

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  toggleMenu() {
    this.menu.toggle();
  }

  makeItTop(item: any) {

  }
}
