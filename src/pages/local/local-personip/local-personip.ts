/**
 * Created by dell on 2017/4/5.
 */
import { Component, OnInit,Input } from '@angular/core';
import { LocalService } from "../local.service";
import {NavController, NavParams, Events} from "ionic-angular";
import { Subscription } from "rxjs";
import { ToolsService } from '../../../providers/ToolsService';
import {PersonalHomepagePage} from "../../personal-homepage/personal-homepage";
@Component({
  selector: 'local-person-ip',
  templateUrl: 'local-personip.html'
})

export class  LocalPersonIp {
  @Input() personIpList:any[];
  private subscription: Subscription = new Subscription();
  public p_hasmore:boolean=true;
  public filterTypes = {
    userType:[],
    sortType: [{
      id: 1,
      title: "不限男女"
    }, {
      id: 2,
      title: "男"
    }, {
      id: 3,
      title: "女"
    }]
  };
  private ifnull=false;
  public personipdata = {
    rangType: 1,
    areaId: 11959,
    longitude: null,
    latitude: null,
    page:1,
    rows: 10,
    sex:null,
    ipCateId:null
  };

  public sexlist=[null,1,2];
  public defaulticon = 'assets/icon/concern_default_head.png';
  constructor(
    public localService: LocalService,public ToolsService: ToolsService,public navCtrl:NavController
  ){
    this.subscription.add(
    this.localService.personIpScroll.subscribe((page: any) => {
      if(!this.p_hasmore){return}
      this.personipdata.page=page.page;
      this.getPersonIp();
    })
    )

    //初始化相应栏目排序规则
    this.subscription.add(
    this.localService.filterResults.subscribe((filterTypes: any) => {
      this.ifnull=false;
      this.ToolsService.showLoading();
      this.localService.PScrollEnd.emit({ifend:false});
      this.personipdata.sex=this.sexlist[filterTypes.sortType-1];
      if(!filterTypes.userTypeId||filterTypes.userTypeId==1)
      {
        this.personipdata.ipCateId=null
      }else{
        this.personipdata.ipCateId=filterTypes.userTypeId;
      }
      this.personipdata.rangType=filterTypes.rangType;
      if(filterTypes.rangType==2){
        this.personipdata.areaId=null;
      }else{
        if(filterTypes.areaId){
          this.personipdata.areaId=filterTypes.areaId;
        }

      }
      this.personipdata.page=1;
      this.p_hasmore=true;
      this.personIpList=[];
      this.getPersonIp();
    })
    )
  }
  ToFollow(index,userid){
    this.subscription.add(
    this.localService.AddFollow(index,userid).subscribe((res) => {
      if(res.result==0){
        let list=this.personIpList[index];
        list.FollowIcon=this.localService.turnicon(1,list.isFollowedMe);
      }
    })
    )
  }
  //个人ip
  getPersonIp(infiniteScroll?:any) {
    if(this.personipdata.ipCateId==1){
      this.personipdata.ipCateId=null
    }
    this.subscription.add(
    this.localService.getPersonIp(this.personipdata).subscribe((res) => {
      if (res.result == 0&&this.p_hasmore) {
        let list=res.data.list;
        for (let i = 0; i < list.length; i++) {
          if (!list[i].iconUrl) {
            list[i].iconUrl = this.defaulticon;
          }
          if(!list[i].appImgtxtUrl){
            list[i].seeIcon=true;
          }else{list[i].seeIcon=false;}
          list[i].FollowIcon=this.localService.turnicon(list[i].isFollowed,list[i].isFollowedMe);
          if(list[i].distance<0){
            list[i].distance='未知';
            list[i].mUnit='';
          }else if(list[i].distance>1000){
            list[i].mUnit='km';
            let newdistance=list[i].distance/1000;
            if(newdistance>=999){newdistance=999}
            list[i].distance=newdistance.toFixed(1);
          }
          else {
            list[i].mUnit='m';
            list[i].distance=list[i].distance.toFixed(1);
          }
          this.personIpList.push(list[i]);
        }
        this.ToolsService.hideLoading(()=>{list.length==0?this.ifnull=true:this.ifnull=false;});
        if (!res.data.hasNextPage)
         {
           this.p_hasmore=false;
           this.localService.PScrollEnd.emit({ifend:true,length:list.length});
         }else{
            this.localService.PScrollEnd.emit({ifend:false,length:list.length})
          }
      }
    })
  )
  }

   ngOnInit() {

     let filterdata=this.localService.cacheOtherChannelFilterResult;
    this.localService.filterTypes.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则
    this.personIpList=[];

    this.localService.PScrollEnd.emit({ifend:false});
    this.ToolsService.showLoading();
     if(this.localService.coor.long==0)
     {return}
     else{
       this.personipdata.longitude=this.localService.coor.long;
       this.personipdata.latitude=this.localService.coor.lat;
     }
     if(filterdata)
     {
       this.personipdata.areaId=filterdata.areaId;
       this.personipdata.rangType=filterdata.rangType;
       filterdata.userTypeId?this.personipdata.ipCateId=filterdata.userTypeId:'';
     }else {
       if(this.localService.parentId)
       {
         this.personipdata.areaId=this.localService.parentId;
       }
     }
     this.getPersonIp();

  }
  goPersonalPage(userid:string){
    this.navCtrl.push(PersonalHomepagePage,{
      'userid':userid
    })
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
