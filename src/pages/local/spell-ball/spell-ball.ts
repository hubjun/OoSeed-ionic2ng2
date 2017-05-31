///<reference path="../../../../node_modules/@angular/core/src/facade/async.d.ts"/>
/**
 * Created by baoww on 2017/4/6.
 */
import { Component,Input} from '@angular/core';
import {NavController, NavParams, Events} from "ionic-angular";import {localDetailInner} from "./spell-ball-detail";
import {ToolsService} from "../../../providers/ToolsService";
import {MatchDatailPage } from '../../me/my-team/team-homepage/schedule/match-detail';
import {LocalService} from "../local.service";
import { Subscription } from "rxjs";
import {PersonalHomepagePage} from "../../personal-homepage/personal-homepage";

declare var AMap: any;//声明
declare var $;
@Component({
    selector: 'spell-ball-channel',
    templateUrl: './spell-ball.html',
})

export class SpellBallPage {
    public defaulticon = 'assets/icon/concern_default_head.png';
    public teamDataDetialPub:any[]=[];
    public params:any;
    public paramsChange:any;
    public spellMissingShow:string;
    subscription: Subscription = new Subscription();
    public locationDistance:string;
    public noData:any;


    @Input() myActivities:string;

    public filterTypes = {
      sortType: [{
        id: 1,
        title: "默认"
      }, {
        id: 2,
        title: "费用低到高"
      }, {
        id: 3,
        title: "开始时间"
      }, {
        id: 4,
        title: "最新发布"
      }]
    };
    constructor(
      public navCtrl:NavController,
      public navParams:NavParams,
      public events:Events,
      public localService: LocalService,
      private toolsService: ToolsService
    ) {
      //按排序规则排序
      this.subscription.add(
        this.localService.filterResults.subscribe((filterResults: any) => {
          this.filterFun(filterResults);
        }),
      );
      if(!localStorage.getItem('cityInfo')){
        this.subscription.add(
          this.localService.loadDataByParentId.subscribe((cityInfo)=>{//获取当前城市信息
            localStorage.setItem('cityInfo',cityInfo);
            this.localService.postPara.subscribe((obj)=>{//获取经纬度
              this.useCommon(cityInfo,obj);
            })
          })
       )
      }
    }

    ngOnInit(){
      this.spellMissingShow='hide';
      // if(this.localService.markPara=='0'){
      //   this.localService.getLonLatt();
      // }
      this.toolsService.showLoading();

      if(localStorage.getItem('cityInfo')){
        if(this.localService.coor.long!=0){
          this.useCommon(localStorage.getItem('cityInfo'),this.localService.coor);
        }
        if(this.localService.coor.long==0){
          this.subscription.add(
            this.localService.postPara.subscribe((obj)=> {
              this.useCommon(localStorage.getItem('cityInfo'),obj);
            })
          )
        }
      }

      //我参与的拼球
      if(this.myActivities=='activities'){
          this.localService.getLonLatt();
        this.subscription.add(
          this.localService.postPara.subscribe((obj)=>{
            this.useCommon('',obj);
          })
        )
      }

    }

    ngOnDestroy() {
      //取消订阅
      this.subscription.unsubscribe();
    }

    //调用请求
    useCommon(cityInfo,obj:any){
      //按默认选项排序
      if(this.myActivities=='activities'){
          this.paramsChange = {
            longitude: this.localService.coor.long,
            latitude: this.localService.coor.lat,
            userId: localStorage.getItem('userid'),
            page:1,
            rows: 20,
          };
          this.params=this.paramsChange;
          this.SpellBallPageCompetition(this.params,this.myActivities);
          this.localService.filterTypes.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则
      }
      if(this.myActivities=='spellAll'){
          if(this.localService.cacheOtherChannelFilterResult){
              let takeResult=this.localService.cacheOtherChannelFilterResult;
            this.paramsChange = {
              sportType:takeResult.sportType==1?'':takeResult.sportType,
              orderId:'',
              cityId:takeResult.rangType==1?takeResult.areaId:'',
              raidus:takeResult.rangType==2?50000:'',
              areaId:takeResult.rangType==3?takeResult.areaId:'',
              longitude: obj.long,
              latitude: obj.lat,
              page:1,
              rows: 10
            };
          }else{
            this.paramsChange = {
              sportType:'',
              orderId:'',
              cityId:this.localService.parentId,
              longitude: obj.long,
              latitude: obj.lat,
              page:1,
              rows: 10
            };
          }
            this.params=this.paramsChange;
            if(this.localService.coor.long==0&&this.localService.coor.lat==0){
              this.toolsService.presentConfirm('定位失败');
              this.locationDistance='未知';
            }
            this.SpellBallPageCompetition(this.params,this.myActivities);
            this.localService.filterTypes.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则
      }
    }
    //查询同城拼球列表
    SpellBallPageCompetition(params: any,myActivities) {
      this.toolsService.showLoading();
      this.subscription.add(
        this.localService.getTeamCardInfo(params,myActivities).subscribe((res) => {
          if(res.result==0){
            if(res.data.list){
              for(let i=0;i<res.data.list.length;i++){
                if(!res.data.list[i].iconUrl){
                  res.data.list[i].iconUrl=this.defaulticon;
                }
              }
              this.teamDataDetialPub=res.data.list;
            }
            if(res.data.list.length==0){
              this.noData=0;
            }
            this.toolsService.hideLoading();
          }
        })
      )
    }

  //过滤筛选调用拼球
  filterFun(filterResults){
    this.paramsChange = {
      sportType:'',
      orderId: '',
      cityId: filterResults.rangType,
      longitude: this.localService.coor.long,
      latitude: this.localService.coor.lat,
      page:1,
      rows: 10,
    };
    //判断筛选条件
    this.paramsChange = {
      sportType: filterResults.sportType == 1 ? '' : filterResults.sportType,
      orderId: filterResults.sortType == 1 ? '' : filterResults.sortType == 2 ? 1 : filterResults.sortType == 3 ? 2 : 3,
      cityId: filterResults.rangType == 1 ? filterResults.areaId : '',
      raidus: filterResults.rangType == 2 ? 50000 : '',
      areaId: filterResults.rangType == 3 ? filterResults.areaId : '',
      longitude: this.localService.coor.long,
      latitude: this.localService.coor.lat,
      page: 1,
      rows: 10,
    };
    this.SpellBallPageCompetition(this.paramsChange,this.myActivities);
  }

    TipCommon(){
      this.toolsService.presentConfirm();
    }

    goToSpellDetail(fightId){
      this.navCtrl.push(localDetailInner,{
          "fightId":fightId
      })
    }

    goPersonalPage(userid:string){
      this.navCtrl.push(PersonalHomepagePage,{
        'userid':userid
      })
    }
    goDetail(id: number) {
      this.navCtrl.push(MatchDatailPage, {
        "id": id
      });
    }

}
