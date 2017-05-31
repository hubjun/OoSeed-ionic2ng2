/**
 * Created by allenou on 2017/4/5.
 */
import { Component, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalService } from '../local.service';
import { Subscription } from "rxjs";
import { ToolsService } from '../../../providers/ToolsService';
import { BookingMatchDatailPage } from './booking-match-detail';
import { TeamDetailPage } from '../../me/my-team/team-homepage/team-detail';

@Component({
    selector: 'booking-match-channel',
    templateUrl: 'booking-match.html'
})
export class BookingMatchPage {
    private matchs: Array<any> = [];
    private sportTypeId: number;
    private subscription: Subscription = new Subscription();
    private haveMore: boolean = false;
    private haveData: boolean = true;
    // @Output() onHaveMore = new EventEmitter<any>();
    private params = {
        sporyType: null,
        rangType: 1,
        areaId: null,
        sortType: 1,
        longitude: this.localService.coor.long,
        latitude: this.localService.coor.lat,
        pages: 1,
        rows: 10
    }

    public filterTypes = {

        sortType: [{
            id: 1,
            title: "默认"
        }, {
            id: 2,
            title: "费用类型"
        }, {
            id: 3,
            title: "开始时间"
        }, {
            id: 4,
            title: "最新发布"
        }]
    }

    constructor(
        public navCtrl: NavController,
        private localService: LocalService,
        private toolsService: ToolsService
    ) {
        //按排序规则排序
        this.subscription.add(
            this.localService.filterResults.subscribe((filterResults: any) => {
                let params: any = this.params;
                if (filterResults.sportType === 1) {
                    //全部球类
                    params.sporyType = null;
                }
                else {
                    params.sporyType = filterResults.sportType;
                }

                if (filterResults.rangType === 2) {
                    //附近
                    params.areaId = null;
                }
                else {
                    params.areaId = filterResults.areaId
                }

                params.rangType = filterResults.rangType;
                params.sortType = filterResults.sortType;

                this.getBookingCompetition(params);
            })
        )
    }
    ngOnInit() {
        this.localService.filterTypes.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则
        let params = this.params;
        let cacheFilterResult = this.localService.cacheOtherChannelFilterResult;
        if (cacheFilterResult !== undefined) {
            if (cacheFilterResult.sportType === 1) {
                //全部球类
                params.sporyType = null;
            }
            else {
                params.sporyType = cacheFilterResult.sportType;
            }
            params.areaId = cacheFilterResult.areaId;
            params.rangType = cacheFilterResult.rangType;
            this.getBookingCompetition(params);
        }
        else {
            params.areaId = this.localService.parentId;
            this.getBookingCompetition(params);
        }
    }

    ngOnDestroy() {
        //取消订阅
        this.subscription.unsubscribe();
    }
    //查询同城约战列表
    getBookingCompetition(params: any) {
        this.toolsService.showLoading();
        this.localService.getBookingCompetition(params).subscribe(res => {
            this.toolsService.hideLoading();
            if (res.result === '0') {
                let matchs = res.data.list;
                let haveMore = res.data.hasNextPage;
                matchs.length > 0 ? this.haveData = true : this.haveData = false;
                haveMore ? this.haveMore = true : this.haveMore = false;
                this.matchs = matchs;
            }
        })
    }
    goToMatchDetail(matchId: number) {
        this.navCtrl.push(BookingMatchDatailPage, {
            "matchId": matchId
        });
    }
    goToTeamHomePage(teamId: number) {
        this.navCtrl.push(TeamDetailPage, {
            "id": teamId
        });
    }
}
