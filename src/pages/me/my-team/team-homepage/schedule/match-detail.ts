/**
 * Created by allenou on 2017/4/5.
 */
import { Component } from '@angular/core';
import { MeService } from '../../../me.service';
import { NavParams } from 'ionic-angular';
import { StorageService } from '../../../../../providers/StorageService';
import { TeamService } from '../../team.service';
import { ToolsService } from '../../../../../providers/ToolsService';
// import 'intl';
// import 'intl/locale-data/jsonp/en';
@Component({
    selector: 'page-match-detail',
    templateUrl: 'match-detail.html'
})

export class MatchDatailPage {
    private match: string[] = [];
    private clothers: any;
    constructor(
        public navParams: NavParams,
        private teamService: TeamService,
        private storageService: StorageService,
        private toolsService: ToolsService
    ) { }
    ngOnInit() {
        this.getClotherColor();
        // this.getMatchStatus();
        // this.getMatchDetail();
        // this.getMatchExpersiveType();
        // this.getMatchFormats();
        // let clotherColor: Array<any> = this.storageService.getItem('clother_color');
        // if (!clotherColor) {
        //     this.getClotherColor();
        // }
        // else {
        //     this.getMatchDetail();
        // }
    }
    //获取比赛详情
    getMatchDetail() {
        let params = {
            matchId: this.navParams.get('id')
        }
        this.toolsService.showLoading();
        this.teamService.getMatchDetail(params).subscribe((res) => {
            if (res.result === '0') {
                this.match = res.data;
            }
            // let match: any = res.data;
            // let clothers: any = this.storageService.getItem('clother_color');
            // for (let clother of clothers) {
            //     if (clother.id == match.clother) {
            //         Object.assign(match, {
            //             "clotherName": clother.title,
            //             "clotherIconUrl": clother.iconUrl
            //         })
            //     }
            // }
            // this.match = match;
            this.toolsService.hideLoading();
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
    //获取比赛费用类型
    getMatchExpersiveType() {
        let expenseType: Array<any> = this.storageService.getItem('expense_type');
        if (!expenseType) {
            let params = {
                lang: 'zh_cn',
                sportType: 3001
            }
            this.teamService.getExpenseType(params).subscribe((res) => {
                if (res.result === '0') {
                    let result: Array<string> = res.data.dicts;
                    this.storageService.setItem('expense_type', result);
                }
            })
        }
    }
    //获取比赛赛制
    getMatchFormats() {
        let matchFormats: Array<any> = this.storageService.getItem('match_format');
        if (!matchFormats) {
            let params = {
                lang: 'zh_cn',
                sportType: 3001
            }
            this.teamService.getMatchFormat(params).subscribe((res) => {
                if (res.result === '0') {
                    let result: Array<string> = res.data.dicts;
                    this.storageService.setItem('match_format', result);
                }
            })
        }
    }
}
