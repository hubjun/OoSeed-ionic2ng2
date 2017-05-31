import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import {UserInfoService} from '../../../providers/UserInfoService';
import { ToolsService } from "../../../providers/ToolsService";

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
  providers: [UserInfoService]
})
export class NoticePage {
  page: number = 1;
  rows: number = 10;
  mesObj: any;
  tempDate: any;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserInfoService,
    private tools: ToolsService
  ) {}
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad NoticePage');
  // }

  timesTamp(time){
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate() + ' ';
    // let h = date.getHours() + ':';
    // let m = date.getMinutes() + ':';
    // let s = date.getSeconds();
    // console.log(Y+M+D);
    this.tempDate = Y+M+D;
  };

  getCommentMe(){
    this.tools.showLoading();
    this.subscription.add(
      this.userService.getMyCommentMe(this.page,this.rows)
        .subscribe(rs => {
          if(rs.result === '0'){
            for(let i = 0; i< rs.data.list.length; i++){
              this.timesTamp(rs.data.list[i].createTime);
              rs.data.list[i].createDate = this.tempDate;
              // console.log(rs.data.list[i].joinTime);
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
    this.getCommentMe();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
