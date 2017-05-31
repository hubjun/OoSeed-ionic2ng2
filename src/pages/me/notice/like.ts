import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from "rxjs";
import {UserInfoService} from '../../../providers/UserInfoService';
import { ToolsService } from "../../../providers/ToolsService";

@Component({
  selector: 'page-like',
  templateUrl: 'like.html',
  providers: [UserInfoService]
})
export class LikePage {
  page: number = 1;
  rows: number = 10;
  mesObj: any;
  tempDate: any;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserInfoService,
    public tools: ToolsService
  ) {}

  timesTamp(time){
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate() + ' ';
    this.tempDate = Y+M+D;
  };

  getDiggMeInfo(){
    this.tools.showLoading();
    this.subscription.add(
      this.userService.getDiggMe(this.page,this.rows)
        .subscribe(rs => {
          if(rs.result === '0'){
            for(let i = 0; i< rs.data.list.length; i++){
              this.timesTamp(rs.data.list[i].createTime);
              rs.data.list[i].createDate = this.tempDate;
            }
            this.mesObj = rs.data.list;
          }else {
            return;
          }
          this.tools.hideLoading();
        })
    );
  };

  ngOnInit(){
    this.getDiggMeInfo();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
