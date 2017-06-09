import {Component} from "@angular/core";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {User} from "../../providers/user";
import {MainPage} from "../main/main";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { phone: string, password: string } = {
    phone: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "稍等哦..."
    });
    loader.present();
    this.user.login(this.account).map(resp => {
      loader.dismiss();
      return resp;
    }).subscribe((resp) => {
      this.toastCtrl.create({
        message: resp.error.message,
        duration: 800
      }).present();
      if (resp.error.code == 0) {
        this.navCtrl.setRoot(MainPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }
    }, () => {
      this.toastCtrl.create({
        message: "服务器出错啦，请稍后再试",
        duration: 800
      }).present();
    });
  }
}
