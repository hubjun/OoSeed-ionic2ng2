/**
 * Created by chenwenhao on 2017/1/4.
 */
import {Component} from '@angular/core';

import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {HomeService} from '../../../providers/HomeService';
import {ArticleDetailsPage} from './ArticleDetail.component';
declare var $;
@Component({
  selector: 'page-article-recommend-details',
  templateUrl: 'article-details.html',
  providers: [HomeService]
})

export class ArticleRecommendDetailsPage{
  public article: string[] = [];
  public comments: string[] = [];
  public inherit:ArticleDetailsPage;

  constructor(
    public homeService: HomeService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
  }

  goToArticleDetail(id: number) {
    if (!id )
      return;

    this.navCtrl.push(ArticleRecommendDetailsPage,{
      id:id
    })
  }

  ngOnInit(){
   /* this.inherit = new ArticleDetailsPage(this.homeService,this.navCtrl,this.navParams,this.loadingCtrl);
    this.inherit.getCateInfoArticle();
    setTimeout(() =>{
      this.article = this.inherit.article;
      this.comments = this.inherit.comments;
    },500)
*/
  }

}


