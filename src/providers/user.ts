import {Injectable} from "@angular/core";
import {Api} from "./api";
import "rxjs/Rx";
import {Storage} from "@ionic/storage";
import {Headers, RequestOptions} from "@angular/http";
import {$WebSocket, WebSocketSendMode} from "angular2-websocket/angular2-websocket";

@Injectable()
export class User {
  public token: string;
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers});
  private ws: $WebSocket;
  private friend: any;
  public phone: string;

  constructor(public api: Api, public storage: Storage) {
    storage.get('token').then(value => {
      if (value) {
        this.token = value;
        this.headers.set('token', this.token);
        this.connectSocket();
      }
    });
    storage.get('phone').then(value => {
      if (value) {
        this.phone = value;
      }
    });
  }


  connectSocket() {
    this.ws = new $WebSocket(`ws://maomaochat.tech:8080/chat/${this.token}`);
    this.ws.getDataStream().subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }


  sendMessage(msg: { sender: string, receiver: { type: number, id: string }, message: { type: number, content: string } }) {
    return this.ws.send(msg, WebSocketSendMode.Observable, false);
  }


  login(accountInfo: any) {
    let seq = this.api.post('signIn', accountInfo).map(res => res.json()).share();
    seq
      .subscribe(res => {
        if (res.error.code == 0) {
          this._loggedIn(res.data.token, accountInfo.phone);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  signUp(accountInfo: any) {
    let seq = this.api.post('signUp', accountInfo).map(res => res.json()).share();

    seq

      .subscribe(() => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  codeAuth(info: any) {
    let seq = this.api.get('signUp/auth', info).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addFriend(phone: string, remark: string) {
    let seq = this.api.get(`set/relation/create?friend=${phone}&remark=${remark}`, {}, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addGroup(group: string) {
    let seq = this.api.get(`set/group/mem/create?group=${group}`, {}, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addChannel(channel: string) {
    let seq = this.api.get(`set/channel/mem/create?channel=${channel}`, {}, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  createGroup(data: { name: string, intro: string }) {
    let seq = this.api.post(`set/group/create`, data, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  createChannel(data: { name: string, intro: string }) {
    let seq = this.api.post(`set/channel/create`, data, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  getFriends() {
    // if (this.friend) {
    //   return Observable.of(this.friend);
    // } else {
    let seq = this.api.get('set/relation/get', {}, this.requestOption).map(res => res.json()).share();
    seq.subscribe((data) => {
      this.friend = data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
    // }
    // return seq;
    // return Observable.of({
    //   "error": {
    //     "code": 0,
    //     "message": "删除成功"
    //   },
    //
    //   "data":[{
    //     "id":0,
    //     "phone":"12345678901",
    //     "name":"用户的备注名",
    //     "password":null,
    //     "isMale":true,
    //     "avatar":"url",
    //     "token":null,
    //     "expiredate":null
    //   },
    //     {
    //       "id":0,
    //       "phone":"12345678901",
    //       "name":"用户的备注名",
    //       "password":null,
    //       "isMale":true,
    //       "avatar":"url",
    //       "token":null,
    //       "expiredate":null
    //     }
    //   ]//数组形式
    // });
  }


  logout() {
    this.token = null;
    this.storage.remove('token');
  }


  _loggedIn(resp, phone) {
    this.token = resp;
    this.headers.set('token', this.token);
    this.storage.set('token', this.token);
    this.phone = phone;
    this.storage.set('phone', this.phone);
    this.connectSocket();
  }

  deleteFriend(phone: string) {
    let seq = this.api.get(`set/relation/delete?friend=${phone}`, {}, this.requestOption).map(res => res.json()).share();
    seq.subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
}
