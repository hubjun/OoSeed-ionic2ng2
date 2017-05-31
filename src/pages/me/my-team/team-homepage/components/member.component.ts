/**
 * Created by allenou on 2017/3/28.
 */
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail';
import { PersonalHomepagePage } from '../../../../personal-homepage/personal-homepage';


@Component({
  selector: 'member',
  template: `
          <ul class="team-grid-list" *ngIf="members.total>0">
            <li *ngFor="let member of members.list" >
              <div class="content" *ngIf="member.orgInfoVO" (click)="goToTeamHomepage(member.orgInfoVO.orgId)">
             
                <div class="avatar" [class.team-logo-default]="!member.iconUrl" [style.background]=" 'url('+ member.iconUrl+') no-repeat center center/cover ' | safeStyle " ></div>
               <i class="identity team">球队</i>
         
             <span class="nickname">{{member.orgInfoVO.orgName}}</span>
           </div>
            <div class="content" *ngIf="!member.orgInfoVO" (click)="goToPersonalHomepage(member.userId)">
         
             <div class="avatar" [class.avatar-default]="!member.iconUrl" [style.background]=" 'url('+ member.iconUrl+') no-repeat center center/cover ' | safeStyle " ></div>
               <i class="identity user">个人</i>
          
             <span class="nickname">{{member.nickName}}</span>
           </div>
            </li>
          </ul>
          <div class="no-record-wrap" *ngIf="members.total===0">
            <div class="no-record-icon"></div>
            <div class="no-record-text" *ngIf="members.type=='follow'">你还没有关注任何人哦~</div>
            <div class="no-record-text" *ngIf="members.type=='fans'">还没有人关注你哦~</div>
          </div>
    `
})
export class MemberComponent {
  @Input() members: Array<string>;
  constructor(public navCtrl: NavController) { }
  //前往球队主页
  goToTeamHomepage(teamId: number) {
    this.navCtrl.push(TeamDetailPage, {
      id: teamId
    });
  }
  //前往个人主页
  goToPersonalHomepage(userId: string) {
    this.navCtrl.push(PersonalHomepagePage, {
      userid: userId
    });
  }
}
