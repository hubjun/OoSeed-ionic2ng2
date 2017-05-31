import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticePage } from './notice';
import { LikePage } from './like';
import { AtMePage } from './at-me';

@Component({
  selector: 'page-notice-list',
  templateUrl: 'notice-list.html'
})
export class NoticeListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  goNotice() {
    this.navCtrl.push(NoticePage);
  };

  goAtMe(){
    this.navCtrl.push(AtMePage);
  };

  goDiggMe(){
    this.navCtrl.push(LikePage);
  };

}
