/**
 * Created by chenwenhao on 2017/1/22.
 */
import {Component, ViewChild, ElementRef, Renderer} from '@angular/core';
import {NavParams, InfiniteScroll, NavController} from 'ionic-angular';
import {HomeService} from "../../../providers/HomeService";
import {ToolsService} from "../../../providers/ToolsService";
import {UserDataService} from "../../../providers/UserDataSevice";
import {FeedbackSevice} from "../../../providers/FeedbackSevice";
import {PersonalHomepagePage} from "../../personal-homepage/personal-homepage";
import {Subscription} from "rxjs";

declare var $;
@Component({
  selector: 'feed-article',
  providers:[HomeService],
  template: `
    <ion-header id="sportIp-header"  >
      <ion-navbar>
        <ion-title>帖子正文</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="article-details" #content >
      <div class=" article-template article-template-summary padding-left-right-30" *ngIf="pageLoaded">
        <header class="header">
          <div
           (click)="goToPersonalPage(feedsArticle.userId,$event)"
            class="subscriptions-posters-icon article-template-icon"
           >
            <img
             [lazyLoad]="feedsArticle.userIcon"  
             [defaultImage]="'/assets/images/placeholder_head_pic.png'"
             [errorImage]="'/assets/images/placeholder_head_pic.png'"
             [scrollObservable]="content.ionScroll"
            >    
          </div>
          <div class=" article-template-content">
            <div class="poster-name">
              <span>{{feedsArticle.nickName}}</span>
              <span 
                 class="icon-type"
                 *ngIf="feedsArticle.appImgtxtUrl"
                 [style.background-image]="'url('+ feedsArticle.appImgtxtUrl +' )' | safeStyle"
              ></span>
            </div>
            <div class="source" >
              <time class="date">{{feedsArticle.createTm | amDateFormat:'MM-DD HH:mm':'MM-dd HH:mm'}}</time>
              <span class="separator" *ngIf="feedsArticle.labels != '' "></span>
              <span  *ngFor="let item of feedsArticle.labels" class="tags">{{item.labelName}}</span>
            </div>
          </div> 
          <div *ngIf="feedsArticle.userId != user.getUserid()" tappable (click)="follow(feedsArticle.userId,$event)" [ngClass]="{isFollow: feedsArticle.isFollow == 1}" class="button-subscription "> 
                   
          </div>
        </header> 
        <article class="article" *ngIf="pageLoaded">
            <h3>{{feedsArticle.title}}</h3>
            <div class="section" *ngFor="let item of feedsArticle.feedContents">
                <p *ngIf="item.contentType == 1">{{item.content}}</p>
                <img 
                  class=""
                  *ngIf="item.contentType == 2" 
                  [lazyLoad]="item.content"   
                  [defaultImage]="'/assets/images/placeholder_article_pic.png'"
                  [errorImage]="'/assets/images/placeholder_article_pic.png'"
                  [scrollObservable]="content.ionScroll" 
                 >
                <video *ngIf="item.contentType == 3" src="{{item.content}}" poster="{{item.thumbnail}}" controls="controls"></video>
            </div>
        </article>
        <div class="article-support " text-center> 
          <div  class="cont" text-center>
            <div tappable (click)=" digg(feedsArticle.feedId,$event)" [class.isDigg]="feedsArticle.isDigg == true" class="icon-box"></div>
          </div>
          <div #diggNumber class="quantity-number">{{feedsArticle.diggCount}}</div>
        </div>
      </div>
         
      <div class="background-gray" *ngIf="comments.length > 0"></div>
      <div class="article-comments " *ngIf="comments.length > 0"> 
        <div class="article-template-title border-bottom">评论 {{total}}</div>
        <comment *ngIf="comments.length > 0" [content]="content"  [comments]="comments"></comment>
      </div>  
      
     <ion-infinite-scroll *ngIf="comments.length > 0"   (ionInfinite)="doInfinite($event)" >
      <ion-infinite-scroll-content loadingSpinner="bubbles"
                                   loadingText="Loading more data..."></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  `
})

export class FeedArticleComponent {
  private feedId;
  public tabsHeight:any;
  public pageLoaded:boolean = false;
  private feedsArticle:string[] = [];
  public comments:string[] = [];
  public total:number;
  public infiniteStatus:boolean = true;

  @ViewChild('diggNumber') diggNumber:ElementRef;
  subscription:Subscription = new Subscription();

  constructor(
    public navParams: NavParams,
    private homeService: HomeService,
    public tools:ToolsService,
    private renderer:Renderer,
    public navCtrl:NavController,
    private user:UserDataService,
    private feedback:FeedbackSevice
  ) {}

  getTabsHeight (){
    return this.tabsHeight;
  }

  setTabsHeight (val:number){
    this.tabsHeight = `${val}px`;
  }

  getInfiniteStatus():boolean{
    return this.infiniteStatus;
  }

  setInfiniteStatus(newStatus:boolean){
    this.infiniteStatus = newStatus;
  }

  goToPersonalPage(userid:number,event){
    event.stopPropagation();
    this.navCtrl.push(
      PersonalHomepagePage,
      {userid:userid}
    )
  }

  ionViewDidLoad() {
    this.tools.showLoading();
    this.feedId = this.navParams.get('feedId');

    this.subscription.add(
      this.homeService.GetFeedArticle(this.feedId).map((res) => res.json()).subscribe((res) => {

        if(!res || !res.hasOwnProperty('data') || res.data.length == 0  ||  res == false){
          this.tools.hideLoading();
          return;
        }
        this.feedsArticle = res.data;
        this.pageLoaded = true;

        this.loadComments().then(() =>{
          this.tools.hideLoading();
        })
      })
    )

  }

  loadComments(){
    return new Promise((resolve) =>{
      let page = 1;
      if(this.getInfiniteStatus()){
        this.subscription.add(
          this.homeService.GetFeedArticleComment(this.feedId,page).subscribe((res) => {
            if(!res || !res.hasOwnProperty('data') ||  res.data.length == 0  ||  res == false){
              resolve(false);
              return false;
            }
            for (let i=0;i<res.data.list.length;i++) {
              this.comments.push(res.data.list[i]);
            }
            page++;
            this.total = res.data.total;
            this.setInfiniteStatus(res.data.hasNextPage);
            resolve();
          })
        )
      }else{
        resolve(false);
      }
    })
  }

  digg(feedId:number,$event:any){
    //let number = this.renderer.setText(this.digg.nativeElement)
    let number = parseInt(this.diggNumber.nativeElement.innerText);
    let name = this.diggNumber.nativeElement.getAttribute('class');

    if(this.user.hasLoggedIn() != null && this.user.getUserid() != null){
      let userId = this.user.getUserid();

      if($event.target.classList.contains('isDigg')){
        this.subscription.add(
          this.homeService.GetFeedDigg(feedId,userId,false).subscribe((res) =>{
            if(!res)
              return;

            if(res.result == 0){
              $event.target.classList.remove('isDigg');
              this.diggNumber.nativeElement.innerText = number - 1;
              this.tools.showToast('取消成功',1000)
            }
          })
        )
      }else {
        this.subscription.add(
          this.homeService.GetFeedDigg(feedId,userId).subscribe((res) =>{
            if(!res)
              return;

            if(res.result == 0){
              $event.target.classList.add('isDigg');
              this.diggNumber.nativeElement.innerText = number + 1;
              this.tools.showToast('点赞成功',1000)
            }
          })
        )
      }
    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }

  }



  follow(followUserId:string,$event:any){
    if(this.user.hasLoggedIn() != null && this.user.getUserid() !=null){

      if($event.target.classList.contains('isFollow')){
        this.subscription.add(
          this.feedback.GetFeedFierd(followUserId, false).subscribe((res) => {
            if (!res)
              return;
            $event.target.classList.remove('isFollow');
            if (res.result == 0) {
              this.tools.showToast(res.msg, 1000)
            }
          })
        );
      }else {
        this.subscription.add(
          this.feedback.GetFeedFierd(followUserId).subscribe((res) => {
            if (!res)
              return;
            $event.target.classList.add('isFollow');
            if (res.result == 0) {
              this.tools.showToast(res.msg, 1000)
            }
          })
        );
      }

    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }
  }



  doInfinite(infiniteScroll:InfiniteScroll){

    setTimeout(() =>{
      this.loadComments().then(() =>{
        infiniteScroll.complete();
        if (!this.getInfiniteStatus()) {
          infiniteScroll.enable(false);
        }
      })
    },1000);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
