import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { EditNamePage } from './edit-name';
import { SignaturePage } from './signature';
import { BallInfoPage } from './ball-info';
import { UserInfoService } from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";
// import { FileUploader } from 'ng2-file-upload';
import { convertArrayToColumn } from '../../../components/util';
import { MeService } from '../me.service';

// enum Fruit {
//   Apple, Orange, Melon, Banana, Pear,
// }

@Component({
  selector: 'page-edit-info',
  templateUrl: 'edit-info.html',
  providers: [UserInfoService,ToolsService]
})

export class EditInfoPage {
  conferenceDate = '26';
  userObj;
  userInfo;
  signText: string;
  userAge: any;

  fruits: any[];
  fruit: any[] = [];
  heights: any[];
  height: any[] = [];
  weights: any[];
  weight: any[] = [];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public userService: UserInfoService,
    public meService: MeService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private el: ElementRef,
    public tools:ToolsService
  ) {
    this.userObj = navParams.get('userObj');
    this.userAge = navParams.get('userAge');
  }

  ionViewDidEnter() {
    this.getUserInfo();
  };

  backToVideos() {
    this.nav.pop();
  };

  setNickName() {
    this.nav.push(EditNamePage);
  };

  setSignature() {
    this.nav.push(SignaturePage);
  };

  //编辑足球个人信息
  setBallInfo() {
    this.nav.push(BallInfoPage, {
      authStatus: this.userObj.authDesc
    });
  };



  selectFileOnchanged(e) {

    let file = e.target.files[0];
    this.meService.updateAvatar(file).subscribe((res) => {
      let reader = new FileReader();
      reader.onload = (r: any) => {
        this.userObj.iconUrl = r.target.result;
      };
      reader.readAsDataURL(file);

      if(res.result === '0'){
        this.tools.tips('上传成功',null);
      }else {
        this.tools.tips('上传失败',null);
      }
    })
  };

  setGender() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择性别',
      buttons: [
        {
          text: '男',
          role: 'destructive',
          handler: () => {
            let opt = {
              sex: 1
            };
            this.userService.update(opt)
              .subscribe(rs => {
                if(rs.result === '0'){
                  this.userObj.genderDesc = '男';
                  this.tools.tips('更新成功',null);
                }else {
                  this.tools.tips('网络错误',null);
                }
              })
          }
        }, {
          text: '女',
          handler: () => {
            let opt = {
              sex: 2
            };
            this.userService.update(opt)
              .subscribe(rs => {
                if(rs.result === '0'){
                  this.userObj.genderDesc = '女';
                  this.tools.tips('更新成功',null);
                }else {
                  this.tools.tips('网络错误',null);
                }
              })
          }
        }, {
          text: '保密',
          handler: () => {
            let opt = {
              sex: 3
            };
            this.userService.update(opt)
              .subscribe(rs => {
                if(rs.result === '0'){
                  this.userObj.genderDesc = '保密';
                  this.tools.tips('更新成功',null);
                }else {
                  this.tools.tips('网络错误',null);
                }
              })
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  createAgePicker() {
    for (let i = 0; i < 100; i++) {
      const cons = i;
      this.fruit.push(cons);
    }


    this.fruits = convertArrayToColumn(this.fruit, 1);
  };

  createHeightPicker() {
    for (let i = 1; i < 251; i++) {
      const cons = i;
      this.height.push(cons);
      this.weight.push(cons);
    }
    this.heights = convertArrayToColumn(this.height, 2);
    this.weights = convertArrayToColumn(this.weight, 3);
  };

  ageChange(event) {
    let opt = {
      userAge: event[0].value
    };
    // this.userAge = event[0].value;

    this.userService.update(opt)
      .subscribe(rs => {
        this.tools.tips('更新成功',null);
      })
  };

  heightChange(event) {
    let opt = {
      height: event[0].text
    };
    this.userService.update(opt)
      .subscribe(rs => {
        this.tools.tips('更新成功',null);
      })
  };

  weightChange(event) {
    let opt = {
      weight: event[0].text
    };
    this.userService.update(opt)
      .subscribe(rs => {
        this.tools.tips('更新成功',null);
      })
  };

  getUserInfo() {
    this.userService.getUserInfo('')
      .subscribe(rs => {
        if(rs.result === '0'){
          // if(rs.data.sex  == 1){
          //   this.isMan = true;
          // }
          // else if(rs.data.sex == 2){
          //   this.isMan = false;
          // }
          // if(rs.data.authStatus == 0){
          //   this.isAuthentic = true;
          // }
          // rs.data.genderDesc = this.userService.fieldMap().genderMap[rs.data.sex];
          // rs.data.authDesc = this.userService.fieldMap().authMap[rs.data.authStatus];
          this.userInfo = rs.data;
          this.signText = rs.data.sign;
          // this.userAge = rs.data.userAge;
          this.fruit = rs.data.userAge;
          this.height = rs.data.height;
          this.weight = rs.data.weight;
        }else {
          return;
        }
      })

  };

  ngOnInit() {
    this.getUserInfo();
    this.createAgePicker();
    this.createHeightPicker();
  };
}
