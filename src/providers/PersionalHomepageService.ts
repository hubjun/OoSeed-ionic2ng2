/**
 * Created by dell on 2017/4/13.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './HttpService';
import {Response} from "@angular/http";
import {Subject} from "rxjs";

@Injectable()
export class PersionalHomepageService {
  private GET_USER_INFO_URL = '/user/_guest/userInfo';
  private GET_USER_SERVER_URL = '/user/_guest/auth';
  private GET_USER_FEED_URL = '/feed/feed';
  private GET_USER_ALBUMFILE_URL = '/user/_guest/albumFile';
  private GET_USER_JOIN_TEAM_URL = '/_guest/team/join';
  private GET_USER_CREATE_TEAM_URL = '/_guest/team/create';
  private GET_USER_FINDFANS_URL = '/user/_guest/findFollow';
  private GET_USER_FINDFOLLOW_URL = '/user/_guest/findFans';
  private GET_USER_ARTICLE_LIST_URL = '/article/_guest/articleList';
  private GET_USER_FEED_DIGG_URL = '/user/feedDigg';

  public userId:string;
  public userId$ : Subject<any> = new Subject<any>();



  constructor(private http: HttpService) {
  }
  getUserId(userId:string) : void{
    this.userId = userId;
  }
  getUserInfo(userId: string) {
    let url = this.GET_USER_INFO_URL + `?userId=${userId}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserServer(userId: string) {
    let url = this.GET_USER_SERVER_URL + `?userId=${userId}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserFeed(userId: string, page: number = 1, rows: number = 2) {
    let url = this.GET_USER_FEED_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserAlbum(userId: string, resType: number = 2, purType: number = 1, page = 1, rows = 10) {
    let url = this.GET_USER_ALBUMFILE_URL + `?userId=${userId}&resType=${resType}&purType=${purType}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserCreateTeam(userId: string, page: number = 1, rows: number = 2) {
    let url = this.GET_USER_CREATE_TEAM_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserJoinTeam(userId: string, page: number = 1, rows: number = 2) {
    let url = this.GET_USER_JOIN_TEAM_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserFindFans(userId: string, page: number = 1, rows: number = 8) {
    let url = this.GET_USER_FINDFANS_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserFidFollow(userId: string, page: number = 1, rows: number = 8) {
    let url = this.GET_USER_FINDFOLLOW_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserArticleList(userId: string, page: number = 1, rows: number = 10,publishStatus:number = 1,){
    let url = this.GET_USER_ARTICLE_LIST_URL + `?userId=${userId}&publishStatus=${publishStatus}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }

  getUserFeedDigg(userId: string, page: number = 1, rows: number = 10){
    let url = this.GET_USER_FEED_DIGG_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.http.get(url).map(res => res.json());
  }
}
