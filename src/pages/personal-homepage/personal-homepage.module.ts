/**
 * Created by dell on 2017/3/30.
 * @description
 * 此模块是个人主页所有需要在app.module.ts里注册的module
 * 如有新的module则在下面一次添加
 */
import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {CommonModule} from "../../providers/CommonModule.module";
import {PersonalHomepagePage} from "./personal-homepage";
import {HomepageSharePage} from "./homepage-share/homepage-share";
import {HomepageServicePage} from "./homepage-service/homepage-service";
import {HomepageFansPage} from "./homepage-fans/homepage-fans";
import {HomepageGroupsPage} from "./homepage-groups/homepage-groups";
import {HomepageFeedPage} from "./homepage-share/homepage-feed/homepage-feed";
import {HomepageGalleryPage} from "./homepage-share/homepage-gallery/homepage-gallery";
import {HomepageVideoPage} from "./homepage-share/homepage-video/homepage-video";
import {HomepageVideoPlayPage} from "./homepage-share/homepage-video/homepage-videoplay";
import {HomepageFanslistPage} from "./homepage-fans/hoempage-fanslist/homepage-fanslist";
import {HomepageInfoPage} from "./homepage-share/homepage-info/homepage-info";
@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  declarations: [
    PersonalHomepagePage,
    HomepageSharePage,
    HomepageGroupsPage,
    HomepageFansPage,
    HomepageServicePage,
    HomepageFeedPage,
    HomepageGalleryPage,
    HomepageVideoPage,
    HomepageVideoPlayPage,
    HomepageFanslistPage,
    HomepageInfoPage
  ],
  entryComponents: [
    PersonalHomepagePage,
    HomepageSharePage,
    HomepageGroupsPage,
    HomepageFansPage,
    HomepageServicePage,
    HomepageFeedPage,
    HomepageGalleryPage,
    HomepageVideoPage,
    HomepageVideoPlayPage,
    HomepageFanslistPage,
    HomepageInfoPage
  ],
  providers: [],
  exports: [IonicModule]
})

export class PersonalHomepageModule {

}

