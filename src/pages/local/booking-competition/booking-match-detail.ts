/**
 * Created by allenou on 2017/4/5.
 */
import { Component } from '@angular/core';
import { MeService } from '../../../me.service';
import { NavParams } from 'ionic-angular';
import { ToolsService } from '../../../providers/ToolsService';
import { StorageService } from '../../../providers/StorageService';
import { TeamService } from '../../me/my-team/team.service';
import { LocalService } from '../local.service';

@Component({
    selector: 'page-booking-match-detail',
    templateUrl: 'booking-match-detail.html'
})

export class BookingMatchDatailPage {
    private match: string[] = [];
    private clothers: Array<string> = [];
    constructor(
        public navParams: NavParams,
        private teamService: TeamService,
        private localService: LocalService,
        private storageService: StorageService,
        private toolsService: ToolsService
    ) { }
    ngOnInit() {
        this.getMatchDetail();
    }
    //获取约战详情
    getMatchDetail() {
        let params = {
            engageId: this.navParams.get('matchId'),
            language: 'zh_cn'
        }
        this.toolsService.showLoading();
        this.localService.getBookingMatchDetail(params).subscribe((res) => {
            if (res.result === '0') {
                this.toolsService.hideLoading();
                let match = res.data;
                let moreClotherParam = match.homeTeamColorUrl;
                //没有主队球服
                if (!moreClotherParam) {
                    this.match = match;
                    return;
                }
                //有主队球服
                let moreCloter = moreClotherParam.indexOf(',');

                if (moreCloter !== -1) {  //有多件主队球服
                    let clotherIcons = match.homeTeamColorUrl.split(',');
                    let clotherTexts = match.homeTeamColorName.split(',');
                    let clothers = []
                    for (let i = 0; i < clotherIcons.length; i++) {
                        let icon = {
                            "url": clotherIcons[i],
                            "text": clotherTexts[i]
                        }
                        clothers.push(icon);
                    }
                    Object.assign(match, {
                        "clothers": clothers
                    })
                }
                this.match = match;
            }
        })
    }
    //获取球衣颜色
    getClotherColor() {
        let params = {
            lang: 'zh_cn'
        }
        this.teamService.getClotherColor(params).subscribe((res) => {
            if (res.result === '0') {
                this.getMatchDetail();
                this.clothers = res.data.dicts;
                this.storageService.setItem('clother_color', res.data.dicts);
            }
        })
    }
}