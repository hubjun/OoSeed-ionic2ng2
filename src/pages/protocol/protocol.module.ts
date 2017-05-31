/**
 * Created by chenwenhao on 2017/2/27.
 * @description
 * 此module是所有协议页面公共module
 * 如以后新添协议也在此页面注册注入
 */

import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {PublishingProtocolPage} from  './publishing-protocol/publishing-protocol';
import {AuthenticationProtocolPage} from "./authentication-protocol/authentication-protocol";
import {RegistrationProtocolPage} from "./registration-protocol/registration-protocol";
import {VideoUploadProtocolPage} from "./video-upload-protocol/video-upload-protocol";
import {LiveCoverProtocolPage} from "./live-cover-protocol/live-cover-protocol";
import {AuthenticationIntroProtocolPage} from "./authentication-intro-protocol/authentication-intro-protocol";

@NgModule({
  imports:[
    IonicModule.forRoot(MyApp)
  ],
  declarations:[
    PublishingProtocolPage,
    AuthenticationProtocolPage,
    RegistrationProtocolPage,
    VideoUploadProtocolPage,
    LiveCoverProtocolPage,
    AuthenticationIntroProtocolPage
  ],
  entryComponents:[
    PublishingProtocolPage,
    AuthenticationProtocolPage,
    RegistrationProtocolPage,
    VideoUploadProtocolPage,
    LiveCoverProtocolPage,
    AuthenticationIntroProtocolPage
  ],
  providers:[],
  exports:[IonicModule]
})

export class ProtocolModule{

}
