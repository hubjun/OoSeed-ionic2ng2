import {Component, Input} from '@angular/core';
import {PersionalHomepageService} from "../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";
import {NavController} from "ionic-angular";
import {ToolsService} from "../../../providers/ToolsService";
import {TeamDetailPage} from "../../me/my-team/team-homepage/team-detail";

@Component({
  selector: 'page-homepage-groups',
  templateUrl: 'homepage-groups.html'
})
export class HomepageGroupsPage {
  @Input() content;
  userId:string;
  joinTeam:Array<string> = [];
  createTeam:Array<string> = [];
  content1:boolean = false;
  content2:boolean = false;
  subscription:Subscription = new Subscription;

  constructor(
    public navCtrl:NavController,
    private http:PersionalHomepageService,
    private tools: ToolsService
  ) {
    this.userId = this.http.userId;
  }

  downApp(){
    this.tools.presentConfirm();
  };

  getUserCreateTeam(userId:string){
    this.subscription.add(
      this.http.getUserCreateTeam(userId).subscribe(res => {
        if(res && res.result == 0 && res.data.list.length > 0) {
          this.content1 = true;
          let data = res.data.list;
          for (var i = 0; i< data.length;i++) {
            this.createTeam.push(res.data.list[i])
          }
        }
      })
    )
  }

  getUserJoinTeam(userId:string){
    this.subscription.add(
      this.http.getUserJoinTeam(userId).subscribe(res => {
        if(res && res.result == 0 && res.data.list.length > 0) {
          this.content2 = true;
          let data = res.data.list;
          for (var i = 0; i< data.length;i++) {
            this.joinTeam.push(res.data.list[i])
          }
        }
      })
    )
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
    this.getUserCreateTeam(this.userId);
    this.getUserJoinTeam(this.userId);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
