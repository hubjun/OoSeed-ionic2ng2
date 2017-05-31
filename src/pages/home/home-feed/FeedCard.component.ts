/**
 * Created by chenwenhao on 2017/1/20.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FeedArticleComponent} from './FeedArticle.component';
import {PersonalHomepagePage} from "../../personal-homepage/personal-homepage";
declare var $;
@Component({
  selector: 'feed-card',
  template: `
    <div class="subscriptions-item article-template border-bottom" *ngFor="let item of feeds" tappable (click)="goToFeedArticle(item.feedId)" >
        <div 
          class=" article-template-icon"
          (click)="goToPersonalPage(item.userId,$event)"
         >
          <img 
            [lazyLoad]="item.userIcon"  
            [defaultImage]="'/assets/images/placeholder_head_pic.png'"
            [errorImage]="'/assets/images/placeholder_head_pic.png'"
            [scrollObservable]="content.ionScroll"
           >  
        </div>  
        <div class="article-template-content"> 
          <header class="header">
            <div class="left-box fn_left">
              <div class="poster-name">
                <span>{{item.nickName}}</span>
                <img class="icon-type pl-20" src="{{item.appImgtxtUrl  || ''}} ">
<!--                <span 
                  class="icon-type" 
 
                  [style.background-image]="' url('+item.appImgtxtUrl+') '| safeStyle"
                 >
                </span>-->
              </div>
              <div class="type">{{item.title}}</div>
              <div class="source">
                <time class="date">{{item.createTm | amDateFormat:'MM-DD HH:mm'}}</time>
                <span class="separator" *ngIf="item.labels.length > 0"></span>
                <span class="tags"   *ngFor="let label of item.labels">{{label.labelName}}</span>
              </div>  
            </div>
          </header>
          <article class="article summary">
            <p>{{item.textContent}}</p>
          </article>
          <div class="gallery "> 
            <span
                class="gallery-img-type-{{i}}"
                [class.show]="feedContents.contentType != 1"
                *ngFor="let feedContents  of item.feedContents | slice:0:3 ; let i = index;"   
             >
              <img
                *ngIf="feedContents.contentType != 1"
                class="placeholder_card_pic"  
                [lazyLoad]="feedContents.thumbnail"  
                [defaultImage]="'/assets/images/placeholder_card_pic.png'"
                [errorImage]="'/assets/images/placeholder_card_pic.png'"
                [scrollObservable]="content.ionScroll"    
               >
            </span> 
          </div>
          <div class="interface-item">
            <span class="interface">
               <span class="comment"><label class="icon_new_message"></label><span class="quantity">{{item.commentCount}}</span></span>
               <span class="support"><label class="icon_new_Likes"></label><span class="quantity">{{item.diggCount}}</span></span>
            </span>
          </div>
        </div> 
      </div> 
  `
})

export class FeedCardComponent {
  @Input() feeds: string[];
  @Input() content;
 // @Output() feedArticle: EventEmitter<any> = new EventEmitter();

  constructor(private navCtrl: NavController) {

  }

  goToFeedArticle(id: number) {
    if (!id || typeof id == 'undefined') {
      return
    }
    let feedId = id;

    this.navCtrl.push(FeedArticleComponent,{
      feedId:feedId
    });
    //this.feedArticle.emit(ID);
  }

  goToPersonalPage(userid:number,event){
    event.stopPropagation();
    this.navCtrl.push(
      PersonalHomepagePage,
      {userid:userid}
    )
  }


}
