/**
 * Created by allenou on 2017/4/8.
 */
import { Injectable, EventEmitter, ViewChild } from '@angular/core';
// import { Events } from 'ionic-angular';
import { HttpService } from '../../providers/HttpService';
import { ToolsService } from '../../providers/ToolsService';
import { Subject } from "rxjs/Subject";
import { StorageService } from '../../providers/StorageService';
import { LocalFilterComponent } from './components/local-filter/local-filter.component';

declare var AMap: any;//声明
@Injectable()
export class LocalService {

  private BOOKING_COMPETITION_URL = '/user/_guest/findCityFight';//约战
  private MATCH_DETAIL_URL = '/team/engageInfo'//约战详情
  private SPORT_TYPE_URL = '/dict/sport/type';//球类类型
  private Citys_Url = '/dict/hotDictCity';  //城市列表
  private PersonIp_Url = '/user/_guest/findCityUser';//推荐个人ip列表
  private TeamIp_Url = '/_guest/team/recommended';//推荐球队ip列表
  private INFO_TEAM_CARD_URL = '/user/_guest/city/fight/ball';//拼球列表
  private INFO_MY_ACTIVITIES_URL = '/user/_guest/city/fight/findMyJoin';
  private INFO_TEAM_CARD_DETAIL_URL = '/user/_guest/city/fight/fightInfo';
  private hotCityUrl = '/dict/hotDictCity';
  private proCityUrl = '/dict/getDictAreaTree';
  public ToFollow = '/user/friend';//新增关注
  private cityAreaUrl = '/dict/getAreaByParentId';
  private getRecruitListUrl = '/user/_guest/findCityRecruit';
  private getRecruitDetailUrl = '/team/recruit';
  private getauthCateUrl = '/user/_guest/authCate';//个人身份类别
  private POSTCODE_URL = '/dict/getAreaByParentPostCode';  //通过邮编查询城市信息
  public autoLocation: EventEmitter<any>;
  public manualLocation: EventEmitter<any>;
  public filterTypes: EventEmitter<any>;
  public filterResults: EventEmitter<any>;
  public personIpScroll: EventEmitter<any>;
  public teamIpScroll: EventEmitter<any>;
  public spellBallScroll: EventEmitter<any>;
  public localCity: any;
  public localCityCode: any;
  public currentCityAreaAdCode: EventEmitter<any>;
  public currentCity: any;
  public loadDataByParentId: EventEmitter<any>;
  public parentId:number;
  // public getCode:string[]=[longi,lati];
  public postcode;
  //默认深圳坐标
  public coor = {
    long: 0,
    lat: 0,
  };
  public markPara:string='0';

  public PScrollEnd: EventEmitter<any>;
  public TScrollEnd: EventEmitter<any>;
  public BallScrollEnd: EventEmitter<any>;
  public postPara: EventEmitter<any>;
   public cacheOtherChannelFilterResult:any;
  // public cacheUserIPChannelFilterReusult:any;
  public followicon: any[] = ["assets/images/subscript_icon_unfollow.png", "assets/images/subscript_icon_isfollow.png", "assets/images/hxguanzhu.png"];

  constructor(
    private httpService: HttpService,
    private toolsService: ToolsService,

    private storageService: StorageService
    // public events: Events
    // public events: Events
  ) {
    this.filterTypes = new EventEmitter();
    this.filterResults = new EventEmitter();
    this.personIpScroll = new EventEmitter();
    this.teamIpScroll = new EventEmitter();
    this.PScrollEnd = new EventEmitter();
    this.TScrollEnd = new EventEmitter();
    this.BallScrollEnd = new EventEmitter();
    this.spellBallScroll = new EventEmitter();
    this.autoLocation = new EventEmitter();
    this.manualLocation = new EventEmitter();
    this.currentCityAreaAdCode = new EventEmitter();
    this.loadDataByParentId=new EventEmitter();

    this.postPara=new EventEmitter();

  }
  //个人身份类别
  getauthCate() {
    let url = this.getauthCateUrl + '?authType=1&parentId=0';
    return this.httpService.get(url).map(res => res.json())
  }
  //查询同城约战列表
  getBookingCompetition(obj) {
    let url = this.BOOKING_COMPETITION_URL;
    let uri = $.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队对战详情
  getBookingMatchDetail(obj) {
    let url = this.MATCH_DETAIL_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //查询球类
  getSportType(obj) {
    let url = this.SPORT_TYPE_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //城市列表
  getcitys() {
    let url = this.Citys_Url;
    let data = {
      langType: 'zh_CN'
    };
    return this.httpService.post(url, data).map(res => res.json())
  }

  //获取拼球信息
  getTeamCardInfo(params, myActivities) {
    let url = '';
    if (myActivities == 'spellAll') {
      url = this.INFO_TEAM_CARD_URL;
    }
    if (myActivities == 'activities') {
      url = this.INFO_MY_ACTIVITIES_URL;
    }


    let uri =$.param(params);
    return this.httpService.get(`${url}?${uri}`).map((res) => res.json());
  }

  //获取拼球详细信息
  getTeamCardDetailInfo(fightId) {
    let url = this.INFO_TEAM_CARD_DETAIL_URL + `?fightId=${fightId}&lat=${this.coor.lat}&lon=${this.coor.long}`;
    return this.httpService.get(url).map((res) => res.json());
  }

  //个人ip
  getPersonIp(data) {
    let url = this.PersonIp_Url + '?' + $.param(data);
    return this.httpService.get(url).map(res => res.json());
  }
  //球队ip
  getTeamIp(data) {
    let url = this.TeamIp_Url + '?' + $.param(data);
    return this.httpService.get(url).map(res => res.json())
  }
  //定位/城市选择
  getHotCity(opt) {
    let url = this.hotCityUrl;
    return this.httpService.post(url, opt).map(rs => rs.json());
  };
  getProCity(opt) {
    let url = this.proCityUrl + '?' + $.param(opt);
    return this.httpService.get(url).map(rs => rs.json());
  };
  getCityArea(opt) {
    let url = this.cityAreaUrl;
    return this.httpService.post(url, opt).map(rs => rs.json());
  };
  getRecruitList(obj) {
    let url = this.getRecruitListUrl;
    let params = $.param(obj);
    return this.httpService.get(`${url}?${params}`).map(res => res.json());
  }
  getRecruitDetail(teamRecruitId) {
    // let url=this.getRecruitDetailUrl + `?fightId = ${teamRecruitId}&lat=0&lon=0`;
    let url = this.getRecruitDetailUrl + `?teamRecruitId=${teamRecruitId}`;
    return this.httpService.get(url).map((res) => res.json());
  }
  //关注数字图标转换
  turnicon(me: number, he: number) {
    if (me == 0 && he == 0) {
      return this.followicon[0];
    } else if (me == 1 && he == 0) {
      return this.followicon[1];
    } else if (me == 1 && he == 1) { return this.followicon[2]; }
  }
  teamipturnicon(follow: number) {
    if (follow == 1) { return this.followicon[0]; }
    else if (follow == 2) { return this.followicon[1]; }
    else if (follow == 0) { return this.followicon[2]; }
  }
  //新增关注
  AddFollow(index, userid) {
    let url = this.ToFollow;
    let opt = { followUserId: userid }
    return this.httpService.post(url, opt).map(rs => rs.json());
  }
  //球队关注时图标变化
  teamFollowicon(follow: number) {
    if (follow == 1) { return this.followicon[1]; }
    else if (follow == 3) { return this.followicon[2]; }
  }

  //获取经纬度
  getLonLatt() {
    return new Promise(resolve => {
      this.markPara='1';
      let map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map('container', {
        resizeEnable: true
      });

      let that = this;
      map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000          //超过10秒后停止定位，默认：无穷大
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息

      });
      function onComplete(data) {
        that.coor.long = data.position.getLng();
        that.coor.lat = data.position.getLat();
        that.postPara.emit(that.coor);
        resolve(that.coor);
        geolocation.getCityInfo(getCityInfo);
      }
      function getCityInfo(status, result) {
        if (status == 'complete') {
          that.currentCityAreaAdCode.emit(result.adcode);
        }
        else {
          that.toolsService.presentConfirm('定位失败,请手动选择所在城市');
        }
      }
    })
  }

  getCityCode() {
    return new Promise(resolve => {
      let map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map('container', {
        resizeEnable: true
      });

      let that = this;
      map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000          //超过10秒后停止定位，默认：无穷大
        });
        map.addControl(geolocation);
        geolocation.getCityInfo(getCityInfo);

      });
      function getCityInfo(status, result) {
        if (status == 'complete') {
          that.currentCityAreaAdCode.emit(result.adcode);
        }
        else {
          that.toolsService.presentConfirm('定位失败,请手动选择所在城市');
        }
      }
    })
  }






  getAreaByParentId(obj) {
    let url = this.cityAreaUrl;
    return this.httpService.post(url, obj).map(rs => rs.json());
  }
  getAreaByParentPostCode(obj) {
    let url = this.POSTCODE_URL;
    return this.httpService.post(url, obj).map(rs => rs.json());
  }
}
