import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";

/*
 Generated class for the ChatController provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ChatController {
  private messages: [{ sender: string, receiver: { type: number, id: string }, message: { type: number, content: string, time: string } }];

  constructor(storage: Storage) {
    this.messages = [{
      sender: "",

      receiver: {
        type: 0,
        id: ""
      },

      message: {
        type: 0,
        content: "",
        time: ""
      }
    }]
  }

  query(phone: string) {
    return Observable.from(this.messages).filter(item => item.receiver.id === phone || item.sender === phone).toArray();
  }

  push(msg: { sender: string; receiver: { type: number; id: string }; message: { type: number; content: string; time: string } }) {
    this.messages.push(msg);
  }
}
