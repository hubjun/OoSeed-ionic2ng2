/**
 * Created by chenwenhao on 2017/1/14.
 */
import {Component,Input,ViewChild,ViewEncapsulation} from '@angular/core';
import {Slides} from 'ionic-angular';


@Component({
  selector:'gallery-slides',
  template:`
    <div class="gallery-slides-warp" >
        <ion-slides *ngIf="gallerys?.length > 1"  pager loop="true"  autoplay="4000"   (ionSlideDidChange)="onSlideChanged($event)"  class="gallery-slides">
          <ion-slide *ngFor="let gallery of gallerys" >    
            <div class="gallery" [style.background]=" 'url('+ gallery.resUrl +') no-repeat center center/cover ' | safeStyle " ></div>  
          </ion-slide>      
        </ion-slides>   
        <div class="gallery-slides-title" >           
          <div *ngFor="let gallery of gallerys; let i = index;" [ngClass]="{active:isSlidersActive == i+1}">{{gallery.title }}</div>
        </div>
    </div>         
  `,
  encapsulation: ViewEncapsulation.None,
})

export class GallerySlidersComponent{
  @Input() gallerys:string[];
  isSlidersActive: number = 0;


  @ViewChild(Slides) slider: Slides;

  constructor(){}

  onSlideChanged() {
    let index = this.slider.getActiveIndex();
    let length = this.slider.length();    if(index == length - 1)
      index = 1;
    this.isSlidersActive = index;
  }


}
