/**
 * Created by 陈文豪 on 2017/1/9.
 */
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import {NavController, ViewController, LoadingController, Loading, NavParams, App} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {FindPasswordPage} from "./find-password/find-password";
import {ValidationService} from '../../providers/ValidatorService';
import {UserDataService} from "../../providers/UserDataSevice";
import {UserActivityService} from "../../providers/UserActivityService";
import {TabsPage} from "../tabs/tabs";
import {ToolsService} from "../../providers/ToolsService";
import {Subscription} from "rxjs";
import {HomePage} from "../home/home";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserActivityService,ToolsService]
})
export class LoginPage {
  loading: Loading;
  loginForm: FormGroup;
  account:AbstractControl;
  password:AbstractControl;
  public userid:string;
  public token:string;
  subscription:Subscription = new Subscription();
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private userData: UserDataService,
    private user: UserActivityService,
    public tools:ToolsService,
    public params:NavParams,
    public app:App,
  ) {
    this.loginForm = this.formBuilder.group({
      'account': ['',[Validators.required,ValidationService.accountValidator]],
      'loginPwd':['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
    });
  }


  login(){
    this.tools.showLoading();
    let data = this.loginForm.value;
    data.loginPwd = this.tools.encryption(data.loginPwd);
    this.subscription.add(
      this.user.login(data).subscribe((res) => {

        if(!res || !res.result )
          return;
        if(res.result == 13 || res.result == 11){
          this.tools.hideLoading();
          this.tools.showToast('登录名或者密码错误',800);
        }else if(res.result == 0 && res.data){
          this.userData.login(res.data.userId,res.data.token,res.data.refreshToken);
          this.tools.hideLoading();
          window.location.reload();
          //this.navCtrl.setRoot(TabsPage)
          //this.app.getRootNav().setRoot(HomePage);
        }else {
          this.tools.showToast('登录出错请刷新后重试',800);
        }
      })
    )

  }
  closeLoginPage() {
    window.location.reload();
  }


  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  goToPage (){
    this.navCtrl.push(RegisterPage);
  }


  logOut(){
    this.userData.logout();
  }
  goToForgetPage() {
    this.navCtrl.push(FindPasswordPage);
  }

  ionViewCanLeave(): boolean{
    this.closeLoginPage();
    return true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
