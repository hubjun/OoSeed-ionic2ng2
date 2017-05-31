/**
 * Created by allenou on 2017/3/23.
 */
import { Component, Input, ViewChild, ViewChildren } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeService } from '../../../me.service';
import { MatchComponent } from '../components/match.component';
import { ToolsService } from '../../../../../providers/ToolsService';
import { TeamService } from '../../team.service';

@Component({
    selector: 'page-match-record',
    template: `
     <ion-header id="sportIp-header" class="sub-header">
          <ion-navbar>
            <ion-title>历史赛程</ion-title>
          </ion-navbar>
        </ion-header>
    <ion-content>
        <div class="match-list top-gap bottom-gap">
         <match #allMatch></match>
         </div>
      </ion-content>
    `
})
export class MatchRecordPage {
    @ViewChild(MatchComponent) allMatch: MatchComponent;
    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        private toolsService: ToolsService,
        private teamService: TeamService,

    ) { }
    ngOnInit() {
        this.getTeamMatch();
    }
    //获取所有球队赛程
    getTeamMatch() {
        let status;
        let type: string = this.params.get("type");
        if (type == 'new') {
            status = '0, 1, 2, 3, 4';
        }
        else {
            status = -1;
        }
        let params = {
            teamId: this.params.get('id'),
            status: status
        }
        this.toolsService.showLoading();
        this.teamService.getTeamMatch(params).subscribe((res) => {
            if (res.result === '0') {
                let matchs: Array<any> = res.data.list;
                let date: Date;
                for (let match of matchs) {
                    date = new Date(match.matchTime);
                    match = Object.assign(match, {
                        "day": date.getDay(),  //比赛当天是周几
                        "date": `${date.getMonth() + 1}-${date.getDate()}`//比赛当天是日期
                    })
                }
                this.allMatch.setMatch(matchs);
                this.toolsService.hideLoading();
            }
        })
    }
}
