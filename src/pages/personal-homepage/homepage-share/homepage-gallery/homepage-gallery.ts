/**
 * Created by dell on 2017/4/18.
 */
import {Component, ViewChild} from "@angular/core";
import {Content, NavController, NavParams, ModalController} from "ionic-angular";
import {PersionalHomepageService} from "../../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {ToolsService} from "../../../../providers/ToolsService";
import {GalleryViewerModal} from "../../../../components/GallerViewer.component";
@Component({
  selector: 'homepage-gallery',
  templateUrl: './homepage-gallery.html',
  providers: [PersionalHomepageService]
})

export class HomepageGalleryPage {
  userId: string;
  arr: Array<string> = [];
  gallery: Array<string> = [];
  subscription: Subscription = new Subscription();
  @ViewChild('container') content: Content;

  private photos: any[] = [];
  constructor(
    public params:NavParams,
    public tools:ToolsService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private persionalHomepageService:PersionalHomepageService
  ) {
  }

  setGallerys(arr,target?){
    let keys = Object.keys(arr);
    let o   = target ? target : this.arr;

    keys.map(item => {
      o.push({url:arr[item]['fileName']})
    });
  }

  LoadGallery() {
      this.tools.showLoading();
      this.subscription.add(
        this.persionalHomepageService.getUserAlbum(this.userId,2,1,1,30).subscribe((res) => {
          if (res && res.result == 0 && res.data && res.data.list) {
            let data = res.data.list;
            for (var i = 0; i < data.length; i++) {
              this.gallery.push(data[i]);
            }
            this.setGallerys(data);
            this.tools.hideLoading();
          }
        })
      )
  }

  galleryViewer(index:number){
    let modal = this.modalCtrl.create(GalleryViewerModal, {
      photos: this.arr,
      initialSlide: index
    });

    modal.present();
  }

  ionViewDidLoad(){
    this.userId = this.params.get('userId');
    this.LoadGallery();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
