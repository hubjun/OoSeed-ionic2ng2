import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, ModalController, LoadingController } from 'ionic-angular';
import { JobHistoryPage } from '../job-history';
import { BallLocation } from '../modal-tpl/ballLocation';
import { UserInfoService } from '../../../providers/UserInfoService';
import { BallAbilityPage } from '../modal-tpl/ball-ability';
import { convertArrayToColumn } from '../../../components/util';
import {ToolsService} from "../../../providers/ToolsService";

@Component({
  selector: 'page-ball-info',
  templateUrl: 'ball-info.html',
  providers: [UserInfoService,ToolsService]
})

export class BallInfoPage {
  authDesc: string;
  hahit: string = '';
  location: string = '';
  ability: string = '';
  //惯用脚attr
  legeAttr: any = 16;
  //运动类型：足球3001
  sportType: number = 3001;

  postBallage: number;
  setBallage: number;
  ageArray: any[] = [];
  ageArrays: any[] = [];

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public modalCtrl:ModalController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private userService: UserInfoService,
    public tools:ToolsService
  ) {
    this.authDesc = navParams.get('authStatus');
  }

  checkJobHistory(){
    this.nav.push(JobHistoryPage);
  };

  ageChange(event){
    let opt = {
      ballAge : event[0].value,
      sportType: this.sportType
    };
    this.userService.putBallLocation(opt)
      .subscribe(rs => {
        if(rs.result === '0'){
          this.setBallage = event[0].value;
        }
      })
  };

  getUserBallInfo(){
    let footballId = '0';
    this.userService.getBallInfo(footballId)
      .subscribe(rs => {
        // debugger
        if(rs.result === '0'){

          this.ageArray = rs.data.ballAge;
          this.postBallage = rs.data.ballAge;
          let attrsObj = rs.data.attrs;
          // if(attrsObj != '' || attrsObj != 'undefined'){
          if(typeof(attrsObj) !== 'undefined'){
            for(let i = 0; i < attrsObj.length; i++) {
              //场上位置
              if (attrsObj[i].attr == 17) {
                this.location += attrsObj[i].lableName + ',';
              }
              //能力特征
              else if (attrsObj[i].attr == 18) {
                this.ability += attrsObj[i].lableName + ',';
              }
              //惯用脚
              else if (attrsObj[i].attr == 16) {
                this.hahit = attrsObj[i].lableName;
              }

            }
          }else {
            return;
          }

        }else if(rs.result === '2'){
          this.tools.tips('系统数据异常',null);
        }else {
          return;
        }

      })
  };

  openModal() {
    let modal = this.modalCtrl.create(BallLocation,{
      ballage: this.postBallage
    });
    modal.present();
  }

  openAbilityModal(){
    let modal = this.modalCtrl.create(BallAbilityPage,{
      ballage: this.postBallage
    });
    modal.present();
  };

  selectLeg(even){
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择');

    alert.addInput({
      type: 'radio',
      label: '左脚',
      value: '16001',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '右脚',
      value: '16002',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '双足',
      value: '16003',
      checked: false
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: attrs => {
        var temp = [{
          attr: this.legeAttr,
          lableId: attrs
        }];
        // this.legeAttr
        let params = {
          sportType: this.sportType,
          attrs: temp,
          ballAge: this.ageArray
        };

        this.userService.putBallLocation(params)
          .subscribe(rs => {
            if(rs.result == 0){
              this.tools.tips('更新成功','');
              // this.getUserBallInfo();
            }else {
              this.tools.tips('更新失败','');
            }
          })
      }
    });
    alert.present({ev:even});
  };

  createAgePicker() {
    for (let i = 0; i < 100; i++) {
      const cons = i;
      this.ageArray.push(cons);
    }


    this.ageArrays = convertArrayToColumn(this.ageArray, 1);
  };

  ngAfterViewInit(){
  };
  // submitBallInfo(){};

  ngOnInit(){
    this.getUserBallInfo();
    this.createAgePicker();
  };
}

