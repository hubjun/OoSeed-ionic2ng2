/**
 * Created by dell on 2017/4/21.
 */
import {Component, ViewEncapsulation, ElementRef} from "@angular/core";
import {ViewChild} from "@angular/core/src/metadata/di";
import {Slides, Content, ViewController, NavParams, Platform} from "ionic-angular";
import {Subject} from "rxjs";

@Component({
  selector:'gallery-modal',
  template:`
    <ion-content #content class="gallery-modal" (window:resize)="resize($event)" (window:orientationchange)="orientationChange($event)">
      <button class="close-button" ion-button icon-only (click)="dismiss()">
        <ion-icon name="{{ closeIcon }}"></ion-icon>
      </button>
    
      <!-- Initial image while modal is animating -->
      <div class="image-on-top" #image [ngStyle]="{ 'background-image': 'url(' + photos[initialSlide].url + ')'}" [hidden]="sliderLoaded">
        &nbsp;
      </div>
    
      <!-- Slider with images -->
      <ion-slides #slider [initialSlide]="initialSlide" class="slider" *ngIf="photos.length" [ngStyle]="{ 'visibility': sliderLoaded ? 'visible' : 'hidden' }">
        <ion-slide *ngFor="let photo of photos;">
          <zoom-image
            src="{{ photo.url }}"
            [ngClass]="{ 'swiper-no-swiping': sliderDisabled }"
            (disableScroll)="disableScroll($event)"
            (enableScroll)="enableScroll($event)" 
            [parentSubject]="parentSubject"
          ></zoom-image>
        </ion-slide>
      </ion-slides>
    </ion-content>
  `,
  encapsulation: ViewEncapsulation.None,
})

export class GalleryViewerModal {
  @ViewChild('slider') slider: Slides;
  @ViewChild('content') content: Content;

  public photos: string[];
  private sliderDisabled: boolean = false;
  private initialSlide: number = 0;
  private currentSlide: number = 0;
  private sliderLoaded: boolean = false;
  private closeIcon: string = 'arrow-back';
  private parentSubject: Subject<any> = new Subject<any>();

  constructor(
    private viewCtrl: ViewController,
    params: NavParams,
    private element: ElementRef,
    private platform: Platform
  ) {
    this.photos = params.get('photos') || [];
    this.closeIcon = params.get('closeIcon') || 'arrow-back';
    this.initialSlide = params.get('initialSlide') || 0;
  }

  /**
   * Closes the modal (when user click on CLOSE)
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  private resize(event) {
    this.slider.update();

    let width = this.element['nativeElement'].offsetWidth;
    let height = this.element['nativeElement'].offsetHeight;

    this.parentSubject.next({
      width: width,
      height: height,
    });
  }

  private orientationChange(event) {
    // TODO: See if you can remove timeout
    window.setTimeout(() => {
      this.resize(event);
    }, 150);
  }

  /**
   * When the modal has entered into view
   */
  private ionViewDidEnter() {
    this.resize(false);
    this.sliderLoaded = true;
  }

  /**
   * Disables the scroll through the slider
   *
   * @param  {Event} event
   */
  private disableScroll(event) {
    if (!this.sliderDisabled) {
      this.currentSlide = this.slider.getActiveIndex();
      this.sliderDisabled = true;
    }
  }

  /**
   * Enables the scroll through the slider
   *
   * @param  {Event} event
   */
  private enableScroll(event) {
    if (this.sliderDisabled) {
      this.slider.slideTo(this.currentSlide, 0, false);
      this.sliderDisabled = false;
    }
  }
}
