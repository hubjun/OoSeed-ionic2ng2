import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { HomeService } from "../../providers/HomeService";
import { ToolsService } from "../../providers/ToolsService";
import { LocalService } from "./local.service";
import { LocalFilterComponent } from './components/local-filter/local-filter.component';
import { Subscription } from "rxjs";

import { LocateCityPage } from "./locate-city/locate-city";
import { BookingMatchPage } from './booking-competition/booking-match';
@Component({
  selector: 'page-local',
  providers: [HomeService, ToolsService],
  templateUrl: 'local.html'
})
export class LocalPage {
  public activities: string = 'spellAll';
  public locationSelect = false;
  channel: string = 'spellBall';
  private subscription: Subscription = new Subscription();
  //招募
  public recruitObj: any[] = [];
  //个人ip
  public ifFollow: Array<any> = [''];
  public personIpList: any[] = [];
  public teamIpList: any[] = [];
  // public recruitList: string = 'spellAll';
  public ifloding: string = '加载中...';
  public spinner: string = 'ios';
  public p_ifloding: string = '加载中...';
  public p_spinner: string = 'ios';
  public scrollControl: boolean = true;
  public tCanSee: boolean = false;
  public pCanSee: boolean = false;
  public tCanLoad = true;
  public pCanLoad = true;
  public teamippage = { page: 1, scroll: true };
  public personippage = { page: 1, scroll: true };
  cityStr: string = "";

  public currentCity: any;
  private changeCity:boolean=true;

  public filterTypes = {
    sortType: [{
      id: 1,
      title: "默认"
    }, {
      id: 2,
      title: "即将截止"
    }, {
      id: 3,
      title: "最新发布"
    }]
  };
  @ViewChild(BookingMatchPage) bookingMatchPage: BookingMatchPage;
  @ViewChild(LocalFilterComponent) localFilterComponent: LocalFilterComponent;

  constructor(
    public navCtrl: NavController,
    public homeService: HomeService,
    public modalCtrl: ModalController,
    public tools: ToolsService,
    public LocalSv: LocalService,
    public events: Events,
    public localService: LocalService
  ) {
    // this.localService.getLonLatt();
    this.subscription.add(
    this.LocalSv.PScrollEnd.subscribe((res: any) => {
      if (res.ifend) {
        if (res.length != 0) {
          this.p_ifloding = ""; this.p_spinner = ''; this.pCanSee = true;
           res.length>=10?this.pCanSee = true:this.pCanSee = false;
        } else {
          this.pCanLoad = false;
        }
      } else { 
        this.p_ifloding = "加载中..."; this.p_spinner = 'ios';
        res.length>=10?this.pCanSee = true:this.pCanSee = false;
       }
    })
    )
    this.subscription.add(
    this.LocalSv.TScrollEnd.subscribe((res: any) => {
      if (res.ifend) {

        if (res.length != 0) {
          this.ifloding = ""; this.spinner = ''; 
          res.length>=10?this.tCanSee = true:this.tCanSee = false;
        } else {
          this.tCanLoad = false;
        }
      } else { 
        this.ifloding = "加载中..."; this.spinner = 'ios' ;
        res.length>=10?this.tCanSee = true:this.tCanSee = false;
      }
    })
    )
    this.subscription.add(
    this.localService.filterResults.subscribe((filterTypes: any) => {
      this.teamippage.page = 1;
      this.personippage.page = 1;
      this.tCanSee = false;
      this.pCanSee = false;
      this.tCanLoad = true;
      this.pCanLoad = true;
    })
    )
    this.subscription.add(
    this.events.subscribe('customLocation', (arr) => {
      this.cityStr = arr[4];
        let handCityAreaId=arr[3];
        let autoCity = this.localService.currentCity;

      //根据自动定位切换城市
      if(handCityAreaId !== autoCity.areaId&&this.changeCity){
          let that=this;
          this.tools.showConfirm('提示', `定位到您在${autoCity.title},要切换至${autoCity.title}吗？`, function () {
           // 确定操作
           that.cityStr=autoCity.title;
           that.localFilterComponent.getAllAreaByParentPostcode(autoCity.postCode);
          },function(){
            //取消操作
             that.changeCity=false;
             that.localFilterComponent.getAreaByParentId(arr);
          })
       }
       else{
          //不需要根据自动定位切换城市
           this.changeCity=false;
          this.localFilterComponent.getAreaByParentId(arr);
       }
    })
  )
  }

  ionViewDidEnter() {

    if (this.cityStr == '') {
      // this.localService.getLocateIp();
    }
  };

  ngOnDestroy() {

  };

  onScroll(e) {

  }
  //切换栏目
  handleSelectNav(value: string) {
    this.channel = value;
    // this.localFilterComponent.initFilter();
    if (value == 'recruit') {
      this.localService.filterTypes.emit(this.filterTypes);
    }
    if (value == 'teamIp') {
      this.teamippage.page = 1;
      this.tCanSee = false;
    }
    if (value == 'personalIp') {
      this.personippage.page = 1;
      this.pCanSee = false;
    }
  }
  //按排序改变定位文字

  changeAreaText(areaName: string) {
    this.cityStr = areaName;
  }

  goLocalLocation() {
    this.navCtrl.push(LocateCityPage);
  }
  //个人ip加载更多
  getperson(infiniteScroll) {
    if (!this.pCanLoad) { infiniteScroll.complete(); return }
    if (this.personippage.page >= 2) {
      this.p_ifloding = ""; this.p_spinner = ''
      this.pCanSee = true;
      infiniteScroll.complete(); return
    }
    this.personippage.page += 1;
    this.LocalSv.personIpScroll.emit(this.personippage);
    setTimeout(function () {
      infiniteScroll.complete()
    }, 1000)
  }
  //球队ip加载更多
  getteam(infiniteScroll) {
    if (!this.tCanLoad) { infiniteScroll.complete(); return }
    if (this.teamippage.page >= 2) {
      this.ifloding = ""; this.spinner = '';
      this.tCanSee = true;
      infiniteScroll.complete();
      return
    }
    this.teamippage.page += 1;
    this.LocalSv.teamIpScroll.emit(this.teamippage);
    setTimeout(function () {
      infiniteScroll.complete()
    }, 1000)
   
  }

  ngOnInit() {
      this.localService.getCityCode();
      this.localService.getLonLatt();
  }
}
