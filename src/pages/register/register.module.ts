/**
 * Created by chenwenhao on 2017/2/25.
 * @description
 * 此模块是注册/设置密码/设置昵称页面共用module
 */

import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {RegisterPage} from "./register";
import {SetPasswordPage} from "./set-password/set-password";
import {SetNickNamePage} from "./set-nickname/set-nickname";
import {CommonModule} from "../../providers/CommonModule.module";

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  declarations: [
    RegisterPage,
    SetPasswordPage,
    SetNickNamePage,
  ],
  entryComponents: [
    RegisterPage,
    SetPasswordPage,
    SetNickNamePage
  ],
  providers: [],
  exports: [IonicModule]
})

export class RegisterModule {

}
