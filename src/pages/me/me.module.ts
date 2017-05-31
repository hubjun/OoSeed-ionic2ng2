import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
//service
import { MeService } from "./me.service";
import { UploadService } from '../../providers/UploadService';
//module
import { CommonModule } from "../../providers/CommonModule.module";
import { TeamModule } from './my-team/team.module';
import {mySpell} from "./my-spell/my-spell";
//page
import { MePage } from "./me";
import { EditInfoPage } from "./edit-info/edit-info";
import { SignaturePage } from "./edit-info/signature";
import { BallInfoPage } from "./edit-info/ball-info";
import { JobHistoryPage } from "./job-history";
import { BallLocation } from "./modal-tpl/ballLocation";
import { BallAbilityPage } from "./modal-tpl/ball-ability";
import { MyContentPage } from "./my-content";
import { MorePage } from "./more";
import { NoticePage } from "./notice/notice";
import { LikePage } from './notice/like';
import { AtMePage } from './notice/at-me';
import { NoticeListPage } from './notice/notice-list';
import { EditNamePage } from './edit-info/edit-name';
import { FeedbackPage } from './feedback/feedback';
import {mySpellBallPage} from './my-spell/my-spell-card/my-spell-cardPage';
import {mySpellDetail} from './my-spell/my-spell-card/my-spell-card-detailPage';
import { MySchedulePage } from './my-schedule/my-schedule';
// component
import { MyApp } from "../../app/app.component";
import { EditInfoComponent } from "../../components/EditInfo.component";
import { MatchComponent } from './my-team/team-homepage/components/match.component';
import { ScheduleComponent } from './my-schedule/components/schedule.component';


@NgModule({
    imports: [
        IonicModule.forRoot(MyApp),
        TeamModule,
        CommonModule
    ],
    declarations: [
        MePage,
        EditInfoPage,
        SignaturePage,
        BallInfoPage,
        JobHistoryPage,
        BallLocation,
        BallAbilityPage,
        MyContentPage,
        MorePage,
        NoticePage,
        NoticeListPage,
        LikePage,
        AtMePage,
        FeedbackPage,
        EditInfoComponent,
        EditNamePage,
        mySpell,
        mySpellBallPage,
        mySpellDetail
        // MatchComponent
    ],
    entryComponents: [
        MePage,
        EditInfoPage,
        SignaturePage,
        BallInfoPage,
        JobHistoryPage,
        BallLocation,
        BallAbilityPage,
        MyContentPage,
        MorePage,
        NoticePage,
        NoticeListPage,
        LikePage,
        AtMePage,
        FeedbackPage,
        EditNamePage,
        EditInfoComponent,
        mySpell,
        mySpellBallPage,
        mySpellDetail

    ],
    providers: [MeService, UploadService],
    exports: [IonicModule]
})

export class MeModule {

}
