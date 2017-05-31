import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserInfoService } from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
  providers: [UserInfoService,ToolsService]
})
export class SignaturePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserInfoService,
    private tools: ToolsService
  ) {}

  save(signText: string){
    if(signText.trim() == '' || null){
      this.tools.tips('签名不能是空哦',null);
      return false;
    };
    let opt = {
      sign: signText
    };
    this.userService.update(opt)
      .subscribe(rs => {
        if(rs.result === '0'){
          this.tools.tips('更新成功',null);
          setTimeout(()=> {
            this.navCtrl.pop();
          },1500);
        }else {
          return;
        }
      })
  };

}
