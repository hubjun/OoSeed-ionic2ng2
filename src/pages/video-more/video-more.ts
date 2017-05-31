import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoDetailPage } from '../video-detail/video-detail';
import { VideoService } from '../../providers/VideoService';
import { ToolsService } from "../../providers/ToolsService";
import { Subscription } from "rxjs";

@Component({
  selector: 'page-video-more',
  templateUrl: 'video-more.html',
  providers: [VideoService,ToolsService]
})

export class VideoMorePage {
  cateID: number;
  isVideoStorage: number;
  videoListObj: any[];
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private videoService: VideoService,
    private tools: ToolsService
  ) {
    this.cateID = this.navParams.get('cateID');
    this.isVideoStorage = this.navParams.get('isVideoStorage');
  }

  gotoDetail(e,id: number){
    this.navCtrl.push(VideoDetailPage,{
      videoID: id,
      cateID: this.cateID
    });
  };

  getMoreInfo(){
    this.subscription.add(
      this.videoService.getVideoList(this.cateID)
        .subscribe(rs => {
          console.log(rs);
          if(rs.result === '0'){
            this.videoListObj = rs.data.list;
          }else {
            this.tools.tips(rs.msg,2000);
            return;
          }
        })
    );
  };

  getVideoStorageInfo(){
    this.subscription.add(
      this.videoService.getVideoStorage()
        .subscribe(rs => {
          console.log(rs);
          if(rs.result === '0'){
            this.videoListObj = rs.data.list;
          }else {
            this.tools.tips(rs.msg,2000);
            return;
          }
        })
    );
  };

  ngOnInit(){
    if(!this.isVideoStorage){
      this.getMoreInfo();
    }else {
      this.getVideoStorageInfo();
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
