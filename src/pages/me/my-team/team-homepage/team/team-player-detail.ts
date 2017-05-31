/**
 * Created by allenou on 2017/3/20.
 */
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MeService } from '../../../me.service';
import { TeamService } from '../../team.service';




@Component({
    selector: 'page-team-player-detail',
    template: `
        <ion-content class="gray-background">
            <ion-header id="sportIp-header" class="transparent-header">
                <ion-navbar>
                </ion-navbar>
          </ion-header>
  <div class="player-card">
    <div class="avatar" [class.avatar-default]="!player.userIconUrl" [style.background]=" 'url('+ player.userIconUrl+') no-repeat center center/cover ' | safeStyle "></div>
    <strong>{{player.userName}}</strong>
    <span *ngIf="player.leftOrRightName">惯用{{player.leftOrRightName}}</span>
    <!--<i *ngIf="user.authStatus===1">已实名认证</i>-->
    <i *ngIf="user.authStatus===0">未实名认证</i>
  </div>
  <ul class="team-grid-list list">
    <li>

     <span *ngIf="user.weight">{{user.weight}}</span>
     <span *ngIf="!user.weight">0</span>
       <em>体重(kg)</em>
    </li>
    <li>
         <span *ngIf="user.height">{{user.height}}</span>
       <span *ngIf="!user.height">0</span>
       <em>身高(cm)</em>
    </li>
    <li>
       <span *ngIf="user.userAge">{{user.userAge}}</span>
       <span *ngIf="!user.userAge">0</span>
       <em>年龄</em>
    </li>
    <li>
       <span *ngIf="player.firstPositionName" class="chinese-text">{{player.firstPositionName}}</span>
       <span *ngIf="!player.firstPositionName">无</span>
       <em>位置</em>
    </li>
    <li>
       <span *ngIf="player.playerNumberName" class="number-text">{{player.playerNumberName}}</span>
       <span *ngIf="!player.playerNumberName">无</span>
       <em>号码</em>
    </li>
  </ul>
</ion-content>
    `
})
export class TeamPlayerDetailPage {
    player: string[] = [];
    user: string[] = [];
    constructor(
        public navParams: NavParams,
        private teamService: TeamService
    ) {

    }
    ngOnInit() {
        this.getTeamPlayerDetail();
        this.getUserInfo();
    }

    //获取球队球员在球队信息
    getTeamPlayerDetail() {
        let params: any = {
            teamId: this.navParams.get('teamId'),
            playerId: this.navParams.get('playerId')
        }
        this.teamService.getTeamPlayerDetail(params).subscribe((res) => {

            if (res.result === '0') {
                this.player = res.data;
            }
        })
    }
    //获取球队球员个人信息
    getUserInfo() {
        let param: any = {
            userId: this.navParams.get('playerId')
        }
        this.teamService.getUserInfo(param).subscribe((res) => {
            if (res.result === '0') {
                this.user = res.data;
            }
        })
    }
}
