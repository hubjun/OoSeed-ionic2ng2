/**
 * Created by 陈文豪 on 2017/1/9.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ResetPasswordPage} from "../reset-password/reset-password";
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html'
})
export class FindPasswordPage {

  constructor(public navCtrl: NavController) {

  }

  goToPage() {
    this.navCtrl.push(ResetPasswordPage)
  }
}
