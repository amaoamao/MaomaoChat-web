import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController, ToastController} from "ionic-angular";
import {User} from "../../providers/user";

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

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl: AlertController, public user: User, public toastCtrl: ToastController) {

  }

  doSignUp() {
    let loader = this.loadingCtrl.create({
      content: "稍等哦..."
    });
    loader.present();
    console.log({'user': this.account, 'token': this.token});
    this.user.signUp({'user': this.account, 'token': this.token}).map(resp => {
      loader.dismiss();
      return resp;
    }).subscribe(data => {
      this.toastCtrl.create({
        message: data.error.message,
        duration: 800
      }).present();
      if (data.error.code == 0) {
        console.log('pop');
        this.navCtrl.pop();
      }
    }, () => {
      this.toastCtrl.create({
        message: "服务器出错啦，请稍后再试",
        duration: 800
      }).present();
    });
  }

  auth() {
    let loader = this.loadingCtrl.create({
      content: "稍等哦..."
    });
    loader.present();
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
            let loader = this.loadingCtrl.create({
              content: "稍等哦..."
            });
            loader.present();
            this.user.codeAuth({
              'phone': this.account.phone,
              'code': data.code
            }).map(resp => {
              loader.dismiss();
              return resp;
            }).subscribe(data => {
              this.toastCtrl.create({
                message: data.error.message,
                duration: 800
              }).present();
              if (data.error.code == 0) {
                prompt.dismiss();
                this.phoneNumberAuthed = true;
                this.token = data.data.token;
              }
            }, () => {
              this.toastCtrl.create({
                message: '服务器出了点问题，稍后再试吧',
                duration: 800
              }).present();
              prompt.dismiss();
            });
            return false;
          }
        }
      ],
      enableBackdropDismiss: false
    });
    this.user.codeAuth({'phone': this.account.phone}).map(resp => {
      loader.dismiss();
      return resp;
    }).subscribe(data => {
      this.toastCtrl.create({
        message: data.error.message,
        duration: 800
      }).present();
      if (data.error.code == 0) {
        prompt.present();
      }
    }, () => {
      this.toastCtrl.create({
        message: '服务器出了点问题，稍后再试吧',
        duration: 800
      }).present();
      prompt.dismiss();
    });
  }

}
