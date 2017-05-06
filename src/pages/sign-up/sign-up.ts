import {Component} from "@angular/core";
import {AlertController, NavController, ToastController} from "ionic-angular";
import {Http} from "@angular/http";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  phoneNumberAuthed: boolean = false;

  account: { name: string, phone: string, password: string } = {
    name: '',
    phone: '',
    password: ''
  };
  token: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public toastCtrl: ToastController) {

  }

  doSignUp() {
    this.http.post(`http://localhost:8080/api/signup`, {'user': this.account, 'token': this.token}).subscribe(data => {
      data = data.json();
      this.toastCtrl.create({
        message: data['error']['message'],
        duration: 3000
      }).present();
      if (data['error']['code'] == '0') {
        this.navCtrl.pop();
      }
    });
  }

  auth() {
    let prompt = this.alertCtrl.create({
      title: '手机号验证',
      message: "请输入您收到的验证码",
      inputs: [
        {
          name: 'code',
          placeholder: '验证码'
        },
      ],
      buttons: [
        {
          text: '确认',
          handler: data => {
            this.http.get(`http://localhost:8080/api/signup/auth?phone=${this.account.phone}&code=${data['code']}`).subscribe(data => {
              data = data.json();
              this.toastCtrl.create({
                message: data['error']['message'],
                duration: 3000
              }).present();
              if (data['error']['code'] == 0) {
                prompt.dismiss();
                this.phoneNumberAuthed = true;
                this.token = data['token'];
              }
            }, err => {
              console.log('err' + err);
              this.toastCtrl.create({
                message: '服务器出了点问题，稍后再试吧',
                duration: 3000
              }).present();
              prompt.dismiss();
            });
            return false;
          }
        }
      ],
      enableBackdropDismiss: false
    });
    prompt.present();
    this.http.get(`http://localhost:8080/api/signup/auth?phone=${this.account.phone}`).subscribe(data => {
      data = data.json();
      this.toastCtrl.create({
        message: data['error']['message'],
        duration: 3000
      }).present();
      if (data['error']['code'] != 0) {
        prompt.dismiss();
      }
    }, err => {
      console.log('err' + err);
      this.toastCtrl.create({
        message: '服务器出了点问题，稍后再试吧',
        duration: 3000
      }).present();
      prompt.dismiss();
    });
  }

}
