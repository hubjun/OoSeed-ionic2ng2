import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import {UserInfoService} from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";

@Component({
  selector: 'page-modal-tpl',
  templateUrl: 'ballLocation.html',
  providers: [UserInfoService,ToolsService]
})

export class BallLocation {
  locationObj: any [] = [];
  //场上位置attr
  locaAttr: any = 17;
  ballAge: number;
  //运动类型：足球3001
  sportType: number = 3001;
  tempIds: any [] = [];
  attrs = {};
  arr = [];

  constructor(
    private userSerivece: UserInfoService,
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public tools:ToolsService
  ) {
    this.ballAge = this.navParams.get('ballage');
    this.attrs['ballAge'] = this.ballAge;
    this.attrs['sportType'] = this.sportType;
    this.attrs['attrs'] = {};
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  loadingTips(msg) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: msg,
      duration: 1500
    });
    loading.onDidDismiss(() => {
    });

    loading.present();
  }

  containsId(id){
    return _.indexOf(this.tempIds,id) !== -1;
  };
  // selectItems(e,item){
  //   //添加样式
  //   if(this.containsId(item.id)){
  //     _.pull(this.tempIds,item.id);
  //   }else{
  //     this.tempIds.push(item.id);
  //   }
  //   console.log('select id: '+this.tempIds);
  // };

  selectItems(e,item){
    //添加样式
    let obj = {
      attr:'',
      lableId:''
    };
    if(this.containsId(item.id)){
      for(let i = 0;i< this.tempIds.length; i++){
        if(this.tempIds[i] == item.id){
          this.arr.splice(i,1)
        }
      }
      _.pull(this.tempIds,item.id);
    }else{
      if(this.tempIds.length > 1){
        this.tools.tips('最多可选2个位置哦',null);
        return false;
      }
      this.tempIds.push(item.id);
      obj.attr = '17';
      obj.lableId = item.id;
      this.arr.push(obj)
    }
    this.attrs['attrs'] = this.arr;

  };

  getlocationInfo(){
    this.userSerivece.getBallLocation()
      .subscribe(rs => {
        if(rs.result == 0){
          // debugger
          this.locationObj = rs.data.dicts;
          // this.sportType = rs.data.sportAttributeVOList[0].sportType;
        }else {
          this.tools.tips('网络错误', '');
        }
      })
  };

  onInfoSubmit(){
    // debugger
    let temId = this.tempIds;
    if(temId.length){
      // return;
    }else{
      this.tools.tips('请选择场上位置','');
      return false;
    }

    this.userSerivece.putBallLocation(this.attrs)
      // .then(rs => {})
      .subscribe(rs => {
        if(rs.result == 0){
          this.tools.tips('更新成功',null);
          this.getlocationInfo();
        }else {
          this.tools.tips('更新失败',null);
        }
      });
    this.viewCtrl.dismiss();

  };

  ngOnInit(){
    this.getlocationInfo();
  };

}
