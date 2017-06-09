import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ChatController} from "../../providers/chat-controller";
import {User} from "../../providers/user";
import {Observable} from "rxjs/Observable";


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
    Observable.interval(1000).subscribe(() => chatCtrl.query(this.phone).subscribe(data => {
        this.messages = data;
      })
    );

  }

  sendMessage() {
    let msg = {
      sender: this.user.phone,

      receiver: {
        type: 0,
        id: this.phone
      },

      message: {
        type: 0,
        content: this.text,
        time: new Date().toDateString()
      }
    };
    this.messages.push(msg);
    this.chatCtrl.push(msg);
    this.user.sendMessage(msg).subscribe(msg => console.log('SUCCEED', msg), err => console.error("FAILED", err));
    this.text = '';
    console.log(this.messages);
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
