import {Component} from "@angular/core";
import {AlertController, NavController, ToastController} from "ionic-angular";
import {User} from "../../providers/user";
import {MainPage} from "../main/main";

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public user: User, public toastCtrl: ToastController) {

  }

  doSignUp() {
    this.user.signUp({'user': this.account, 'token': this.token}).map(data => data.json()).subscribe(data => {
      this.toastCtrl.create({
        message: data.error.message,
        duration: 3000
      }).present();
      if (data.error.code == 0) {
        this.navCtrl.setRoot(MainPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }
    }, () => {
      this.toastCtrl.create({
        message: "服务器出错啦，请稍后再试",
        duration: 3000
      }).present();
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
            this.user.codeAuth({
              'phone': this.account.phone,
              'code': data.code
            }).map(data => data.json()).subscribe(data => {
              this.toastCtrl.create({
                message: data.error.message,
                duration: 3000
              }).present();
              if (data.error.code == 0) {
                prompt.dismiss();
                this.phoneNumberAuthed = true;
                this.token = data.token;
              }
            }, () => {
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
    this.user.codeAuth({'phone': this.account.phone}).map(data => data.json()).subscribe(data => {
      this.toastCtrl.create({
        message: data.error.message,
        duration: 3000
      }).present();
      if (data.error.code != 0) {
        prompt.dismiss();
      }
    }, () => {
      this.toastCtrl.create({
        message: '服务器出了点问题，稍后再试吧',
        duration: 3000
      }).present();
      prompt.dismiss();
    });
  }

}
