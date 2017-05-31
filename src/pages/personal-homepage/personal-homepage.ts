import {Component, Input} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {ViewChild} from "@angular/core/src/metadata/di";
import {PersionalHomepageService} from "../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {UserDataService} from "../../providers/UserDataSevice";
import {FeedbackSevice} from "../../providers/FeedbackSevice";
import {ToolsService} from "../../providers/ToolsService";


@Component({
  selector: 'page-personal-homepage',
  templateUrl: 'personal-homepage.html',
  providers: [PersionalHomepageService]
})
export class PersonalHomepagePage {
  subscription: Subscription = new Subscription();
  article: string[] = [];
  UserProfile = 'share';
  userId: string;
  userInfo: string[] = [];
  userFeed: string[] = [];
  offset:number = 200;
  @ViewChild('container') content: Content;

  constructor(
    private user:UserDataService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public tools:ToolsService,
    private feedback:FeedbackSevice,
    public http: PersionalHomepageService
  ) {
    this.userId = this.navParams.get('userid') || this.user.getUserid();
    this.http.getUserId(this.userId);
  }


  getUserInfo(userId: string) {
    this.subscription.add(
      this.http.getUserInfo(userId).subscribe((res) => {
        if (res.result == 0) {
          this.userInfo = res.data;
        }
      })
    )
  }

  getUserFeed(userId: string) {
    this.subscription.add(
      this.http.getUserFeed(userId).subscribe(res => {
        if (res && res.result == 0 && res.data && res.data.list) {
          let data = res.data.list;
          for (var i = 0; i < data.length; i++) {
            this.article.push(data[i]);
          }
        }
      })
    )
  }

  follow(followUserId:string,$event:any){
    $event.stopPropagation();
    if(this.user.hasLoggedIn() != null && this.user.getUserid() !=null){

      if($event.target.classList.contains('isFollow')){
        this.feedback.GetFeedFierd(followUserId,false).subscribe((res) => {
          if (!res)
            return;
          $event.target.classList.remove('isFollow');
          if(res.result == 0){
            this.tools.showToast(res.msg,1000)
          }
        })
      }else {
        this.feedback.GetFeedFierd(followUserId).subscribe((res) => {
          if (!res)
            return;
          $event.target.classList.add('isFollow');
          if(res.result == 0){
            this.tools.showToast(res.msg,1000)
          }
        })
      }

    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }
  }

  ionViewDidLoad() {
    this.getUserInfo(this.userId);
    this.getUserFeed(this.userId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
