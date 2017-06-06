import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

/*
 Generated class for the ChatController provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ChatController {
  private messages: [{ sender: string; receiver: { type: number; id: string }; message: { type: number; content: string; time: string } }];

  constructor() {
    this.messages = [{
      "sender": "1234567890",

      "receiver": {
        "type": 0,
        "id": "1234567890"
      },

      "message": {
        "type": 0,
        "content": "12345678",
        "time": "2017-5-26 19：30：00"
      }
    }]
  }

  query(phone: string) {
    return Observable.of(...this.messages).filter(item => item.receiver.id === phone);
  }
}
