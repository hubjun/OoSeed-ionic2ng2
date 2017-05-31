import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Headers, RequestOptions, URLSearchParams, Http, Response } from '@angular/http';
import {HttpService} from './HttpService';
import {ToolsService} from '../providers/ToolsService';

declare var $;

@Injectable()
export class UserInfoService {
  // private APP_HOST = 'http://192.168.10.46:8089/api/v1';   //测试地址
  private headers = new Headers({'Content-Type': 'application/json;'});
  private params = new URLSearchParams();
  // private defaultOpt = new RequestOptions({headers: this.headers});
  // private userLoginUrl = 'http://api.sport.com/user/_guest/login';
  private userInfoUrl = '/user/_guest/userInfo';
  private editUserInfoUrl = '/user/_userInfo';
  private ballInfoUrl = '/user/football/info';
  private jobHistoryUrl = '/_guest/ballResume/selectByUserId';
  private myTeamsUrl = '/_guest/team/list';
  private commentMeUrl = '/user/commentMe';
  private diggMeUrl = '/user/diggMe';
  private atMeUrl = '/user/atMe';
  private ballLocationUrl = '/dict/position/football';
  private ballAbilityUrl = '/dict/characteristics/football';
  // private editBalLocationUrl = '/user/football/info';
  private editUserFootballInfoUrl = '/user/football/info';
  private getUserInfoUrl = "/user/_guest/userInfo";

  constructor(
    public http: Http,
    public httpService: HttpService,
    public tools: ToolsService
  ) {}

  public fieldMap(){
    return {
      genderMap: {
        1: '男',
        2: '女',
        3: '保密'
      },
      authMap: {
        0: '未认证',
        1: '已认证'
      }
    }
  };

  upLoadImg(){};

  getUserInfo(userId: string){
    let options = new RequestOptions({headers: this.headers});
    let url = this.getUserInfoUrl;
    return this.httpService.get(url +`?userId=${userId}`)
      .map((res) => res.json())
  };

  getBallInfo(footballId: string){
    return this.httpService.get(this.ballInfoUrl + `?footballId=${footballId}`)
      .map((rs: Response) => rs.json())
      .catch(this.handleError);
  };

  getHistory(userId: string){
    return this.httpService.get(this.jobHistoryUrl + `?userId=${userId}`)
      .map((rs: Response) => rs.json())
      .catch(this.handleError);
  };

  getMyTeams(page: number, rows: number, userId: any){
    return this.httpService.get(this.myTeamsUrl + `?userId=${userId}` + `&page=${page}` + `&rows=${rows}`)
      .map((rs: Response) => rs.json())
      .catch(this.handleError);
  };

  getMyCommentMe(page: number, rows: number){
    return this.httpService.get(this.commentMeUrl + `?page=${page}` + `&rows=${rows}`)
      .map((rs: Response) => rs.json())
  };

  getDiggMe(page: number, rows: number){
    return this.httpService.get(this.diggMeUrl + `?page=${page}` + `&rows=${rows}`)
      .map((rs: Response) => rs.json())
  };

  getAtMe(page: number, rows: number){
    return this.httpService.get(this.atMeUrl + `?page=${page}` + `&rows=${rows}`)
      .map((rs: Response) => rs.json())
  };

  getBallLocation(){
    return this.httpService.get(this.ballLocationUrl)
      .map((rs: Response) => rs.json())
      .catch(this.handleError);
  };

  getBallAbility(){
    return this.httpService.get(this.ballAbilityUrl)
      .map((rs: Response) => rs.json())
      .catch(this.handleError);
  };

  /**
   * serialize the form element
   **/
  serialize(obj: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var element = obj[key];

        params.set(key, element);
      }
    }
    return params;
  }

  putBallLocation(params){
    // let opt = JSON.stringify(params);
    // return this.httpService.putJsonObj(this.editUserFootballInfoUrl ,params)
    return this.httpService.putJsonObj(this.editUserFootballInfoUrl,params)
      .map((rs: Response) => rs.json());
  };

  update(opt){
    // let cwh = $.param(opt);
    return this.httpService.putUrlencode( this.editUserInfoUrl ,opt)
      .map((rs: Response) => rs.json());
  };

  private handleError(error: Response){
    return Observable.throw(error.json().error || 'Server Error');
  }
}
