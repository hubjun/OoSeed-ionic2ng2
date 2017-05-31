/**
 * Created by dell on 2017/4/18.
 */
import {Component, ViewChild} from "@angular/core";
import {Content, NavController, InfiniteScroll, NavParams} from "ionic-angular";
import {PersionalHomepageService} from "../../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
@Component({
  selector: 'homepage-feed',
  templateUrl: './homepage-feed.html',
  providers: [PersionalHomepageService]
})

export class HomepageFeedPage {
  userId: string;
  hasNextPage: boolean = true;
  feeds: Array<string> = [];
  states:boolean;
  page:number = 1;
  subscription: Subscription = new Subscription();
  @ViewChild('container') content: Content;

  constructor(
    public params:NavParams,
    public navCtrl: NavController,
    private persionalHomepageService:PersionalHomepageService
  ) {
  }

  LoadFeed() {
    return new Promise((resolve) => {
      if (this.hasNextPage) {
        if(this.states) {
          this.subscription.add(
            this.persionalHomepageService.getUserFeed(this.userId,this.page,10).subscribe((res) => {

              if (!res || (!res.hasOwnProperty('data') || res.data.length == 0) || res == false) {
                resolve();
                return false;
              }
              this.page++;
              for (let i = 0; i < res.data.list.length; i++) {
                this.feeds.push(res.data.list[i]);
              }
              this.hasNextPage = res.data.hasNextPage;
              resolve();
            }, (errorResponse) => {
              resolve();
            })
          )
        }else {
          this.subscription.add(
            this.persionalHomepageService.getUserFeedDigg(this.userId,this.page,10).subscribe((res) => {

              if (!res || (!res.hasOwnProperty('data') || res.data.length == 0) || res == false) {
                resolve();
                return false;
              }
              this.page++;
              for (let i = 0; i < res.data.list.length; i++) {
                this.feeds.push(res.data.list[i]);
              }
              this.hasNextPage = res.data.hasNextPage;
              resolve();
            }, (errorResponse) => {
              resolve();
            })
          )
        }
      } else {
        resolve();
      }

    })
  }

  doInfiniteForFeed(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.LoadFeed().then(() => {
        infiniteScroll.complete();
        if (this.hasNextPage == false) {
          infiniteScroll.enable(false)
        }
      })

    }, 1000)
  }

  ionViewDidLoad(){
    this.userId = this.params.get('userId');
    this.states = this.params.get('states');
    this.LoadFeed();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
