/**
 * Created by chenwenhao on 2017/1/16.
 */
import {Component, Input, Output, EventEmitter,Renderer} from '@angular/core';
import {HomeService} from '../../../providers/HomeService';
import {RenderDirective} from "../../../providers/CommonService.directive";
@Component({
  selector: 'info-cate',
  template: `
    <scroll-horizontal *ngIf="scrolls.length > 0" >
        <ul class="info-cate-box"  >  
            <li  *ngFor="let item of scrolls;let i = index;let last = last" [render]="last"  tappable (click)="getMoreCate($event,item.cateId)" [class.active]="i == 0"><span  [attr.cateId]="item.cateId">{{item.cateName}}</span></li>
        </ul>
    </scroll-horizontal>      
   <article-card [content]="content" [articles]="article"></article-card>      
   `,
  providers: [HomeService],

})

export class InfoCateComponent {
  @Input() scrolls: string[];
  @Input() article: string[];
  @Input() content;
  @Output() cate: EventEmitter<any> = new EventEmitter();

  constructor(private renderer:Renderer){

  }

  getMoreCate(event,id:any) {
    let status = false;
    let ID = id;
    let target = event.target;
    if(target.tagName.toLocaleLowerCase() != 'span')
      return;
    let cateid =  target.attributes.cateid.value;
    let li = target.parentNode.parentNode.getElementsByTagName('li');

    if(target.parentNode.className != 'active'){
      for(let i=0;i<li.length;i++){
        li[i].className = '';
      }
      target.parentNode.className = 'active';
    } else {
      ID = false;
    }
    this.cate.emit(ID);
  }


}
