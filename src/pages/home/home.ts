import {Component, ElementRef, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {
  NavController, ModalController, ViewController, LoadingController, InfiniteScroll, App, Slides,
  Content
} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomeService } from '../../providers/HomeService';
import {ToolsService} from "../../providers/ToolsService";
import {Subject, Subscription} from "rxjs";
import {LocalService} from "../local/local.service";

declare var $;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  isActive: number = 0;
  cateArticleId: any = 0;
  IPs: any[] = [];//IP
  activeIP: string[] = []; //当前所选中IP的简介
  selectedIndex: number = 0; //所选中IP的索引
  channels: any[] = [];//首页推荐栏目所有频道
  gallerys: string[] = [];
  scrolls: string[] = [];
  articles: string[] = [];
  feeds: string[] = [];
  pages: number = 1;
  feedPages:number = 1;
  infinite: any;
  infiniteStatus: boolean = true;
  tabStatus = {
    recommend: false,
    info: false,
    feed: false
  }
  hasNextPage:boolean = true;
  articleId$: Subject<string> = new Subject<any>();

    @ViewChild('container') content:Content;
  //轮播图配置
/*  slideOptions = {
    loop: false,
    autoplay: false,
    initialSlide: 0,
    pager: false,
    paginationHide: true,
    paginationClickable: true
  }*/

  homeTabs = 'info';
  subscription:Subscription = new Subscription();
  @Output("slideClick") slideClick = new EventEmitter<number>();

  constructor(public app: App,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private homeService: HomeService,
    public el: ElementRef,
    public loadingCtrl: LoadingController,
    public tools:ToolsService,
    public localService: LocalService
  ) {
  }

  ionViewDidLoad() {
    this.setTabStatus('info', false);
    this.getInfoData();
    // this.localService.getLonLatt();
    /*this.getRecomendIP();
    this.getRecomentChannel()*/
   }
/*  ngOnInit() {
    this.getRecomendIP()
    this.getRecomentChannel()
  }*/


  getInfiniteStatus(): boolean {
    return this.infiniteStatus;
  }

  setInfiniteStatus(newStatus: boolean) {
    this.infiniteStatus = newStatus;
  }

  getTabStatus(key: string) {
    return this.tabStatus[key]
  }

  setTabStatus(key: string, val: boolean) {
    this.tabStatus[key] = val;
  }

  // 获取首页推荐IP列表
  getRecomendIP() {
    if (!this.getTabStatus('recommend')) {
      this.setTabStatus('recommend', true);
      this.homeService.getRecommendIP().subscribe((res) => {
        this.IPs = res.data.list
        this.activeIP = this.IPs[0]//默认显示第一个IP
      });
    }
  }
  //选择IP
  selectSlide(index) {
    this.activeIP = this.IPs[index];
    this.selectedIndex = index;
    this.slideClick.emit(index);
  }
  //获取首页推荐栏目所有频道
  getRecomentChannel() {
    this.homeService.getRecomentChannel().subscribe((res) => {
      this.channels = res.data;
    })
  }
  getRecommendData() {
    if (!this.getTabStatus('recommend')) {
      this.setTabStatus('recommend', true);

      let loading = this.loadingCtrl.create({});
      loading.present();
      setTimeout(() => {
        loading.dismiss()
      }, 1000);
    }

  }

  getInfoData() {

    if (!this.getTabStatus('info')) {
      this.setTabStatus('info', true);
      this.tools.showLoading();
      this.subscription.add(
        this.homeService.GetBannerInfo().subscribe((res) => {
          if(!res || !res.hasOwnProperty('data')  || res.data.list.length == 0 ){
            return
          }
          for (let i = 0; i < res.data.list.length; i++) {
            this.gallerys.push(res.data.list[i]);
          }
        })
      );
      this.subscription.add(
        this.homeService.GetCateInfo().subscribe((res) => {
          if (!res || !res.hasOwnProperty('data')) {
            this.tools.hideLoading();
            return false;
          }
          for (let i = 0; i < res.data.length; i++) {
            this.scrolls.push(res.data[i]);
          }
          this.cateArticleId = res.data[0].cateId;

          $('.info-cate-box li').eq(0).click();
          this.subscription.add(
            this.homeService.GetCateArticles(this.cateArticleId).subscribe((res) => {
              if (!res || !res.hasOwnProperty('data') || res == false || !res.data.hasOwnProperty('list')) {
                this.tools.hideLoading();
                return false;
              }
              for (let i = 0; i < res.data.list.length; i++) {
                this.articles.push(res.data.list[i]);
              }
              this.pages++;
              this.tools.hideLoading();
            })
          )
        })
      )
    }
  }


  getFeedData() {
    if (!this.getTabStatus('feed')) {
      this.tools.showLoading();
      this.LoadFeed().then(() => {
        this.tools.hideLoading();
      });
    }
  }

  LoadFeed(){
    var page = this.feedPages;
    return new Promise((resolve) => {

      if(this.hasNextPage){
        this.subscription.add(
          this.homeService.GetFeedForGuest(page).subscribe((res) => {
            if (!res || (!res.hasOwnProperty('data') || res.data.length == 0) || res == false ) {
              resolve();
              return false;
            }
            this.feedPages++;
            for (let i = 0; i < res.data.list.length; i++) {
              this.feeds.push(res.data.list[i]);
            }
            this.hasNextPage = res.data.hasNextPage;
            resolve();
          }, (errorResponse) => {
            resolve();
          })
        )
      }else{
        resolve();
      }

    })
  }


  openLoginPage(item) {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }


  private getCateArticles(id: any, type: boolean = true) {

    return new Promise((resolve) => {
      var page = this.pages;
      this.homeService.GetCateArticles(this.cateArticleId, page).subscribe((res) => {

        if (!res.data || res == false) {
          resolve();
          return;
        }

        if (type == false) {
          this.articles = [];
        }
        this.pages++;
        for (let i = 0; i < res.data.list.length; i++) {
          this.articles.push(res.data.list[i]);
        }
        this.setInfiniteStatus(res.data.hasNextPage);
        resolve();
      }, (errorResponse) => {
        this.setInfiniteStatus(false);
        resolve();
      });
    })

  }


  cate(id: any) {
    if (id == false) {
      return;
    }
    this.articleId$.next(id);
    this.pages = 1;
    this.cateArticleId = id;
    this.getCateArticles(id, false).then(() => {
      this.setInfiniteStatus(true);
    });
  };


  doInfiniteForArticle(infiniteScroll: InfiniteScroll) {
    this.infinite = infiniteScroll;
    setTimeout(() => {
      if (this.getInfiniteStatus()) {
        let id = this.cateArticleId;
        this.getCateArticles(id).then(() => {
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
        infiniteScroll.enable(false);
      }
    }, 1000)
  }

  doInfiniteForFeed(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.LoadFeed().then(() => {
        infiniteScroll.complete();
        if (this.hasNextPage == false){
          infiniteScroll.enable(false)
        }
      })

    },1000)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
