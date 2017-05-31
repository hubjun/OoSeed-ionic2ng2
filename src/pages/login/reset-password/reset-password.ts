/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../../home/home";

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController) {

  }

  goToPage(){
    this.navCtrl.setRoot(HomePage)
  }

}
