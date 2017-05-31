/**
 * Created by dell on 2017/4/18.
 */
import {Component, ViewChild} from "@angular/core";
import {Content, NavController, InfiniteScroll, NavParams} from "ionic-angular";
import {PersionalHomepageService} from "../../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
@Component({
  selector: 'homepage-info',
  templateUrl: './homepage-info.html',
  providers: [PersionalHomepageService]
})

export class HomepageInfoPage {
  userId: string;
  page:number = 1;
  hasNextPage: boolean = true;
  article: Array<string> = [];
  subscription: Subscription = new Subscription();
  @ViewChild('container') content: Content;

  constructor(
    public params:NavParams,
    public navCtrl: NavController,
    private persionalHomepageService:PersionalHomepageService
  ) {
  }


  doInfiniteForArticle(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.getCateArticles().then(() => {
        infiniteScroll.complete();
        if (this.hasNextPage == false) {
          infiniteScroll.enable(false)
        }
      });
    }, 1000)
  }

  private getCateArticles() {

    return new Promise((resolve) => {
      this.persionalHomepageService.getUserArticleList(this.userId, this.page).subscribe((res) => {

        if (!res.data || res == false) {
          resolve();
          return;
        }
        this.page++;
        for (let i = 0; i < res.data.list.length; i++) {
          this.article.push(res.data.list[i]);
        }
        this.hasNextPage = res.data.hasNextPage;
        resolve();
      }, (errorResponse) => {
        resolve();
      });
    })

  }


  ionViewDidLoad(){
    this.userId = this.params.get('userId');
    this.getCateArticles();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
