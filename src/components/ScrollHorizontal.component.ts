/**
 * Created by chenwenhao on 2017/1/16.
 */
import {Component,ElementRef} from '@angular/core';
declare var $;
@Component({
  selector:'scroll-horizontal',
  template:`
    <ion-scroll scrollX="true" id="scroll-horizontal-box" >
        <ng-content></ng-content >
    </ion-scroll>
  `,
  styles:[`
   #scroll-horizontal-box{
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    position: relative;
    box-sizing: content-box;
   }
   #scroll-horizontal-box .scroll-content::-webkit-scrollbar{
        display: none;
   }
  `]
})

export class ScrollHorizontal {
  status:boolean = true;

  constructor(private el: ElementRef){
  }

}
