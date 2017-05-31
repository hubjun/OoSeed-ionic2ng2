/**
 * Created by baoww on 2017/4/6.
 */

import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { LocalPage } from "./local";
import { LocalFilterComponent } from "./components/local-filter/local-filter.component";

// import {SpellBallPage} from "./spell-ball/spell-ball";
import { CommonModule } from '../../providers/CommonModule.module';
import { LocalNavComponent } from './components/local-nav/local-nav.component';
import { BookingMatchPage } from "./booking-competition/booking-match";
import { LocalService } from "./local.service";
import { LocalPersonIp } from "./local-personip/local-personip";
import { LocalTeamIp } from "./local-teamip/local-teamip";
import { localDetailInner } from "./spell-ball/spell-ball-detail";
import { LocateCityPage } from "./locate-city/locate-city";
import { RecruitListPage } from "./recruitment/recruit-list";
import { RecruitDetailPage } from "./recruitment/recruit-detail";
import { LocalDefaultContentComponent } from './components/local-default-content/local-default-content.component';
import { BookingMatchDatailPage } from './booking-competition/booking-match-detail';
import { ViewMoreTipComponent } from './components/view-more-tip/view-more-tip.component';


@NgModule({
    imports: [
        IonicModule.forRoot(MyApp),
        CommonModule
    ],
    declarations: [
        LocalPage,
        BookingMatchPage,
        LocalFilterComponent,
        LocalNavComponent,
        // SpellBallPage,
        LocalPersonIp,
        LocalTeamIp,
        localDetailInner,
        LocateCityPage,
        RecruitListPage,
        RecruitDetailPage,
        LocalDefaultContentComponent,
        BookingMatchDatailPage,
        ViewMoreTipComponent
    ],
    entryComponents: [
        LocalPage,
        LocalFilterComponent,
        LocalNavComponent,
        // SpellBallPage,
        LocalPersonIp,
        LocalTeamIp,
        localDetailInner,
        LocateCityPage,
        localDetailInner,
        RecruitListPage,
        RecruitDetailPage,
        LocalDefaultContentComponent,
        BookingMatchDatailPage,
        ViewMoreTipComponent

    ],
    providers: [LocalService],
    exports: [IonicModule]
})

export class LocalModule {

}



