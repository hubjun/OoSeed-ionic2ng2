/**
 * Created by chenwenhao on 2017/2/20.
 * @description
 * 此模块是home页面所有需要在app.moudule.ts里注册的module
 * 如有新的module则在下面依次添加
 *
 */

import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {HomePage} from "./home";
import {ArticleDetailsPage} from "./home-info/ArticleDetail.component";
import {ArticleRecommendDetailsPage} from "./home-info/ArticleRecommendDetail.component";
import {ArticleCommentsPage} from "./home-info/ArticleComments.component";
import {GallerySlidersComponent} from "../../components/GallerySliders.component";
import {CommentComponent} from "../../components/Comment.component";
import {InfoCateComponent} from "./home-info/InfoCate.component";
import {FeedArticleComponent} from "./home-feed/FeedArticle.component";
//component
import {ChannelComponent} from "./home-recommend/Channel.component";
import {CommonModule} from "../../providers/CommonModule.module";


@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  declarations: [
    HomePage,
    ArticleDetailsPage,
    ArticleRecommendDetailsPage,
    ArticleCommentsPage,
    CommentComponent,
    InfoCateComponent,
    GallerySlidersComponent,
    FeedArticleComponent,
    ChannelComponent
  ],
  entryComponents: [
    HomePage,
    ArticleDetailsPage,
    ArticleRecommendDetailsPage,
    ArticleCommentsPage,
    CommentComponent,
    InfoCateComponent,
    GallerySlidersComponent,
    FeedArticleComponent,
    ChannelComponent
  ],
  providers: [],
  exports: [IonicModule]
})

export class HomeModule {

}
