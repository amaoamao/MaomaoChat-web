import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SignUpPage} from "../sign-up/sign-up";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignUpPage);
  }
}
