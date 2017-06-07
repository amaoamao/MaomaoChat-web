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
  private messages: [{ sender: string; receiver: { type: number; id: string }; message: { type: number; content: string; time: string } }];

  constructor(storage: Storage) {
    this.messages = [{
      "sender": "1",

      "receiver": {
        "type": 0,
        "id": "17761302891"
      },

      "message": {
        "type": 0,
        "content": "晚上吃啥啊",
        "time": "2017-5-26 19：30：00"
      }
    }, {
      "sender": "2",

      "receiver": {
        "type": 0,
        "id": "17761302891"
      },

      "message": {
        "type": 0,
        "content": "晚上吃啥啊",
        "time": "2017-5-26 19：30：00"
      }
    }]

  }

  query(phone: string) {
    console.log(this.messages);
    return Observable.from(this.messages).filter(item => item.receiver.id === phone || item.sender === phone).toArray();
  }

  push(msg: { sender: string; receiver: { type: number; id: string }; message: { type: number; content: string; time: string } }) {
    this.messages.push(msg);
  }
}
