/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from '../../../providers/ValidatorService';
import { UserActivityService } from '../../../providers/UserActivityService';
import { ToolsService } from '../../../providers/ToolsService';
import { TabsPage } from '../../tabs/tabs';
import {Subscription} from "rxjs";
import {LoginPage} from "../../login/login";

@Component({
  selector: 'page-nick-name',
  templateUrl: 'nick-name.html'
})
export class SetNickNamePage {
  nickNameForm: FormGroup;
  subscription:Subscription = new Subscription();
  constructor(
    public navCtrl: NavController,
    public formBuider: FormBuilder,
    public userActivityService: UserActivityService,
    public tools: ToolsService
  ) {
    this.nickNameForm = this.formBuider.group({
      'nickName': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15), ValidationService.nickNameValidator]]
    })
  }
  //设置昵称
  setNickName() {
    let data = this.tools.param(this.nickNameForm.value.nickName);
    this.subscription.add(
      this.userActivityService.setNickname(data).subscribe((res) => {
        if (res.result === '0') {
          this.tools.showToast('注册成功正在跳转至登录页面...',1000);
          setTimeout(() => {
            this.navCtrl.push(LoginPage)
          },1500)
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
