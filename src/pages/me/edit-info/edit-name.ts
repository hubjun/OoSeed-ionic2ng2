import { Component,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserInfoService } from '../../../providers/UserInfoService';
import {ToolsService} from "../../../providers/ToolsService";

@Component({
  selector: 'page-edit-name',
  templateUrl: 'edit-name.html',
  providers: [UserInfoService,ToolsService]
})
export class EditNamePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserInfoService,
    private tools: ToolsService,
    private el: ElementRef
  ) {}

  save(name: string){
    // debugger
    if(name.trim() == '' || null){
      this.tools.tips('呢称不能是空哦',null);
      return false;
    }
    let opt = {
      nickName : name
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
