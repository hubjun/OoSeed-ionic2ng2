/**
 * Created by allenou on 2017/3/22.
 */
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeService } from '../../../me.service';
import { ToolsService } from '../../../../../providers/ToolsService';
import { HomepageFanslistPage } from '../../../../personal-homepage/homepage-fans/hoempage-fanslist/homepage-fanslist';



@Component({
    selector: 'fans-channel',
    template: `
        <div class="module" [style.background-color]="follow.length===0?'#f0f0f0':'#fff'">
          <h3 class="module-title" *ngIf="follow.total<=8" >球队关注<em>({{follow.total}})</em></h3>
           <h3 class="module-title right-arrow-icon" *ngIf="follow.total>8" (click)="goToMemberList(true)">球队关注<em>({{fans.total}})</em><span>更多</span></h3>
          <member [members]="follow"></member>
    </div>
    <div class="module bottom-gap" [style.background-color]="follow.length===0?'#f0f0f0':'#fff'">
      <h3 class="module-title" *ngIf="fans.total<=8">球队粉丝<em>({{fans.total}})</em></h3>
       <h3 class="module-title right-arrow-icon" *ngIf="fans.total>8" (click)="goToMemberList(false)">球队粉丝<em>({{fans.total}})</em><span>更多</span></h3>
        <member [members]="fans"></member>
    </div>
    `
})
export class FansComponent {
    @Input() basicInfo;//球队基本信息
    follow: Array<any> = [];
    fans: Array<any> = [];
    constructor(
        public navCtrl: NavController,
        private meService: MeService,
        private tools: ToolsService
    ) {

    }
    ngOnInit() {
        this.getTeamFollow();
        this.getTeamFans();
        // console.log(this.basicInfo)
    }
    //获取球队关注列表
    getTeamFollow() {
        this.tools.showLoading();
        this.meService.getFollow({ userId: this.basicInfo.orgUser, rows: 8 }).subscribe((res) => {
            if (res.result === '0') {
                let follow = res.data
                Object.assign(follow, {
                    "type": "follow"
                })
                this.follow = follow;
                this.tools.hideLoading();
            }
        })
    }
    //获取球队粉丝列表
    getTeamFans() {
        this.meService.getFans({ userId: this.basicInfo.orgUser, rows: 8 }).subscribe((res) => {
            if (res.result === '0') {
                let fans = res.data
                Object.assign(fans, {
                    "type": "fans"
                })
                this.fans = fans;
            }
        })
    }
    //粉丝/关注
    goToMemberList(states: boolean) {
        this.navCtrl.push(HomepageFanslistPage, {
            userId: this.basicInfo.orgUser,
            states: states
        });
    }

}
