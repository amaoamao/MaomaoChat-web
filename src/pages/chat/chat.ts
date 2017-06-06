import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ChatController} from "../../providers/chat-controller";


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  private name: string;
  private phone: string;
  private avatar: string;
  private messages: any[];

  constructor(public chatCtrl: ChatController, public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    this.name = item.name;
    this.phone = item.phone;
    this.avatar = item.avatar;

  }

  dismiss() {
    this.navCtrl.pop();
  }
}
