/**
 * Created by allenou on 2017/4/6.
 */
import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";

//service
import { TeamService } from './team.service';

//module
import {CommonModule} from "../../../providers/CommonModule.module";

//page
import {MyTeamPage} from "./my-team";
import {TeamDetailPage} from "./team-homepage/team-detail";
import {MatchRecordPage} from "./team-homepage/schedule/match-record";
import {TeamPlayerPage} from "./team-homepage/team/team-player";
import {TeamPlayerDetailPage} from "./team-homepage/team/team-player-detail";


//component
import {MyApp} from "../../../app/app.component";
import {MatchComponent} from "./team-homepage/components/match.component";
import {MatchResultComponent} from "./team-homepage/components/match-result.component";
import {CircularProgressBarComponent} from "./team-homepage/components/circular-progress-bar.component";
import {MemberComponent} from "./team-homepage/components/member.component";
import {ServiceComponent} from "./team-homepage/service/service.component";
import {TeamScheduleComponent} from "./team-homepage/schedule/schedule.component";
import {TeamComponent} from "./team-homepage/team/team.component";
import {FansComponent} from "./team-homepage/fans/fans.component";
import { MySchedulePage } from '../my-schedule/my-schedule';
import { ScheduleComponent } from '../my-schedule/components/schedule.component';
import { MatchDatailPage } from './team-homepage/schedule/match-detail';




@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  declarations: [
    MatchComponent,
    MatchResultComponent,
    CircularProgressBarComponent,
    MemberComponent,
    ServiceComponent,
    TeamScheduleComponent,
    TeamComponent,
    FansComponent,
    MyTeamPage,
    TeamDetailPage,
    MyTeamPage,
    MatchRecordPage,
    TeamPlayerPage,
    TeamPlayerDetailPage,
    MatchDatailPage,
    MySchedulePage,
    ScheduleComponent
  ],
  entryComponents: [
    MyTeamPage,
    TeamDetailPage,
    MyTeamPage,
    MatchRecordPage,
    TeamPlayerPage,
    TeamPlayerDetailPage,
    MatchDatailPage,
    MySchedulePage,
    ScheduleComponent

  ],
  providers: [TeamService],
  exports: [IonicModule]
})

export class TeamModule {

}
