import {Component,ViewChild} from '@angular/core';
import {NavParams,Tabs} from 'ionic-angular';

import {HomePage} from '../home/home';
import {VideosPage} from '../videos/videos';
import {ReleasePage} from '../release/release';
import {LocalPage} from '../local/local';
import {MePage} from '../me/me';
import {UserDataService} from "../../providers/UserDataSevice";
//add tabs.html if you want select
//#tabs selectedIndex={{selectTabIndex}}
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's ro


  tab1Root: any = HomePage;
  tab2Root: any = VideosPage;
  tab3Root: any = ReleasePage;
  tab4Root: any = LocalPage;
  tab5Root: any = MePage;

  isApp:number = 0;
  @ViewChild('mainTabs') tabRef:Tabs;
  constructor(
    public params: NavParams,
    public user:UserDataService
  ) {
    this.isApp = this.params.get('isApp');
  }

}
