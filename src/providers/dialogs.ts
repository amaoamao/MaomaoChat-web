import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ActionSheetController, AlertController, Platform, ToastController} from "ionic-angular";
import {User} from "./user";

/*
 Generated class for the Dialogs provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Dialogs {

  constructor(public http: Http) {
    console.log('Hello Dialogs Provider');
  }

  addClick(alertCtrl: AlertController, user: User, toastCtrl: ToastController, actionSheetCtrl: ActionSheetController, platform: Platform) {


    let actionSheet = actionSheetCtrl.create({
      buttons: [
        {
          text: '添加好友',
          icon: !platform.is('ios') ? 'person-add' : null,
          handler: () => {
            console.log('添加好友');
            this.showAddFriendDialog(alertCtrl, toastCtrl, user);
          }
        }, {
          text: '添加群组',
          icon: !platform.is('ios') ? 'people' : null,
          handler: () => {
            console.log('添加群组');
            this.showAddGroupDialog(alertCtrl, toastCtrl, user);
          }
        }, {
          text: '添加频道',
          icon: !platform.is('ios') ? 'radio' : null,
          handler: () => {
            console.log('添加频道');
            this.showAddChannelDialog(alertCtrl, toastCtrl, user);
          }
        }, {
          text: '创建群组',
          icon: !platform.is('ios') ? 'create' : null,
          handler: () => {
            console.log('创建群组');
            this.showCreateGroupDialog(alertCtrl, toastCtrl, user);
          }
        }, {
          text: '创建频道',
          icon: !platform.is('ios') ? 'create' : null,
          handler: () => {
            console.log('创建频道');
            this.showCreateChannelDialog(alertCtrl, toastCtrl, user);
          }
        }
      ]
    });
    actionSheet.present();
  }

  showAddFriendDialog(alertCtrl: AlertController, toastCtrl: ToastController, user: User) {
    let prompt = alertCtrl.create({
      title: '添加好友',
      message: '输入一个手机号来添加为好友',
      inputs: [
        {
          name: 'phone',
          placeholder: '手机号'
        },
        {
          name: 'mark',
          placeholder: '给他的备注是啥嘞'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '走着',
          handler: data => {
            console.log(data);
            user.addFriend(data.phone, data.mark).map(data => data.json()).subscribe(data => {
              toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private showAddGroupDialog(alertCtrl: AlertController, toastCtrl: ToastController, user: User) {
    let prompt = alertCtrl.create({
      title: '添加群组',
      message: '输入一个ID来添加群组',
      inputs: [
        {
          name: 'group',
          placeholder: '群组编号'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '走着',
          handler: data => {
            console.log(data);
            user.addGroup(data.group).map(data => data.json()).subscribe(data => {
              toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private showAddChannelDialog(alertCtrl: AlertController, toastCtrl: ToastController, user: User) {
    let prompt = alertCtrl.create({
      title: '添加频道',
      message: '输入一个ID来添加频道',
      inputs: [
        {
          name: 'channel',
          placeholder: '频道编号'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '走着',
          handler: data => {
            console.log(data);
            user.addChannel(data.channel).map(data => data.json()).subscribe(data => {
              toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private showCreateGroupDialog(alertCtrl: AlertController, toastCtrl: ToastController, user: User) {
    let prompt = alertCtrl.create({
      title: '创建群组',
      message: '请输入群组名和群组介绍～',
      inputs: [
        {
          name: 'name',
          placeholder: '群组名'
        }, {
          name: 'intro',
          placeholder: '群组介绍'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '走着',
          handler: data => {
            console.log(data);
            user.createGroup(data).map(data => data.json()).subscribe(data => {
              toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private showCreateChannelDialog(alertCtrl: AlertController, toastCtrl: ToastController, user: User) {
    let prompt = alertCtrl.create({
      title: '创建频道',
      message: '请输入频道名和频道介绍～',
      inputs: [
        {
          name: 'name',
          placeholder: '频道名'
        }, {
          name: 'intro',
          placeholder: '频道介绍'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '走着',
          handler: data => {
            console.log(data);
            user.createChannel(data).map(data => data.json()).subscribe(data => {
              toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
