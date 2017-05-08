import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {User} from "../../providers/user";

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
              public toastCtrl: ToastController) {
  }

  doLogin() {
    this.user.login(this.account).map(res => res.json()).subscribe((resp) => {
      this.toastCtrl.create({
        message: resp.error.message,
        duration: 3000
      }).present();
      if (resp.error.code == 0) {
        //TODO:navigate to main page
      }
      console.log(resp);
    }, () => {
      this.toastCtrl.create({
        message: "服务器出错啦，请稍后再试",
        duration: 3000
      }).present();
    });
  }
}
