import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from "rxjs";
import {UserInfoService} from '../../../providers/UserInfoService';
import { ToolsService } from "../../../providers/ToolsService";

@Component({
  selector: 'page-at-me',
  templateUrl: 'at-me.html',
  providers: [UserInfoService]
})
export class AtMePage {
  page: number = 1;
  rows: number = 10;
  mesObj: any;
  tempDate: any;
  content: string;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserInfoService,
    public tools: ToolsService
  ) {}

  timesTamp(time) {
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate() + ' ';
    this.tempDate = Y + M + D;
  };

  getAtMeInfo(){
    this.tools.showLoading();
    this.subscription.add(
      this.userService.getAtMe(this.page,this.rows)
        .subscribe(rs => {
          if(rs.result === '0'){
            for(let i = 0; i< rs.data.list.length; i++){
              this.timesTamp(rs.data.list[i].createTime);
              rs.data.list[i].createDate = this.tempDate;
              // console.log(rs.data.list[i].joinTime);
              if(rs.data.list[i].noticeType == '1'){
                rs.data.list[i].contentStr = '在分享中@了你';
              }else if(rs.data.list[i].noticeType == '2'){
                rs.data.list[i].contentStr = '在评论中@了你';
              }
            }
            this.mesObj = rs.data.list;
            console.log(rs);
          }else {
            return;
          }
          this.tools.hideLoading();
        })
    );
  };

  ngOnInit(){
    this.getAtMeInfo();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
