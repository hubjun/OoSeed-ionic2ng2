/**
 * Created by allenou on 2017/3/20.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamPlayerDetailPage } from './team-player-detail';
import { MeService } from '../../../me.service';
import { TeamService } from '../../team.service';
import { ToolsService } from '../../../../../providers/ToolsService';

@Component({
    selector: 'page-team-player',
    template: `
        <ion-header id="sportIp-header" class="sub-header">
          <ion-navbar>
            <ion-title>阵容</ion-title>
          </ion-navbar>
        </ion-header>

<ion-content class="gray-background">
  <ul class="top-gap">
    <li [class.bottom-gap]="player.roleTag=='CREATOR'" *ngFor="let player of players" (click)="goTeamPlayerDetail(player)">
      <div class="avatar" [class.avatar-default]="!player.userIconUrl" [style.background]=" 'url('+ player.userIconUrl+') no-repeat center center/cover ' | safeStyle " ></div>
      <div class="basic-info border-bottom">
        <p class="name"><em>{{player.userName}}</em> <i class="captain" *ngIf="player.roleTag=='CREATOR'">球队创始人</i><i class="member" *ngIf="player.roleTag=='TEAM_MEMBER'">普通球员</i></p>
        <p>惯用{{player.leftOrRightName}}<span *ngIf="player.firstPositionName">/{{player.firstPositionName}}</span> <span *ngIf="player.secondPositionName"> /{{player.secondPositionName}}</span></p>
        <i class="number" *ngIf="player.playerNumberName">{{player.playerNumberName}}</i>
      </div>
    </li>
  </ul>
</ion-content>
    `
})
export class TeamPlayerPage {
    players: Array<string> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private teamService: TeamService,
        private toolsService: ToolsService

    ) { }
    ngOnInit() {
        this.getTeamPlayer();
    }
    //获取球队球员
    getTeamPlayer() {
        let params: any = {
            id: this.navParams.get('id')
        }
        this.toolsService.showLoading();
        this.teamService.getTeamPlayer(params).subscribe((res) => {
            // console.log(res.data.list)
            if (res.result === '0') {
                this.players = res.data.list;
                this.toolsService.hideLoading();
            }
        })
    }
    goTeamPlayerDetail(player: any) {
        this.navCtrl.push(TeamPlayerDetailPage, {
            teamId: player.teamId,
            playerId: player.userId
        })
    }
}

