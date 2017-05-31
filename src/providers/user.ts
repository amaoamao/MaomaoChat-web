import {Injectable} from "@angular/core";
import {Api} from "./api";
import "rxjs/Rx";

@Injectable()
export class User {
  public _user: any;

  constructor(public api: Api) {
  }


  login(accountInfo: any) {
    let seq = this.api.post('signIn', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.error.code == 0) {
          this._loggedIn(res);
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
      .subscribe(res => {
        if (res.error.code == 0) {
          this._loggedIn(res);
        }
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


  logout() {
    this._user = null;
  }


  _loggedIn(resp) {
    this._user = resp.user;
  }
}
