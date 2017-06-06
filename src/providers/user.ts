import {Injectable} from "@angular/core";
import {Api} from "./api";
import "rxjs/Rx";
import {Storage} from "@ionic/storage";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class User {
  public token: string;
  private headers: Headers = new Headers();
  private requestOption: RequestOptions = new RequestOptions({headers: this.headers});

  constructor(public api: Api, public storage: Storage) {
    storage.get('token').then(value => {
      this.token = value;
      this.headers.set('token', this.token);
      this.connectSocket();
    });
  }

  connectSocket() {

  }


  login(accountInfo: any) {
    let seq = this.api.post('signIn', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.error.code == 0) {
          this._loggedIn(res.data.token);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  signUp(accountInfo: any) {
    let seq = this.api.post('signUp', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(() => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  codeAuth(info: any) {
    let seq = this.api.get('signUp/auth', info).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addFriend(phone: string, remark: string) {
    let seq = this.api.get(`set/relation/create?friend=${phone}&remark=${remark}`, {}, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addGroup(group: string) {
    let seq = this.api.get(`set/group/mem/create?group=${group}`, {}, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addChannel(channel: string) {
    let seq = this.api.get(`set/channel/mem/create?channel=${channel}`, {}, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  createGroup(data: { name: string, intro: string }) {
    let seq = this.api.post(`set/group/create`, data, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  createChannel(data: { name: string, intro: string }) {
    let seq = this.api.get(`set/channel/create`, data, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  getFriends() {
    let seq = this.api.get('set/relation/get', {}, this.requestOption).share();
    seq.map(data => data.json()).subscribe(() => {
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
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
    this.storage.clear();
  }


  _loggedIn(resp) {
    this.token = resp;
    this.headers.set('token', this.token);
    this.storage.set('token', this.token);
    this.connectSocket();
  }
}
