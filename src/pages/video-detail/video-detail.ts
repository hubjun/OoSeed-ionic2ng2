import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoService } from '../../providers/VideoService'
import { PersonalHomepagePage } from '../personal-homepage/personal-homepage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
  providers: [VideoService]
})

export class VideoDetailPage {
  @ViewChild('player') player;
  isPause: boolean = false;
  videoRefresh: boolean = false;
  isRcommend: boolean = false;
  isTextHidden: boolean = false;
  isHasUserIcon: boolean = false;
  videoID: number;
  cateID: number;
  deVideoInfo: any[] = [];
  videoCateList: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public el:ElementRef,
    private videoService:VideoService
  ) {
    this.videoID = this.navParams.get('videoID');
    this.cateID = this.navParams.get('cateID');
  }

  backToVideos(){
    this.nav.pop();
  };

  hiddenToggle(){
    if(this.isTextHidden == false){
      this.isTextHidden = true;
    }else {
      this.isTextHidden = false;
    }
  };

  gotoDetail(e,id: number, cateId: number){
    this.nav.push(VideoDetailPage,{
      videoID: id
      // cateID: cateId
    });
  };
  goHomePage(userId){
    this.nav.push(PersonalHomepagePage,{
        userid: userId
    });
  };

  videoSwitch(){
    var video = this.el.nativeElement.querySelector('video');
    var videoRefresh = this.el.nativeElement.querySelector('.vplay');
    videoRefresh.classList.remove('videoRefresh');
    if(video.paused) {
      this.isPause = true;
      video.play();
    }else {
      this.isPause = false;
      video.pause();
    }
  };

  //跳跃播放
  videoSkip(e){
    var video = this.el.nativeElement.querySelector('video');
    var ev = e || window.event;
    //debugger
    video.currentTime = (ev.offsetX / ev.target.offsetWidth) * video.duration;
    //console.log('offsetX:'+ev.offsetX+' ------- offsetWidth:'+ev.target.offsetWidth +' ------ clientX:'+ev.clientX);
  };

  //视频信息
  getDemandInfo(){
    let videoID = this.videoID;
    this.subscription.add(
      this.videoService
        .getDeVideoDetail(videoID)
        .subscribe(rs => {
          console.log(rs);
          this.deVideoInfo = rs.data;
          if(rs.data.userIcon == '' || 'undefinded'){
            this.isHasUserIcon = true;
          }
        })
    );
  };

  //视频详情分类列表
  getDeCateList(){
    let cateID = this.cateID;
    this.subscription.add(
      this.videoService
        .getVideoCategory(cateID)
        .subscribe(rs => {
          // debugger
          if(rs.result === '0'){
            if(rs.data.list.length){
              this.videoCateList = rs.data.list;
              this.isRcommend = false;
            }else {
              this.isRcommend = true;
            }
          }else {
            return;
          }
        })
    );
  };

  ngOnInit(){
    // console.log('cateID:'+this.cateID);
    this.getDemandInfo();
    this.getDeCateList();
    // debugger
    var video = this.el.nativeElement.querySelector('video');
    // console.log(videos.innerHTML);
    var totalTime = this.el.nativeElement.querySelector('.total');
    var pause = this.el.nativeElement.querySelector('.ispause');
    var videoRefresh = this.el.nativeElement.querySelector('.vplay');
    var loaded = this.el.nativeElement.querySelector('.loaded');
    var currPlayTime = this.el.nativeElement.querySelector('.current');
    var expand = this.el.nativeElement.querySelector('.expand');

    //当视频可播放的时候
    video.oncanplay = function(){
      //显示视频
      this.style.display = "block";
      //显示视频总时长
      totalTime.innerHTML = getFormatTime(this.duration);
      // var video = this.el.nativeElement.querySelector('video');
      // if(video.paused) {
      //   video.play();
      //   // this.isPause = false;
      // }
    };

    //播放完毕还原设置
    video.onended = function(){
      var that = this;
      //进度条为0
      // loaded.style.width = 0;
      //还原当前播放时间
      currPlayTime.innerHTML = getFormatTime('');
      //视频恢复到播放开始状态
      that.currentTime = 0;
      videoRefresh.classList.add('videoRefresh');
      //this.isPause = false;
      console.log(videoRefresh.attributes);
    };

    //播放时间
    function getFormatTime(time) {
      var time = time || 0;

      var h = parseInt((time /3600).toString()),
        m = parseInt((time%3600/60).toString()),
        s = parseInt((time%60).toString());
        h = h < 10 ? 0 +h : h;
        m = m < 10 ? 0 +m : m;
        s = s < 10 ? 0 +s : s;

      return h+":"+m+":"+s;
    }

    //播放进度
    video.ontimeupdate = function(){
      var currTime = this.currentTime,    //当前播放时间
          duration = this.duration;       // 视频总时长
      //百分比
      var pre = currTime / duration * 100 + "%";
      //显示进度条
      loaded.style.width = pre;
      //console.log('已播放:'+pre+' ----- 播放时间:'+currTime);
      //显示当前播放进度时间
      currPlayTime.innerHTML = getFormatTime(currTime);
    };

    //全屏
    // expand.onclick = function(){
    //   video.webkitRequestFullScreen();
    // };
  };

  // ionViewWillEnter(){
  //   var video = this.el.nativeElement.querySelector('video');
  //   if(video.paused) {
  //     video.play();
  //     // this.isPause = false;
  //   }
  // };

  ionViewWillLeave(){
    let videos = this.el.nativeElement.querySelector('video');
    if(videos.play) {
      videos.pause();
      this.isPause = false;
    }
  };

  ngOnDestroy(){
    // this.player.nativeElement.src = '';
    // this.player.nativeElement.load();
    this.subscription.unsubscribe();
  };

}
