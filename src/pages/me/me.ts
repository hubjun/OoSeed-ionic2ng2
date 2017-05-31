import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { EditInfoPage } from './edit-info/edit-info';
import { MyContentPage } from '../../pages/me/my-content';
import { MorePage } from '../../pages/me/more';
import { NoticeListPage } from './notice/notice-list';
import { MyTeamPage } from './my-team/my-team';
import { UserInfoService } from '../../providers/UserInfoService';
import { FeedbackPage } from './feedback/feedback';
import { UserDataService } from "../../providers/UserDataSevice";
import { TabsPage } from "../tabs/tabs";
import { mySpell } from "./my-spell/my-spell";

import { MySchedulePage } from './my-schedule/my-schedule';
import {PersonalHomepagePage} from "../personal-homepage/personal-homepage";
import {HomepageFanslistPage} from "../personal-homepage/homepage-fans/hoempage-fanslist/homepage-fanslist";

@Component({
  selector: 'page-me',
  templateUrl: 'index.html',
  providers: [UserInfoService]
})

export class MePage {
  userInfo: any[] = [];
  userId: string;
  isMan: boolean = true;
  isAuthentic: boolean = false;
  userAge: any = '';
  offset:number = -5000;
  constructor(
    public navCtrl: NavController,
    public userService: UserInfoService,
    private user: UserDataService,
    private appCtrl: App
  ) { }

  ionViewDidEnter() {
    this.getUserInfo();
  };

  editInfo() {
    this.navCtrl.push(EditInfoPage, {
      userObj: this.userInfo,
      userAge: this.userAge
    });
  };
  goToMySchedule() {//个人日程
    this.navCtrl.push(MySchedulePage)
  }
  goToMySpell() {
    this.navCtrl.push(mySpell);
  };
  goMyContent(userId:string) {
    this.navCtrl.push(
      MyContentPage,{
        userid:userId
      });
  };
  goMore() {
    this.navCtrl.push(MorePage);
  };
  goNoticeList(){
    this.navCtrl.push(NoticeListPage);
  };
  goMyteam() {
    this.navCtrl.push(MyTeamPage, {
      userID: this.userId
    });
  };
  goFeedback() {//意见反馈
    this.navCtrl.push(FeedbackPage)
  }

  goToFanslist(userId,states:boolean){
    this.navCtrl.push(HomepageFanslistPage, {
      userId: userId,
      states:states
    });
  }

  loginOut() {
    this.user.logout();
    setTimeout(() => {
      this.appCtrl.getRootNav().setRoot(TabsPage);
    }, 1100)
  }
  getUserInfo() {
    //let userId = 'hhly91978';
    this.userService.getUserInfo('')
      .subscribe(rs => {
        if (rs.result === '0') {
          if (rs.data.sex == 1) {
            this.isMan = true;
          }
          else if (rs.data.sex == 2) {
            this.isMan = false;
          }
          if (rs.data.authStatus == 0) {
            this.isAuthentic = true;
          }
          rs.data.genderDesc = this.userService.fieldMap().genderMap[rs.data.sex];
          rs.data.authDesc = this.userService.fieldMap().authMap[rs.data.authStatus];
          this.userInfo = rs.data;
          this.userId = rs.data.userId;
          this.userAge = rs.data.userAge;
        } else {
          return;
        }
      })
  };

  //跳到个人主页
  goToPersonalPage(userid:number,event){
    event.stopPropagation();
    this.navCtrl.push(
      PersonalHomepagePage,
      {userid:userid}
    )
  }
  ngOnInit() {
    // this.userLogin();
    // this.userService.login()
    this.getUserInfo();
  };

  ionViewCanEnter(): boolean {
    let hasLoggedIn = this.user.hasLoggedIn();
    if (hasLoggedIn == 'true'){
      return true
    }else {
      this.user.showLoginPage();
      return false;
    }
  }
}
