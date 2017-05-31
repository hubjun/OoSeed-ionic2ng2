/**
 * Created by dell on 2017/4/20.
 */
import {Component} from '@angular/core';
import {PersionalHomepageService} from "../../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {NavParams, Content, NavController} from "ionic-angular";
import {UserDataService} from "../../../../providers/UserDataSevice";
import {FeedbackSevice} from "../../../../providers/FeedbackSevice";
import {ToolsService} from "../../../../providers/ToolsService";
import {ViewChild} from "@angular/core/src/metadata/di";
import {PersonalHomepagePage} from "../../personal-homepage";
import {TeamDetailPage} from "../../../me/my-team/team-homepage/team-detail";

@Component({
  selector: 'page-homepage-fanslist',
  templateUrl: './homepage-fanslist.html',
  providers:[PersionalHomepageService]
})
export class HomepageFanslistPage {
  title:string;
  userId: string;
  satates:boolean = false;
  fans: Array<string> = [];
  follows:Array<string> = [];

  @ViewChild('container') content : Content;
  subscription: Subscription = new Subscription();

  constructor(
    public params:NavParams,
    public tools:ToolsService,
    public navCtrl:NavController,
    private user:UserDataService,
    private feedback:FeedbackSevice,
    private http: PersionalHomepageService
  ) {
  }

  getFans(userId: string,states:boolean = true) {
    if (states) {
      this.subscription.add(
        this.http.getUserFindFans(userId,1,20).subscribe(res => {
          if(res && res.result == 0 && res.data.list.length > 0) {
            let data = res.data.list;
            for (var i = 0; i< data.length;i++) {
              this.fans.push(data[i])
            }
          }
        })
      );
    }
    if(!states) {
      this.subscription.add(
        this.http.getUserFidFollow(userId,1,20).subscribe(res => {
          if(res && res.result == 0 && res.data.list.length > 0) {
            let data = res.data.list;
            for (var i = 0; i< data.length;i++) {
              this.fans.push(data[i])
            }
          }
        })
      );
    }

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

  goToPersonalPage(userid:string){
    this.navCtrl.push(PersonalHomepagePage,{
      userid:userid
    })
  }

  goToOtherPage(item){
    if (!item)
      return;
    let id = !!item.orgInfoVO ? item.orgInfoVO.orgId : item.userId ;
    !!item.orgInfoVO ? this.goToTeamHomepage(id) : this.goToPersonalPage(id);
  }

  goToTeamHomepage(teamId:string){
    if (!teamId) {
      return
    }
    this.navCtrl.push(
      TeamDetailPage,
      {id:teamId}
    )
  }

  ngOnInit() {
    this.userId = this.params.get('userId');
    this.satates = this.params.get('states');
    this.getFans(this.userId,this.satates);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
