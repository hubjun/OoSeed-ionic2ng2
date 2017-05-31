/**
 * Created by allenou on 2017/3/8.
 */
import { Injectable } from "@angular/core";
import { HttpService } from '../../providers/HttpService';

import { ToolsService } from '../../providers/ToolsService';
import { Team } from '../../models/team/team.model';

@Injectable()
export class MeService {
  private AVATAR_URL = '/user/uploadIconFile';
  private FOLLOW_URL = '/user/_guest/findFollow'
  private FANS_URL = '/user/_guest/findFans'
  private USER_LATEST_SCHEDULT_URL = '/user/latestUserSchule'//获取用户最近日程
  private USER_NEWEST_SCHEDULI_URL = '/user/scheduleInfo' //获取用户今日日程
  private paths = {
    'team-name': '/team-name',
    'team-adress': '/team-address'
  }

  constructor(
    private httpservice: HttpService,
    private toolsService: ToolsService
  ) {
  }
  //上传头像
  updateAvatar(file: any) {
    let url = this.AVATAR_URL
    return this.httpservice.upload(url, file).map(res => res.json());
  }
  //更新信息
  updateInfo(type: string, value: string) {
    if (this.paths.hasOwnProperty(type)) {
      let url = this.paths[type]
      this.httpservice.get(url)
    }
  }
  //获取球队关注信息
  getFollow(obj) {
    let url = this.FOLLOW_URL;
    let uri = this.toolsService.param(obj);
    return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户粉丝信息
  getFans(obj) {
    let url = this.FANS_URL;
    let uri = this.toolsService.param(obj);
    return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户今日日程
  getUserNewestSchedule(obj) {
    let url = this.USER_NEWEST_SCHEDULI_URL;
    let uri = this.toolsService.param(obj);
    return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户最近日程
  getUserLatestSchedule() {
    let url = this.USER_LATEST_SCHEDULT_URL;
    return this.httpservice.get(url).map(res => res.json());
  }
}
