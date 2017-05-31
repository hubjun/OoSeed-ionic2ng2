import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { UserInfoService } from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";
import { TeamDetailPage } from './team-homepage/team-detail';

@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html',
  providers: [UserInfoService]
})

export class MyTeamPage {
  myTeamsObj: any;
  infinite: any;
  userId: any;
  page: number = 1;
  rows: number = 10;
  infiniteStatus: boolean = true;

  constructor(
    private userService: UserInfoService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private tools: ToolsService
  ) {
    this.userId = this.navParams.get('userID');
  }

  getInfiniteStatus():boolean{
    return this.infiniteStatus;
  }

  setInfiniteStatus(status: boolean){
    return this.infiniteStatus = status;
  };

  downApp(){
    this.tools.presentConfirm();
  };

  //前往球队详情页
  goTeamDetail(team){
    this.navCtrl.push(TeamDetailPage,{
      id:team.id
    });
  }

  getMyTeamsInfo(type){
    // let page = 1;
    // let rows = 10;
    this.userService.getMyTeams(this.page,this.rows,this.userId)
      .subscribe(rs => {
        // debugger
        if(rs.result === '0'){
          if(type){
            this.myTeamsObj.concat(rs.data.list);
          }else {
            this.myTeamsObj = rs.data.list;
          }
          // if(rs.data.hasNextPage == true){
          //   for(let i = 0; i< rs.data.list.length; i++){
          //     this.myTeamsObj.push(rs.data.list[i]);
          //   }
          // }
          this.setInfiniteStatus(rs.data.hasNextPage);
          // else {
          //   this.infinite.enable(false);
          // }
        }else {
          return;
        }
      })
  };

  ionViewWillEnter(){
    this.getMyTeamsInfo(null);
  };

  doInfinite(infiniteScroll: InfiniteScroll,e){
    setTimeout(() => {
      if(this.getInfiniteStatus()){
        this.page++;
        this.infinite = infiniteScroll;
        // let page = this.page;
        // let rows = this.rows;
        var type = true;
        this.getMyTeamsInfo(type);
        this.infinite.complete();
        // infiniteScroll.enable(false);
      }else {
        this.infinite.complete();
        this.infinite.enable(false);
      }
    },500)
  };

}
