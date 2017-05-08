import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TutorialPage} from "../pages/tutorial/tutorial";
import {WelcomePage} from "../pages/welcome/welcome";
import {IonicStorageModule} from "@ionic/storage";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {HttpModule} from "@angular/http";
import {LoginPage} from "../pages/login/login";
import {Api} from "../providers/api";
import {User} from "../providers/user";


let pages = [
  MyApp,
  TutorialPage,
  WelcomePage,
  SignUpPage,
  LoginPage
];




@NgModule({
  declarations: pages,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    StatusBar,
    SplashScreen,
    User,
    Api,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
