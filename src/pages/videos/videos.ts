import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';
import { VideoDetailPage } from '../video-detail/video-detail';
import { VideoMorePage } from '../video-more/video-more';
import { VideoService } from '../../providers/VideoService';
import { Subscription } from 'rxjs';
declare var $;

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
  providers: [VideoService]
})

export class VideosPage {
  videoTab: string = "tvDemand";
  tvSlides: any[] = [];
  tvCateObj: any[] = [];
  cateID: number = null;
  videoLibrary: boolean = true;
  subscription: Subscription = new Subscription();

  constructor(public nav: NavController, private videoService: VideoService, public el:ElementRef) {
    // this.selectTab(1);
    // this.tvDamand = videoService.listLoad();
  }
  @ViewChild('mySlider') slider: Slides;
  // @ContentChildren('li-list') items: QueryList<ElementRef>;
  videoSliderOption = {
    pager: true,
    initialSlide: 0,
    loop: true,
    speed: 500,
    autoplay: 2000
  };

  gotoDetail(e,id: number, cateId: number){
    this.nav.push(VideoDetailPage,{
      videoID: id,
      cateID: cateId
    });
  };

  toggleCateMore(e,cid){
    this.nav.push(VideoMorePage,{
      cateID: cid
    })
  };

  goVideoStorage(){
    this.nav.push(VideoMorePage,{
      isVideoStorage: true
    });
  };

  getSlides(){
    this.subscription.add(
      this.videoService.getTvDemandSlides()
        .subscribe(rs => {
          if(rs.result === '0'){
            this.tvSlides = rs.data.list;
            // console.log(this.tvSlides);
          }
        })
    )
  };

  getDemandCategory(){
    this.subscription.add(
      this.videoService
        .getTvDemandCate().subscribe(rs => {
        if(rs.result == 0){
          console.log(rs);
          setTimeout(() => {
            this.setVideoCateWidth();
          });
          this.tvCateObj = rs.data;
          this.videoLibrary = false;
        }else {
          return;
        }
      })
    )
  };

  setVideoCateWidth(){
    let elem = this.el.nativeElement;
    // let setObjj = elem.querySelector('.category-ul');
    let totals: number = 0;
    let liOhj = $('ul.category-ul li');
    for(let i = 0; i< liOhj.length; i++){
      totals += liOhj.eq(i).width();
    }
    $(elem).find('ul.category-ul').css({width: totals + 32 + 'px'});
  }

  ngOnInit(){
    this.getSlides();
    this.getDemandCategory();
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
