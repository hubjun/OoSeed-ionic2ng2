import {Component, ViewChild} from '@angular/core';
import {NavParams, InfiniteScroll, LoadingController, ViewController, Content} from 'ionic-angular';
import {HomeService} from '../../../providers/HomeService';
@Component({
  selector: 'article-comments-page',
  template: `
    <ion-header id="sportIp-header"  class="sportIp-header-login">
      <ion-navbar>
        <ion-title>全部评论</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content #content>
        <comment [content]="content" [comments]="comments"></comment>
        <ion-infinite-scroll   (ionInfinite)="doInfinite($event)" *ngIf="infiniteStatus">
          <ion-infinite-scroll-content loadingSpinner="bubbles"
                                       loadingText="Loading more data..."></ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </ion-content >
  `,
  providers:[HomeService]
})

export class ArticleCommentsPage {
  public comments: string[] = [];
  public infiniteStatus:boolean = true;

  @ViewChild('content') content:Content;
  constructor(
    public navParams: NavParams,
    public homeService: HomeService,
    public viewCtrl:ViewController,
    public loadingCtrl: LoadingController
  ) {}

  getInfiniteStatus():boolean{
    return this.infiniteStatus;
  }

  setInfiniteStatus(newStatus:boolean){
    this.infiniteStatus = newStatus;
  }


  httpGetCateArticleListComment(){
    let ID = this.navParams.get('articleId');

    var page = 1;
    this.homeService.GetCateArticleListComment(ID, page).subscribe((res) => {
      if (!res || !res.hasOwnProperty('data') || res.data.length == 0 || res == false) {
        this.setInfiniteStatus(false);
        return false;
      }

      //this.forAssistant(this.comments,res.data.list);
      for(var i=0;i<res.data.list.length;i++){
        res.data.list[i].userInfoBasicRespVO = {};
        res.data.list[i].userInfoBasicRespVO.userId = res.data.list[i].userId;
        res.data.list[i].userInfoBasicRespVO.iconUrl = res.data.list[i].iconUrl;
        res.data.list[i].userInfoBasicRespVO.nickName = res.data.list[i].nickName;
        this.comments.push(res.data.list[i])
      }
      this.setInfiniteStatus(res.data.hasNextPage);
    });
  }

  ngOnInit(){
    this.httpGetCateArticleListComment();
  }
  onDismiss(){
    this.viewCtrl.dismiss();
  }
  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      if (this.getInfiniteStatus()){
        this.httpGetCateArticleListComment();
        infiniteScroll.complete();

      }else{
        infiniteScroll.complete();
        infiniteScroll.enable(false);
      }
    },500)
  }
}
