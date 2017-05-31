import { Component,Input } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { RecruitDetailPage } from './recruit-detail';
import { LocalService } from "../local.service";
import { ToolsService } from "../../../providers/ToolsService";
import { Subscription } from "rxjs";

@Component({
  selector: 'recruitment-list',
  templateUrl: './recruit-list.html'
})

export class RecruitListPage {
  private recruitObj: any[]=[];
  private weekSet: any[]=[];
  private noData: boolean = false;
  public defaulticon = 'assets/icon/concern_default_head.png';

  subscription: Subscription = new Subscription();
  // public filterTypes = {
  //   sortType: [{
  //     id: '',
  //     title: "默认"
  //   }, {
  //     id: 1,
  //     title: "即将截止"
  //   }, {
  //     id: 2,
  //     title: "最新发布"
  //   }]
  // };

  private params = {
    sportType:null,
    rangType: 1,
    sortType: null,
    areaId: null,
    longitude: this.localService.coor.long,
    latitude: this.localService.coor.lat,
    pages: 1,
    rows: 10
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private tools: ToolsService,
    private events: Events
  ) {

    //组件默认排序规则
    this.subscription.add(
      this.localService.filterResults.subscribe((filterResults: any) => {
        // debugger
        console.log(filterResults);
        let params = this.params;
        if (filterResults.sportType === 1) {
          //全部球类
          params.sportType = null;
        }
        else {
          params.sportType = filterResults.sportType;
        }

        // if (filterResults.sportType !== 0 && filterResults.sportType !== null) {
        //   Object.assign(params, {
        //     "sportType": filterResults.sportType
        //     // params.sortType = filterResults.sportType
        //   })
        // }
        if(filterResults.sortType == 1){
          params.sortType = null;
        }else if(filterResults.sortType == 2){
          params.sortType = 1;
        }else if(filterResults.sortType == 3){
          params.sortType = 2;
        }
         // console.log(params);
        if(filterResults.rangType == 2){
          params.areaId = null;
        }
        else{
          params.areaId = filterResults.areaId;
        }
        params.rangType = filterResults.rangType;
        // params.sortType = filterResults.sortType;

        this.getRecruitListInfo(params);
        // this.localService.filterTypes.emit(this.filterTypes);
      })

    );

  }

  goRecruitDetail(id){
    this.navCtrl.push(RecruitDetailPage, {
      recruitID: id
    });
  };

  getRecruitListInfo(params) {
    console.log('find here');
    this.localService.getRecruitList(params)
      .subscribe(res => {
        if (res.result === '0') {
          // console.log(res);
          this.recruitObj = res.data.list;
          if(res.data.list.length == 0){
            this.noData = true;
          }
        }else {
          this.tools.tips(res.msg,2000);
        }
    })
  }

  tips(){
    // this.tools.showAlert('提 示','请登录APP做进一步操作~','确 定');
    this.tools.presentConfirm();
  };

  ngOnInit(){
    let params=this.params;
    let cacheFilterResult = this.localService.cacheOtherChannelFilterResult;
        if (cacheFilterResult !== undefined) {
            if (cacheFilterResult.sportType === 1) {
                //全部球类
                params.sportType = null;
            }
            else {
                params.sportType = cacheFilterResult.sportType;
            }
            params.areaId = cacheFilterResult.areaId;
            params.rangType = cacheFilterResult.rangType;
            this.getRecruitListInfo(this.params);
        }
        else {
            params.areaId = this.localService.parentId;
          this.getRecruitListInfo(this.params);
        }

  };

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
