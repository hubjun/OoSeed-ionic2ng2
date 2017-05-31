/**
 * Created by allenou on 2017/4/11.
 */
import { Component } from '@angular/core';
import { MeService } from '../me.service';


@Component({
    selector: 'page-my-schedule',
    templateUrl: 'my-schedule.html'
})
export class MySchedulePage {
    private newestSchedule: Array<any> = [];
    private latestSchedule: Array<any> = [];
    constructor(
        private meService: MeService
    ) { }
    ngOnInit() {
        this.getUserLatestSchedule();
        this.getUserNewestSchedule();
    }
    //获取用户今日日程
    getUserNewestSchedule() {
        let date = new Date();
        let Y, D, M;
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate();
        let param = Y + M + D;
        let params: any = {
            eventDate: param
        }
        this.meService.getUserNewestSchedule(params).subscribe((res) => {
            if (res.result === '0') {
                this.newestSchedule = res.data;
            }
        })
    }
    //获取用户最近日程
    getUserLatestSchedule() {
        this.meService.getUserLatestSchedule().subscribe((res) => {
            if (res.result === '0') {
                this.latestSchedule = res.data;
            }
        })
    }
}
