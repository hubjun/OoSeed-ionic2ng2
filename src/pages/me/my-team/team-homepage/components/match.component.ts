/**
 * Created by allenou on 2017/3/23.
 */
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchDatailPage } from '../schedule/match-detail';


@Component({
  selector: 'match',
  template: `
      <div class="content" *ngIf="matchs.length>0">
         <div class="item"  *ngFor="let match of matchs" (click)="goMatchDetail(match)">
          <div class="basic-info"><time>{{match.date}} 周{{match.day|chineseDay}}</time><span *ngIf="match.formatName">/{{match.formatName}}</span></div>
          <div class="team-logo">
              <div class="logo-box">
              <div class="logo" [class.team-logo-default]="!match.homeTeamIconUrl" [style.background]="'url('+ match.homeTeamIconUrl+')  no-repeat center center/cover '| safeStyle " ></div>
              </div>
            <p class="center" *ngIf="match.matchState!==-1" >
                  VS
            </p>
            <p class="score" *ngIf="match.matchState===-1">
                 <span *ngIf="match.homeScore">{{match.homeScore}}</span><span *ngIf="!match.homeScore">-</span><i>:</i><span *ngIf="match.guestScore">{{match.guestScore}}</span><span *ngIf="!match.guestScore">-</span>
            </p>
             <div class="logo-box">
           <div class="logo" [class.team-logo-default]="!match.guestTeamIconUrl " [style.background]="'url('+ match.guestTeamIconUrl +')  no-repeat center center/cover '| safeStyle " ></div>
           </div>
          </div>
          <div class="team-name">
            <p class="name"><span>{{match.homeTeamName}}</span></p>
            <p>   
              <b *ngIf="match.matchState===-1" class="match-state end">比赛结束</b>
              <b *ngIf="match.matchState===0" class="match-state success">约战成功</b>
              <b *ngIf="match.matchState===1||match.matchState===2||match.matchState===3||match.matchState===4" class="match-state ing">比赛中</b>
            </p>
            <p class="name"> <span>{{match.guestTeamName}}</span>  </p>
          </div>
        </div>
      </div>
      <div class="no-record-wrap" *ngIf="matchs.length===0">
        <div class="no-record-icon"></div>
        <div class="no-record-text">暂无赛程记录哦~</div>
      </div>
    `
})
export class MatchComponent {
  matchs: Array<any> = [];//球队历史赛程
  constructor(public navCtrl: NavController) { }

  setMatch(result) {
    this.matchs = result;
  }
  //前往球队比赛详情
  goMatchDetail(match: any) {
    this.navCtrl.push(MatchDatailPage, {
      "id": match.id,
      "status": match.matchState
    })
  }
}
