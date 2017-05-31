import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  private name: string;
  private id: string;
  private profilePic: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    this.name = item.name;
    this.id = item.id;
    this.profilePic = item.profilePic;
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
