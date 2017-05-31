import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import {UserInfoService} from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";

@Component({
  selector: 'page-ball-ability',
  templateUrl: 'ball-ability.html',
  providers: [UserInfoService, ToolsService]
})

export class BallAbilityPage {

  abilityObj: any [] = [];
  //能力特征attr
  abilityAttr: any = 18;
  //运动类型：足球3001
  sportType: number = 3001;

  ballAge: string;
  tempIds: any [] = [];
  attrsObj = {};
  array = [];

  constructor(
    private userSerivece: UserInfoService,
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public tools:ToolsService
  ) {
    this.ballAge = this.navParams.get('ballage');

    this.attrsObj['ballAge'] = this.ballAge;
    this.attrsObj['sportType'] = this.sportType;
    this.attrsObj['attrs'] = {};
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  containsId(id){
    return _.indexOf(this.tempIds,id) !== -1;
  };

  selectItems(e,item){
    let obj = {
      attr:'',
      lableId:''
    };
    //添加样式
    if(this.containsId(item.id)){
      for(let i = 0;i< this.tempIds.length; i++){
        if(this.tempIds[i] == item.id){
          this.array.splice(i,1)
        }
      }
      _.pull(this.tempIds,item.id);
    }else{
      if(this.tempIds.length > 1){
        this.tools.tips('最多可选2个位置哦',null);
        return false;
      }
      this.tempIds.push(item.id);
      obj.attr = '18';
      obj.lableId= item.id;
      this.array.push(obj);
    }
    this.attrsObj['attrs'] = this.array;
  };

  getBallAbilityInfo(){
    this.userSerivece.getBallAbility()
      .subscribe(rs => {
        if(rs.result == 0){
          // debugger
          this.abilityObj = rs.data.dicts;
          // this.sportType = rs.data.sportAttributeVOList[0].sportType;
        }else {
          this.tools.tips('数据接口异常', null);
        }
      })
  };

  onInfoSubmit(){
    let temId = this.tempIds;
    if(!temId.length){
      this.tools.tips('请选择能力特点',null);
      return false;
    }
    this.userSerivece.putBallLocation(this.attrsObj)
      .subscribe(rs => {
        if(rs.result == 0){
          this.tools.tips('更新成功','');
          this.getBallAbilityInfo();
        }else {
          this.tools.tips('更新失败','');
        }
      });
    this.viewCtrl.dismiss();
  };

  ngOnInit(){
    this.getBallAbilityInfo();
  };

}
