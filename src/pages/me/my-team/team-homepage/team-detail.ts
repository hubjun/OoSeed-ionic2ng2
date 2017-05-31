/**
 * Created by allenou on 2017/3/18.
 */
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ToolsService } from '../../../../providers/ToolsService';
import { TeamService } from '../team.service';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  channel: string = 'team';//默认球队模块
  basicInfo: string[] = [];//球队基本信息
  constructor(
    private teamService: TeamService,
    private navParams: NavParams,
    private toolsService: ToolsService
  ) { }
  ngOnInit() {
    this.getTeamBasicInfo();
  }
  //获取球队基本信息
  getTeamBasicInfo():void {
    this.toolsService.showLoading();
    let params: any = {
      id: this.navParams.get('id')
    }
    this.teamService.getTeamBasicInfo(params).subscribe((res) => {
      if (res.result === '0') {
        this.basicInfo = res.data;
        this.toolsService.hideLoading();
      }
    })
  }
}
