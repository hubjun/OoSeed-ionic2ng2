/**
 * Created by dell on 2017/4/18.
 */
import {Component, ViewChild} from "@angular/core";
import {Content, NavController, NavParams, ModalController} from "ionic-angular";
import {PersionalHomepageService} from "../../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {HomepageVideoPlayPage} from "./homepage-videoplay";
@Component({
  selector: 'homepage-video',
  templateUrl: './homepage-video.html',
  providers: [PersionalHomepageService]
})

export class HomepageVideoPage {
  userId: string;
  arr: Array<string> = [];
  video: Array<string> = [];
  subscription: Subscription = new Subscription();
  @ViewChild('container') content: Content;

  constructor(
    public params:NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private persionalHomepageService:PersionalHomepageService
  ) {}

  setVideos(arr,target?){
    let keys = Object.keys(arr);
    let o   = target ? target : this.arr;

    keys.map(item => {
      o.push({url:arr[item]['fileName']})
    });
  }

  LoadVideos() {
      this.subscription.add(
        this.persionalHomepageService.getUserAlbum(this.userId,3,1,1,20).subscribe((res) => {
          if (res && res.result == 0 && res.data && res.data.list) {
            let data = res.data.list;
            for (var i = 0; i < data.length; i++) {
              this.video.push(data[i]);
            }
            this.setVideos(data);
          }
        })
      )
  }

  galleryViewer(link:string){
    let modal = this.modalCtrl.create(HomepageVideoPlayPage, {
      link:link,
    });

    modal.present();
  }

  ionViewDidLoad(){
    this.userId = this.params.get('userId');
    this.LoadVideos();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
