import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ChatController} from "../../providers/chat-controller";
import {User} from "../../providers/user";


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  private name: string;
  private phone: string;
  private avatar: string;
  private messages: any[];
  private text: string = '';

  constructor(public user: User, public chatCtrl: ChatController, public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    this.name = item.name;
    this.phone = item.phone;
    this.avatar = item.avatar;
    chatCtrl.query(this.phone).subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage() {
    let msg = {
      "sender": this.user.phone,

      "receiver": {
        "type": 0,
        "id": this.phone
      },

      "message": {
        "type": 0,
        "content": this.text,
        "time": "2017-5-26 19：30：00"
      }
    };
    this.messages.push(msg);
    this.chatCtrl.push(msg);
    this.text = '';
    console.log(this.messages);
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
