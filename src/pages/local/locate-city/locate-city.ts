import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams ,Content,Events } from 'ionic-angular';
import { LocalService } from '../local.service';
import { ToolsService } from "../../../providers/ToolsService";
import * as _ from 'lodash';
import { Subscription } from "rxjs";

@Component({
  selector: 'page-locate-city',
  templateUrl: 'locate-city.html',
  providers: [LocalService,ToolsService]
})

export class LocateCityPage {
  @ViewChild(Content) content: Content;
  indexs : any[] = [];
  chars: string = "ABCDEFGHJKLMNPQRSTWXYZ";
  hot : any[] = [];
  hotCityArea : any[] = [];
  hotCityAreaObj : any[] = [];
  CurHotCityListSelect : string;
  newCityObj : any[] = [];
  newSortCityObj : any[] = [];
  hint: string;
  showHint: boolean = true;
  topArea : any[] = [];
  cityObj: any[] = [];
  cityStr: string;
  cityStrParentId: string;
  hotCityParentId: string;
  locateParams = [];
  cityTitle: string = '';
  isShowTop: boolean = false;
  isShowHotTop: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localSer: LocalService,
    private tools: ToolsService,
    private el: ElementRef,
    public events: Events
  ) {}

  getHotCityInfo(){
    let opts = {
      langType: 'zh_CN'
    };
    this.subscription.add(
      this.localSer.getHotCity(opts)
        .subscribe(rs => {
          if(rs.result === '0'){
            console.log(rs);
            this.hot = rs.data.dictCityVOList;
            // this.hotCityArea = rs.data.dictCityVOList.areaList;
          }else {
            this.tools.tips(rs.msg,null);
          }
        })
    )
  };

  getCityInfo(){
    setTimeout(()=>{
      this.tools.showLoading();
    },200);
    let opts = {
      langType: 'zh_CN'
    };
    this.subscription.add(
      this.localSer.getProCity(opts)
        .subscribe(rs => {
          // debugger
          if(rs.result === '0'){
            console.log(rs);
            let startTime = new Date().getTime();

            let array = [];
            for(let i = 0; i< rs.data.dictTreeNodeVOList.length; i++){
              for(let j = 0; j < rs.data.dictTreeNodeVOList[i].dictTreeNodeList.length; j++){
                array = array.concat(rs.data.dictTreeNodeVOList[i].dictTreeNodeList[j]);
              }
            }

            // console.log(array);
            let object = _.groupBy(array,function(obj){
              return obj["firstLetter"];
            });
            // console.log(object);
            let keys = Object.keys(object);
            // let newObj = [];
            for(let key of keys){
              this.newCityObj.push({
                "iniData": key,
                "cityAreaList": object[key]
              });
            }
            this.tools.hideLoading();
            // console.log(this.newCityObj);

            this.newSortCityObj = _.sortBy(this.newCityObj, function(item){
              return item.iniData;
            });
            // console.log(this.newSortCityObj);

            let endTime = new Date().getTime();
            console.log(endTime - startTime + 'ms');
          }else {
            this.tools.tips(rs.msg,null);
          }
        })
    );
  };

  /*getCityAreaInfo(areaId,cityName){
    let opts = {
      langType: 'zh_CN',
      parentId: areaId
    };
    this.subscription.add(
      this.localSer.getCityArea(opts)
        .subscribe(rs => {
          if(rs.result === '0'){
            this.topArea = rs.data;
            for(let i = 0; i< this.topArea.length; i++){
              this.topArea[i]['city'] = cityName;
            }
            console.log(this.topArea);
          }else {
            this.tools.tips('数据接口异常',2000);
          }
        })
    )
  };*/

  queryHotArea(areaId,cityName,hotObj){
    let headerHeight = this.el.nativeElement.querySelector('#sportIp-header').clientHeight;
    let cityModal = document.getElementById('cityAreaModal2');
    cityModal.style.top = headerHeight + 'px';

    this.isShowHotTop = true;
    this.hotCityArea = hotObj;
    this.CurHotCityListSelect = hotObj.title;
    this.hotCityAreaObj = hotObj.areaList;
    // this.hotCityAreaObj = this.hotCityArea = this.topArea['title'];
    this.hotCityParentId = this.topArea['parentId'];
    // console.log(this.cityObj);
    // console.log(this.cityStr);
    // console.log(this.cityStrParentId);
  };

  //热门城市区域全城点击事件
  getHotCityAllArea(hotCity){
    console.log(this.cityStrParentId);
    this.locateParams.push(hotCity.latitude);
    this.locateParams.push(hotCity.longitude);
    //区域Id
    this.locateParams.push(hotCity.areaId);
    //区域（全城市）parentId
    this.locateParams.push(hotCity.parentId);
    //区域名称
    this.locateParams.push(hotCity.name);
    //区域所在市
    this.locateParams.push(hotCity.title);
    console.log(this.locateParams);

    this.events.publish('customLocation',this.locateParams);
    this.navCtrl.pop();
  };

  queryArea(areaId,cityName,item){
    // console.log(areaId + '，' + cityName);
    let headerHeight = this.el.nativeElement.querySelector('#sportIp-header').clientHeight;
    let cityModal = document.getElementById('cityAreaModal');
    cityModal.style.top = headerHeight + 'px';
    this.isShowTop = true;
    this.cityObj = item;
    this.cityStr = item.title;
    this.cityStrParentId = item.parentId;
    console.log(this.cityObj);
    console.log(this.cityStr);
    console.log(this.cityStrParentId);

  };

  //全城点击事件
  getAllCityArea(cityObj){
    // let locateArr = [];
    console.log(this.cityStrParentId);
    this.locateParams.push(cityObj.latitude);
    this.locateParams.push(cityObj.longitude);
    this.locateParams.push(cityObj.areaId);
    this.locateParams.push(this.cityStrParentId);
    this.locateParams.push(cityObj.name);
    this.locateParams.push(this.cityStr);
    console.log(this.locateParams);

    this.events.publish('customLocation',this.locateParams);
    this.locateParams = [];
    this.navCtrl.pop();
  };

  getLocate(latitude,longitude,name,areaId,parentId){
    // let locateArr = [];
    // let locateArr = {
    //   latitude: latitude,
    //   longitude: longitude,
    //   parentId: parentId,
    //   areaId: areaId,
    //   areaName: name,
    //   cityName: city
    // };
    //经度
    this.locateParams.push(latitude);
    //纬度
    this.locateParams.push(longitude);
    //区域Id
    this.locateParams.push(areaId);
    //区域parentId
    this.locateParams.push(parentId);
    //区域名称
    this.locateParams.push(name);
    //区域所在市
    this.locateParams.push(this.cityStr);
    console.log(this.locateParams);

    this.events.publish('customLocation',this.locateParams);
    this.locateParams = [];
    this.navCtrl.pop();
  };

  getHotLocate(latitude,longitude,name,areaId,parentId){
    //经度
    this.locateParams.push(latitude);
    //纬度
    this.locateParams.push(longitude);
    //区域Id
    this.locateParams.push(areaId);
    //区域parentId
    this.locateParams.push(parentId);
    //区域名称
    this.locateParams.push(name);
    //区域所在市
    this.locateParams.push(this.CurHotCityListSelect);
    console.log(this.locateParams);

    this.events.publish('customLocation',this.locateParams);
    this.locateParams = [];
    this.navCtrl.pop();
  };

  ionViewWillUnload(){
    // console.log('界面离开销毁publish,避免重复注册');
    // this.events.unsubscribe('customLocation');
  }

  mTouch(event){
    let positionX = event.pageX || event.touches[0].pageX;
    let positioinY = event.pageY || event.touches[0].pageY;
    let ele = document.elementFromPoint(positionX,positioinY);

    if(!ele){
      return;
    }
    let txt = ele.innerHTML.trim();
    if(!txt || txt == "" || txt.length!=1){
      return;
    }
    this.hint = txt;
    console.log(txt);

    let hintOffset = document.getElementById('city_'+this.hint).offsetTop;
    this.content.scrollTo(0,hintOffset,300);
    this.showHint = false;
    setTimeout(()=> {
      this.showHint = true;
    },500)
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

  ngOnInit(){
    // debugger
    for(let i = 0; i< this.chars.length; i++){
      this.indexs.push(this.chars.charAt(i));
    }
    this.getHotCityInfo();
    this.getCityInfo();
  };

}
