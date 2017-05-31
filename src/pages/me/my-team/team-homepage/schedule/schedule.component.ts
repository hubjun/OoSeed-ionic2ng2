/**
 * Created by allenou on 2017/3/22.
 */
import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeService } from '../../../me.service';
import { MatchRecordPage } from './match-record';
import { ToolsService } from '../../../../../providers/ToolsService';
import { MatchResultComponent } from '../components/match-result.component';
import { MatchComponent } from '../components/match.component';
import { TeamService } from '../../team.service';

@Component({
    selector: 'schedule-channel',
    templateUrl: 'schedule.component.html'
})
export class TeamScheduleComponent {
    @ViewChild('newMatch') newMatch: MatchComponent;
    @ViewChild('oldMatch') oldMatch: MatchComponent;
    @ViewChild(MatchResultComponent) matchResultCompoent: MatchResultComponent;
    @Input() basicInfo;//球队基本信息
    oldMatchRecord: Array<string> = [];//球队历史赛程
    newMatchRecord: Array<string> = [];//球队新赛程
    oldMatchTotal: number;
    newMatchTotal: number;
    currentYear: number;
    constructor(
        public navCtrl: NavController,
        private teamService: TeamService,
        private toolsService: ToolsService
    ) { }
    ngOnInit() {
        this.getTeamMatchResult();
        this.getNewMatchRecord();
        this.getOldMatchRecord();
        this.currentYear = new Date().getFullYear();
    }
    //获取球队新赛程
    getNewMatchRecord() {
        this.toolsService.showLoading();
        let params = {
            teamId: this.basicInfo.id,
            status: '0, 1, 2, 3, 4',
            rows: 2
        }
        this.teamService.getTeamMatch(params).subscribe((res) => {
            if (res.result === '0') {
                let matchs: Array<any> = res.data.list;
                this.newMatchTotal = res.data.total;
                let date: Date;
                for (let match of matchs) {
                    date = new Date(match.matchTime);
                    match = Object.assign(match, {
                        "day": date.getDay(),  //比赛当天是周几
                        "date": `${date.getMonth() + 1}-${date.getDate()}`//比赛当天是日期
                    })
                }
                this.newMatch.setMatch(matchs);
                this.toolsService.hideLoading();
            }
        })
    }
    //获取球队历史赛程
    getOldMatchRecord() {
        this.toolsService.showLoading();
        let params = {
            teamId: this.basicInfo.id,
            status: -1,
            rows: 2
        }
        this.teamService.getTeamMatch(params).subscribe((res) => {
            if (res.result === '0') {
                let matchs: Array<any> = res.data.list;
                this.oldMatchTotal = res.data.total;
                let date: Date;
                for (let match of matchs) {
                    date = new Date(match.matchTime);
                    match = Object.assign(match, {
                        "day": date.getDay(),  //比赛当天是周几
                        "date": `${date.getMonth() + 1}-${date.getDate()}`//比赛当天是日期
                    })
                }
                this.oldMatch.setMatch(matchs);
                this.toolsService.hideLoading();
            }
        })
    }
    //获取球队战绩
    getTeamMatchResult() {
        let params = {
            teamId: this.basicInfo.id,
            mode: 1
        }
        this.teamService.getTeamMatchResult(params).subscribe((res) => {
            if (res.result === '0') {
                this.matchResultCompoent.setPercent(res.data);
            }
        })
    }
    //前往历史赛程列表
    goMatchRecord(type: string) {
        this.navCtrl.push(MatchRecordPage, {
            "id": this.basicInfo.id,
            "type": type
        });
    }
}
