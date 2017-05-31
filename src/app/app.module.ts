import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, Events} from 'ionic-angular';

import { MyApp } from './app.component';
import { VideosPage } from '../pages/videos/videos';
import { VideoDetailPage } from '../pages/video-detail/video-detail';
import { VideoMorePage } from '../pages/video-more/video-more';
import { MePage } from '../pages/me/me';
//页面加上面
//服务要加这里
import { ToolsService } from '../providers/ToolsService';
import { ValidationService } from '../providers/ValidatorService';
import { HttpService } from "../providers/HttpService";
import { StorageService } from "../providers/StorageService";

//装饰器要加在这里
import { StatesService } from "../providers/StatesService";
import { HomeModule } from "../pages/home/home.module";
import { ReleaseModule } from "../pages/release/release.module";
import { LocalModule } from "../pages/local/local.module";
import { LoginModule } from "../pages/login/login.module";
import { RegisterModule } from "../pages/register/register.module";
import { ProtocolModule } from "../pages/protocol/protocol.module";
import { MeModule } from '../pages/me/me.module';

import { UserDataService } from "../providers/UserDataSevice";
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { HttpIntercept } from "../providers/HttpIntercept";
import { HttpInterceptHandle } from "../providers/HttpInterceptHandle";

//DeepLinker要加在这里
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ArticleDetailsPage } from '../pages/home/home-info/ArticleDetail.component';
import { FeedArticleComponent } from '../pages/home/home-feed/FeedArticle.component';
import { PublishingProtocolPage } from "../pages/protocol/publishing-protocol/publishing-protocol";
import { AuthenticationProtocolPage } from "../pages/protocol/authentication-protocol/authentication-protocol";
import { RegistrationProtocolPage } from "../pages/protocol/registration-protocol/registration-protocol";
import { VideoUploadProtocolPage } from "../pages/protocol/video-upload-protocol/video-upload-protocol";
import { LiveCoverProtocolPage } from "../pages/protocol/live-cover-protocol/live-cover-protocol";
import { AuthenticationIntroProtocolPage } from "../pages/protocol/authentication-intro-protocol/authentication-intro-protocol";
import { FeedbackSevice } from "../providers/FeedbackSevice";
import { LocalPage } from "../pages/local/local";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { StatusCodeService } from '../providers/StatusCodeService';
import {PersonalHomepageModule} from "../pages/personal-homepage/personal-homepage.module";
//import {PersonalHomepagePage} from "../pages/personal-homepage/personal-homepage";
import { CommonModule } from '../providers/CommonModule.module';
import { MatchComponent } from '../pages/me/my-team/team-homepage/components/match.component';
import { TeamDetailPage } from '../pages/me/my-team/team-homepage/team-detail';//球队详情

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, httpInterceptHandle: HttpInterceptHandle, userData: UserDataService,events:Events) {
  return new HttpIntercept(backend, defaultOptions, httpInterceptHandle, userData,events)
}

//noinspection TypeScriptUnresolvedFunction
@NgModule({
  declarations: [
    MyApp,
    VideosPage,
    VideoDetailPage,
    VideoMorePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'ios',
      iconMode: 'ios',
      tabsHideOnSubPages: true,
    },
      {
       /* links: [
          {component: TabsPage, name: 'Tabs', segment: 'tabs'},
          { component: HomePage, name: 'Home', segment: 'home' },
          { component: VideosPage, name: 'Video', segment: 'video' },
          { component: LocalPage, name: 'local', segment: 'local' },
          { component: MePage, name: 'me', segment: 'me' },
          { component: RegisterPage, name: 'register', segment: 'register' },
          { component: LoginPage, name: 'login', segment: 'login' },
          {
            component: ArticleDetailsPage,
            name: 'ArticleDetail',
            segment: 'info/article/:articleId/isApp/:isApp/isShare/:isShare',
          },
          { component: FeedArticleComponent, name: 'FeedArticle', segment: 'feed/article/:feedId' },

          { component: PublishingProtocolPage, name: 'publishing', segment: 'protocol/publishing/isApp/:isApp' },
          {
            component: AuthenticationProtocolPage,
            name: 'authentication',
            segment: 'protocol/authentication/isApp/:isApp'
          },
          { component: RegistrationProtocolPage, name: 'registration', segment: 'protocol/registration/isApp/:isApp' },
          { component: VideoUploadProtocolPage, name: 'video-upload', segment: 'protocol/video-upload/isApp/:isApp' },
          {
            component: LiveCoverProtocolPage,
            name: 'live-cover-upload',
            segment: 'protocol/live-cover-upload/isApp/:isApp'
          },
          {
            component: AuthenticationIntroProtocolPage,
            name: 'authentication-intro',
            segment: 'protocol/authentication-intro/isApp/:isApp'
          },
        ]*/
      }),
    HomeModule,
    ReleaseModule,
    LocalModule,
    LoginModule,
    RegisterModule,
    ProtocolModule,
    MeModule,
    PersonalHomepageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideosPage,
    VideoDetailPage,
    VideoMorePage,
    TabsPage
  ],
  providers: [HttpInterceptHandle, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, HttpInterceptHandle, UserDataService]
    },
    ToolsService,
    ValidationService,
    HttpService,
    StorageService,
    StatesService,
    UserDataService,
    FeedbackSevice,
    StatusCodeService
  ]
})
export class AppModule {

}
