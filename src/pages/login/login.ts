import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {User} from "../../providers/user";
import {MainPage} from "../main/main";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { phone: string, password: string } = {
    phone: '17700000000',
    password: '0000'
  };

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController) {
  }

  doLogin() {
    this.user.login(this.account).map(res => res.json()).subscribe((resp) => {
      this.toastCtrl.create({
        message: resp.error.message,
        duration: 3000
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
        duration: 3000
      }).present();
    });
  }
}
