/**
 * Created by chenwenhao on 2017/3/13.
 * @description
 * 此module是整个程序需要声明的公共moudule
 */

import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../app/app.component";
import { ControlMessagesComponent } from "../components/ControlMessage.component";
import { RenderDirective } from "./CommonService.directive";
import {
  SafeStyle, TruncatePipe, ChineseDay, Expense, MatchFormat, TimestampToChineseDay,
  recruitWeek, Distance
} from './CommonService.pipes';
import { LazyLoadImageModule } from "ng2-lazyload-image";
import { MultiPickerModule } from "ion-multi-picker";
import { MomentModule } from "angular2-moment";
import { ScrollHorizontal } from "../components/ScrollHorizontal.component";
import { SpellBallPage } from "../pages/local/spell-ball/spell-ball";
import { FeedCardComponent } from "../pages/home/home-feed/FeedCard.component";
import {GalleryViewerModal} from "../components/GallerViewer.component";
import {ZoomabImage} from "../components/ZoomableImage.component";
import {ArticleCardComponent} from "../pages/home/home-info/ArticleCard.component";
@NgModule({
  imports:[
    IonicModule.forRoot(MyApp),
    LazyLoadImageModule,
    MultiPickerModule,
    MomentModule
  ],
  declarations:[
    ControlMessagesComponent,
    RenderDirective,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    Expense,
    MatchFormat,
    ScrollHorizontal,
    SpellBallPage,
    TimestampToChineseDay,
    recruitWeek,
    FeedCardComponent,
    GalleryViewerModal,
    ZoomabImage,
    ArticleCardComponent,
    Distance
  ],
  entryComponents: [
    GalleryViewerModal,
  ],
  providers:[],
  exports:[
    ControlMessagesComponent,
    RenderDirective,
    SafeStyle,
    TruncatePipe,
    LazyLoadImageModule,
    MultiPickerModule,
    MomentModule,
    ChineseDay,
    FeedCardComponent,
    GalleryViewerModal,
    ZoomabImage,
    ChineseDay,
    Expense,
    MatchFormat,
    ScrollHorizontal,
    SpellBallPage,
    TimestampToChineseDay,
    recruitWeek,
    ArticleCardComponent,
    Distance
  ]
})

export class CommonModule{

}
