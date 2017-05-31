import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomepageGalleryPage} from "../personal-homepage/homepage-share/homepage-gallery/homepage-gallery";
import {HomepageVideoPage} from "../personal-homepage/homepage-share/homepage-video/homepage-video";
import {HomepageFeedPage} from "../personal-homepage/homepage-share/homepage-feed/homepage-feed";
import {HomepageInfoPage} from "../personal-homepage/homepage-share/homepage-info/homepage-info";

/*
  Generated class for the MyContent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-content',
  templateUrl: 'my-content.html'
})
export class MyContentPage {
  userId:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.userId = this.navParams.get('userid');
  }

  goToGallery(){
    this.navCtrl.push(HomepageGalleryPage,{
      userId:this.userId
    })
  }

  goToVideo(){
    this.navCtrl.push(HomepageVideoPage,{
      userId:this.userId
    })
  }

  goToFeed(states:boolean){
    this.navCtrl.push(HomepageFeedPage,{
      userId:this.userId,
      states:states
    })
  }

  goToInfo(){
    this.navCtrl.push(HomepageInfoPage,{
      userId:this.userId
    })
  }

  ionViewDidLoad() {

  }

}
