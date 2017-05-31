import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserInfoService } from '../../providers/UserInfoService';
import {ToolsService} from "../../providers/ToolsService";
declare var $;
/*
  Generated class for the JobHistory page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-history',
  templateUrl: 'job-history.html',
  providers: [UserInfoService,ToolsService]
})
export class JobHistoryPage {
  jobObj: any;
  tempJoinDate: any;
  tempOutDate: any;

  constructor(
    // private el: ElementRef,
    // private renderer: Renderer,
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserInfoService,
    private tools: ToolsService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobHistoryPage');
  }
  ngAfterViewInit(){
    // debugger
    // let list = this.el.nativeElement.querySelector('.list');
    // console.log(list);
    // this.renderer.setElementClass(list,'first-list',true);
  };

  timeTamp(time){
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate() + ' ';
    // let h = date.getHours() + ':';
    // let m = date.getMinutes() + ':';
    // let s = date.getSeconds();
    //console.log(Y+M+D);
    //this.tempJoinDate = Y+M+D;
    return Y+M+D;
  };

  getHistoryInfo(){
    let userID = localStorage.getItem('userid');
    this.tools.showLoading();
    this.userService.getHistory(userID)
      .subscribe(rs => {
        if(rs.result === '0'){
          setTimeout(() =>{
            $('.list div.listItem').eq(0).addClass('first-list').addClass('hightLight');
            $('.list div.listItem').last().addClass('last-list');
          });

          console.log(rs);
          this.jobObj = rs.data.list;
          this.tools.hideLoading();
          console.log(`outTeamTime :` + this.jobObj.outTeamTime);
          // debugger
          for(let i = 0; i< rs.data.list.length; i++){
            this.tempJoinDate = this.timeTamp(rs.data.list[i].inTeamTime);
            rs.data.list[i].joinDate = this.tempJoinDate;

            if(rs.data.list[i].outTeamTime !== 'undefined'){
              this.tempOutDate = this.timeTamp(rs.data.list[i].outTeamTime);
              rs.data.list[i].outDate = this.tempOutDate;
            }else {
              return;
            }
          }
        }else {
          this.tools.tips(rs.msg,2000);
        }
      })
  };

  ngOnInit(){
    this.getHistoryInfo();
  };
}
