/**
 * Created by chenwenhao on 2017/1/4.
 */
import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {HomeService} from '../../../providers/HomeService';
import {ArticleCommentsPage} from './ArticleComments.component';
import {ToolsService} from "../../../providers/ToolsService";

declare var $;
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
  providers: [HomeService]
})

export class ArticleDetailsPage {
  public article:string[] = [];
  public articleStatus:boolean = false;
  private comments: string[] = [];
  private articleId:number;
  private isShare:number;
  private isApp:number = 0;
  constructor(
    public homeService: HomeService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public tools : ToolsService
  ) {
    this.isApp = this.navParams.get('isApp');
    this.isShare = this.navParams.get('isShare');
    this.articleId = this.navParams.get('articleId');

  }


  ionViewCanEnter() {
    if(this.isApp == 1){
      // console.log('enter');
      $('#sportIp-tabs-nav .tabbar').css({
        display:'none'
      })
    }
   }
   ionViewWillLeave(){
     if(this.isApp == 1) {
       // console.log('Leave')
       $('#sportIp-tabs-nav .tabbar').css({
         display: 'flex'
       })
     }
   }

  forAssistant(target: string[], data: string[]) {
    if (!target || !data) {
      console.log("forAssistant: don't had target or data ,please added them...")
      return
    }
    for (let i = 0; i < data.length; i++) {
      target.push(data[i]);
    }
    return target;
  }

  getCateInfoArticle() {
    let ID =  this.articleId;

    if(!ID || ID == null || typeof ID == "undefined")
      return;
    this.tools.showLoading();
    this.homeService.GetCateArticleInfo(ID).subscribe((res) => {
      // console.log(res);
      if (!res || !res.hasOwnProperty('data') || !res.data.hasOwnProperty('articleContentList') ) {
        this.tools.hideLoading();
        return true;
      }
      this.article = res.data;
      this.articleStatus = true;
      this.tools.hideLoading();
      this.homeService.GetCateArticleListRecommend(res.data.cateId).subscribe((res) => {
        if (!res || !res.hasOwnProperty('data') || res.data.length == 0 || res == false) {
          this.tools.hideLoading();
          return false;
        }
        this.tools.hideLoading();
        this.forAssistant(this.comments, res.data);
      })
    })
  }
  goToArticleDetail(id: number) {
    if (!id)
      return;
    let isApp = this.navParams.get('isApp');
    let isShare = this.navParams.get('isShare');
    this.navCtrl.push(ArticleDetailsPage, {
      articleId: id,
      isApp:isApp,
      isShare:isShare
    })
  }

  goToCommentPage(articleId: string) {
    if (!articleId || this.article['commentCount'] == 0)
      return;
    this.navCtrl.push(
      ArticleCommentsPage,
      {articleId:articleId}
    )
  }

  hideDownloadBanner(){
    $('.download-banner .hide-btn').live('click',function () {
      $(this).parents('.download-banner').hide();
    })
  }

  ngOnInit() {
    this.getCateInfoArticle();
    this.hideDownloadBanner();
  }

}


