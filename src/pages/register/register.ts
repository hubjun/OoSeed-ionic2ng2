/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetPasswordPage } from './set-password/set-password';
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { ToolsService } from "../../providers/ToolsService";
import { ValidationService } from "../../providers/ValidatorService";
import { UserActivityService } from '../../providers/UserActivityService';
import {Subscription} from "rxjs";
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserActivityService, ToolsService]
})
export class RegisterPage {
  private registerForm: FormGroup;
  private account: AbstractControl;//手机号
  private verifyCode: AbstractControl;//验证码
  private isRegister: boolean = false //是否已注册
  private timer: string = '发送验证码';
  subscription:Subscription = new Subscription();
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public tools:ToolsService,
    public userActicityService: UserActivityService
  ) {
    this.registerForm = this.formBuilder.group({
      'account': ['',[Validators.required,ValidationService.accountValidator]],
      'verifyCode': ['', [Validators.required]]
    })
  }
  //获取短信验证码
  getSMSCode() {
    let SMSCode = {
      phone: this.registerForm.value.account,
      operateType: '1'
    }
    this.userActicityService.getSMSCode(SMSCode).subscribe((res) => {
      if (res.result === '0') {
        this.SMSCodeCountDown(60)
        return false;
      } else{
        this.tools.showStatusCodeMsg(res.result)
      }
    })
  }
  //前往设置密码
  goSetPassword() {
    //核实验证码
    let form = this.registerForm.value;
    let validateSMSCode = {
      validateMsg: form.verifyCode,
      validateType: '5',
      somethingStr:form.account,
      operateType:'1'
    };
    this.subscription.add(
      this.userActicityService.checkSMSCode(validateSMSCode).subscribe((res) => {
        if (res.result === '0') {
          this.navCtrl.push(SetPasswordPage, {
            code: form.verifyCode,
            phone: form.account
          })

          return false;
        }


        this.tools.showStatusCodeMsg(res.result)

      })
    );
  }
  //发送验证码倒计时
  SMSCodeCountDown(second: number) {
    if (second !== 0) {
      // e.target.preventDefault()
      this.timer = `${second--}秒`
      setTimeout(() => {
        this.SMSCodeCountDown(second)
      }, 1000)
    }
    else {
      this.timer = '发送验证码'
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
