import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {Subscription} from "rxjs";
import {PersionalHomepageService} from "../../../providers/PersionalHomepageService";
import {NavController, ModalController} from "ionic-angular";
import {HomepageFeedPage} from "./homepage-feed/homepage-feed";
import {HomepageGalleryPage} from "./homepage-gallery/homepage-gallery";
import {HomepageVideoPage} from "./homepage-video/homepage-video";
import {HomepageVideoPlayPage} from "./homepage-video/homepage-videoplay";
import {GalleryViewerModal} from "../../../components/GallerViewer.component";


@Component({
  selector: 'page-homepage-share',
  templateUrl: './homepage-share.html',
})
export class HomepageSharePage {
  /*@Input() articles;*/
  article:string[] = [];
  gallery: string[] = [];
  video: string[] = [];
  arr:string[] = [];
  @Input() content;
  userId:string;
  subscription: Subscription = new Subscription();
  constructor(
    public navCtrl:NavController,
    public modalCtrl:ModalController,
    private http:PersionalHomepageService
  ) {}

  getUserFeed(userId: string) {
    this.subscription.add(
      this.http.getUserFeed(userId).subscribe(res => {
        if (res && res.result == 0 && res.data && res.data.list) {
          let data = res.data.list;
          for (var i = 0; i < data.length; i++) {
            this.article.push(res.data.list[i]);
            if(i >=3){
              break
            }
          }
        }
      })
    )
  }

  getUserAlbum(userId:string,resType:number = 2){
    return new Promise((resolve) => {
      this.subscription.add(
        this.http.getUserAlbum(userId,resType).subscribe(res => {
          resolve(res);
        })
      )
    })

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

  goToFeed(){
    this.navCtrl.push(HomepageFeedPage,{
      userId:this.userId
    })
  }

  setGallerys(arr,target?){
    let keys = Object.keys(arr);
    let o   = target ? target : this.arr;

    keys.map(item => {
      o.push({url:arr[item]['fileName']})
    });
  }
  videoViewer(link:string){
    let modal = this.modalCtrl.create(HomepageVideoPlayPage, {
      link:link,
    });

    modal.present();
  }

  galleryViewer(index:number){
    let modal = this.modalCtrl.create(GalleryViewerModal, {
      photos: this.arr.slice(0,6),
      initialSlide: index
    });

    modal.present();
  }
  ngOnInit(){
    this.userId = this.http.userId;
    this.getUserFeed(this.userId);
    this.getUserAlbum(this.userId).then((res:any) => {
      if (res && res.result == 0 && res.data && res.data.list) {
        let data = res.data.list;
        for (var i = 0; i < data.length; i++) {
          this.gallery.push(res.data.list[i]);
        }
        this.setGallerys(data)
      }
    });
    this.getUserAlbum(this.userId,3).then((res:any) => {
      if (res && res.result == 0 && res.data && res.data.list) {
        let data = res.data.list;
        for (var i = 0; i < data.length; i++) {
          this.video.push(res.data.list[i]);
        }
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
