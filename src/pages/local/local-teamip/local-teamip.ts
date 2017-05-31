/**
 * Created by dell on 2017/4/7.
 */
import { Component,Input } from '@angular/core';
import { LocalService } from '../local.service';
import { NavParams,NavController} from 'ionic-angular';
import { ToolsService } from '../../../providers/ToolsService';
import { Subscription } from "rxjs";
import { TeamDetailPage } from '../../me/my-team/team-homepage/team-detail';

@Component({
  selector: 'local-team-ip',
  templateUrl: 'local-teamip.html',
  providers: [TeamDetailPage]
})
export class  LocalTeamIp {
  @Input() teamIpList:any[];
  public hasmore:boolean=true;
  private subscription: Subscription = new Subscription();
  public defaulticon = 'assets/icon/concern_default_head.png';
  public filterTypes = {
    rangType: [{
      id: 1,
      title: "城市"
    }, {
      id: 2,
      title: "附近"
    }, {
      id: 3,
      title: "区县"
    }],
    sortType: [{
      id: null,
      title: "全部"
    }, {
      id: 2003,
      title: "11人制"
    }, {
      id: 2002,
      title: "6-8人制"
    }, {
      id: 2001,
      title: "3-5人制"
    }]
  }
  private ifnull=false;
  public teamipdata = {
    rangType: 1,
    areaId:11959,
    longitude: null,
    latitude: null,
    pages: 1,
    rows:10,
    formatId:null,
    sportType:null
  };
  constructor(public localService: LocalService,public ToolsService: ToolsService,public TeamDetailPage:TeamDetailPage,public nav:NavController)
  {
    this.subscription.add(
    this.localService.teamIpScroll.subscribe((page: any) => {
      if(!this.hasmore){return}
      this.teamipdata.pages=page.page;
      this.getteamip();
    })
    )
    //初始化相应栏目排序规则
    this.subscription.add(
    this.localService.filterResults.subscribe((filterTypes: any) => {
      this.ifnull=false;
      this.ToolsService.showLoading();
      this.localService.TScrollEnd.emit({ifend:false});
      if(filterTypes.sortType!=1)
      {
        this.teamipdata.formatId=filterTypes.sortType;
      }else{
        this.teamipdata.formatId=null;
      }
      if(filterTypes.sportType==''||filterTypes.sportType==1)
      {
        this.teamipdata.sportType=null;
      }else{
        this.teamipdata.sportType=filterTypes.sportType;
      }
      if(filterTypes.rangType==2){
        this.teamipdata.areaId=null;
      }else{
        this.teamipdata.areaId=filterTypes.areaId;
      }
      this.teamipdata.rangType=filterTypes.rangType;
      this.teamipdata.pages=1;
      this.hasmore=true;
      this.teamIpList=[];
      this.getteamip();
    })
    )
  }
  ToFollow(index,userid){
    this.subscription.add(
    this.localService.AddFollow(index,userid).subscribe((res) => {
      if(res.result==0){
        let list=this.teamIpList[index];
        list.FollowIcon=this.localService.teamFollowicon(list.gradeFollow);
      }
    })
    )
    }
  //推荐球队ip列表
  getteamip(infiniteScroll?:any) {
    this.subscription.add(
    this.localService.getTeamIp(this.teamipdata).subscribe((res) => {
      if (res.result == 0) {
        let list=res.data.list;
          for (let i = 0; i < list.length; i++) {
            if (!list[i].iconFileUrl || list[i].iconUrl == '') {
              list[i].iconFileUrl = this.defaulticon;
            }
            if(!list[i].gradeIconUrl){
              list[i].seeIcon=true;
            }else{list[i].seeIcon=false;}
            list[i].FollowIcon=this.localService.teamipturnicon(list[i].gradeFollow);
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
            this.teamIpList.push(list[i]);
          }
        this.ToolsService.hideLoading(()=>{list.length==0?this.ifnull=true:this.ifnull=false;});
          if (!res.data.hasNextPage) {this.hasmore=false; this.localService.TScrollEnd.emit({ifend:true,length:list.length});}
          else{
            this.localService.TScrollEnd.emit({ifend:false,length:list.length})
          }
      }
    })
    )
  }
  goteamdetail(id){
    this.nav.push(TeamDetailPage,{
      id:id
    })
  }
  ngOnInit() {
    let filterdata=this.localService.cacheOtherChannelFilterResult;
    this.teamIpList=[];
    this.localService.filterTypes.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则
    this.localService.TScrollEnd.emit({ifend:false});
    this.ToolsService.showLoading();
    if(filterdata)
    {
      this.teamipdata.areaId=filterdata.areaId;
      filterdata.sportType!=1?this.teamipdata.sportType=filterdata.sportType:'';
      this.teamipdata.rangType=filterdata.rangType;
    }else {
      if(this.localService.parentId)
      {
        this.teamipdata.areaId=this.localService.parentId;
      }
    }


    if(this.localService.coor.long==0)
    {return}
    else{
      this.teamipdata.longitude=this.localService.coor.long;
      this.teamipdata.latitude=this.localService.coor.lat;
    }

    this.getteamip();
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
