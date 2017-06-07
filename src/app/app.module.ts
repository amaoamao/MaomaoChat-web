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
import {MainPage} from "../pages/main/main";
import {ChatPage} from "../pages/chat/chat";
import {RecentChatPage} from "../pages/recent-chat/recent-chat";
import {ContactsPage} from "../pages/contacts/contacts";
import {Dialogs} from "../providers/dialogs";
import {ChatController} from "../providers/chat-controller";


let pages: any = [
  MyApp,
  TutorialPage,
  WelcomePage,
  SignUpPage,
  LoginPage,
  MainPage,
  ChatPage,
  RecentChatPage,
  ContactsPage
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
    Dialogs,
    ChatController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
