/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetNickNamePage } from "../set-nickname/set-nickname";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../providers/ValidatorService';
import { UserActivityService } from '../../../providers/UserActivityService';
import { ToolsService } from '../../../providers/ToolsService';
import {Subscription} from "rxjs";

@Component({
  selector: 'page-set-password',
  templateUrl: 'set-password.html'
})
export class SetPasswordPage {
  private passwordForm: FormGroup;
  private password: AbstractControl;
  private repassword: AbstractControl;
  private register;
  subscription:Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public formBuilder: FormBuilder,
    public userActivityService: UserActivityService,
    public tools: ToolsService
  ) {
    this.passwordForm = this.formBuilder.group({
      'password': ['', [Validators.required ,Validators.minLength(6),Validators.maxLength(16)]],
      'repassword': ['', [Validators.required]]
    }, {validator: ValidationService.matchingPasswords('password', 'repassword')})
  }
  onRegister() {
    let password = this.tools.encryption(this.passwordForm.value.password)
    this.register = {
      account: this.params.get('phone'),
      loginPwd: password,//加密密码
      accountType: '2',
      operateType: '1',
      smsCode: this.params.get('code')
    };
    this.subscription.add(
      this.userActivityService.register(this.register).subscribe((res) => {
        if (res.result === '0') {
          this.navCtrl.push(SetNickNamePage) //前往设置昵称
        }

        this.tools.showToast(res.msg, 1000)
      })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
