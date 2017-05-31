import {Component, Input} from '@angular/core';
import {PersionalHomepageService} from "../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {NavController} from "ionic-angular";
import {HomepageFanslistPage} from "./hoempage-fanslist/homepage-fanslist";
import {PersonalHomepagePage} from "../personal-homepage";
import {UserDataService} from "../../../providers/UserDataSevice";
import {TeamDetailPage} from "../../me/my-team/team-homepage/team-detail";

@Component({
  selector: 'page-homepage-fans',
  templateUrl: 'homepage-fans.html'
})
export class HomepageFansPage {
  @Input() content;
  userId: string;
  fans: Array<string> = [];
  fansTotal:number;
  follows:Array<string> = [];
  followsTotal:number;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl:NavController,
    private user:UserDataService,
    private http: PersionalHomepageService
  ) {
  }

  getFans(userId: string) {
    this.subscription.add(
      this.http.getUserFindFans(userId).subscribe(res => {
        if(res && res.result == 0 && res.data.list.length > 0) {
          let data = res.data.list;
          for (var i = 0; i< data.length;i++) {
            this.fans.push(res.data.list[i])
          }
          this.fansTotal =  res.data.total;
        }
      })
    );
    this.subscription.add(
      this.http.getUserFidFollow(userId).subscribe(res => {
        if(res && res.result == 0 && res.data.list.length > 0) {
          let data = res.data.list
          for (var i = 0; i< data.length;i++) {
            this.follows.push(res.data.list[i])
          }
          this.followsTotal =  res.data.total;
        }
      })
    );
  }

  goToFanslist(states:boolean){
    this.navCtrl.push(HomepageFanslistPage, {
      userId: this.userId,
      states:states
    });
  }

  goToOtherPage(item){
    if (!item)
      return;
    let id = !!item.orgInfoVO ? item.orgInfoVO.orgId : item.userId ;
    !!item.orgInfoVO ? this.goToTeamHomepage(id) : this.goToPersonalPage(id);
  }

  goToPersonalPage(userid:string){
    if (!userid) {
      return
    }
    this.navCtrl.push(PersonalHomepagePage,{
      userid:userid
    })
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
    this.userId = this.http.userId;
    this.getFans(this.userId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
