/**
 * Created by chenwenhao on 2017/2/25.
 * @description
 * 此模块是登陆/重置密码/找回密码页面共用module
 */
import {NgModule} from "@angular/core";
import {IonicModule,} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {LoginPage} from "./login";
import {FindPasswordPage} from "./find-password/find-password";
import {ResetPasswordPage} from "./reset-password/reset-password";
import {CommonModule} from "../../providers/CommonModule.module";
import { UserActivityService } from '../../providers/UserActivityService';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  declarations: [
    LoginPage,
    FindPasswordPage,
    ResetPasswordPage,
  ],
  entryComponents: [
    LoginPage,
    FindPasswordPage,
    ResetPasswordPage,
  ],
  providers: [UserActivityService],
  exports: [IonicModule]
})

export class LoginModule {

}
