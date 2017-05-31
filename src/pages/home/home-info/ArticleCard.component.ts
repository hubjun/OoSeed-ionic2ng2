/**
 * Created by chenwenhao on 2017/1/16.
 */
import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import {ArticleDetailsPage} from './ArticleDetail.component';
import {EventEmitter} from "@angular/common/src/facade/async";
@Component({
  selector: 'article-card',
  encapsulation: ViewEncapsulation.None,
  template: `
     <div class="article-card-warp"   *ngIf="articles">
        <dl tappable 
            (click)="goToArticlePage(item.articleId)" 
            [class.single]="item.coverUrl?.length ==1" 
            [class.more]="item.coverUrl?.length >1" 
            [class.nope]="item.coverUrl?.length == 0"   
            class="summary border-bottom" 
            *ngFor="let item of articles; let i = index"
            [hidden]="item.infoType == 2"
          >
          <dt class="picture " *ngIf="item.coverUrl?.length == 1">
            <img
              [lazyLoad]="item.coverUrl"  
              [defaultImage]="'/assets/images/placeholder_card_pic.png'"
              [errorImage]="'/assets/images/placeholder_card_pic.png'"
              [scrollObservable]="content.ionScroll"  
            >
          </dt>
          <dd class="content ">
            <div class="title">  
              {{item.title}}  
            </div>
            <div class="gallery" *ngIf="item.coverUrl?.length == 3">
                <!--<img *ngFor="let cover of item.coverUrl" src="{{cover}}" >  -->
                <img  
                  *ngFor="let cover of item.coverUrl"   
                  [lazyLoad]="cover"  
                  [defaultImage]="'/assets/images/placeholder_card_pic.png'"
                  [errorImage]="'/assets/images/placeholder_card_pic.png'"
                  [scrollObservable]="content.ionScroll"  
                >
            </div> 
            <div class="source">
             <span class="poster">{{item.authorName | truncate:2}}</span>  
             <span class="verify-icon"></span>
             <span class="create-time">{{item.createTime | amDateFormat: 'YY-MM-DD' }}</span>  
             <span class="interface">
               <span class="comment"><label class="icon_new_message"></label>{{item.commentCount}}</span>
             </span>
            </div> 
          </dd> 
        </dl>  
      </div>
  `
  ,

})

export class ArticleCardComponent {
  @Input() articles;
  @Input() content;

  constructor(
    public navCtrl: NavController
  ) {}

  goToArticlePage(articleId: number) {
    this.navCtrl.push(ArticleDetailsPage, {
      articleId: articleId,
      isShare: 0,
      isApp: 0
    })
  }

}

