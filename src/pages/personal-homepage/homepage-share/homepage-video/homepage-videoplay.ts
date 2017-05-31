/**
 * Created by dell on 2017/4/18.
 */
import {Component, ViewChild, ViewEncapsulation, ElementRef} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import { Subject} from "rxjs";
@Component({
  selector: 'homepage-videoplay',
  template:`
    <ion-content #content class="gallery-modal" (window:resize)="resize($event)" (window:orientationchange)="orientationChange($event)">
      <button class="close-button" ion-button icon-only (click)="dismiss()">
        <ion-icon name="arrow-back"></ion-icon>
      </button>

      <div class="image-on-top video">
        <video #player [src]="link" poster="{{poster}}" controls="controls"></video>
      </div>
    
    </ion-content>
  `,
  encapsulation: ViewEncapsulation.None,
})

export class HomepageVideoPlayPage {
  link  :string;
  poster:string;
  @ViewChild('player') player;
  private parentSubject: Subject<any> = new Subject<any>();
  constructor(
    public params:NavParams,
    public element: ElementRef,
    private viewCtrl: ViewController,
  ) {}

  resize(event) {
    let width = this.element['nativeElement'].offsetWidth;
    let height = this.element['nativeElement'].offsetHeight;

    this.parentSubject.next({
      width: width,
      height: height,
    });

  }

  orientationChange(event) {
    window.setTimeout(() => {
      this.resize(event);
    }, 150);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
    this.link = this.params.get('link');
    this.poster = this.link+'&width=300&second=1';
  }

  ngOnDestroy(){
    this.player.nativeElement.src = '';
    this.player.nativeElement.load();
  }
}
