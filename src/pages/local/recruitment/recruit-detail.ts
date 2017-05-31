import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalService } from "../local.service";
import { ToolsService } from "../../../providers/ToolsService";
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-recruit-detail',
  templateUrl: 'recruit-detail.html'
})

export class RecruitDetailPage {
  recruitID: number;
  private spellToggle = false;
  detailObj: any[] = [];
  public defaulticon = 'assets/icon/concern_default_head.png';
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private tools: ToolsService
  ) {
    this.recruitID = navParams.get('recruitID');
  }

  spellDetailToggle(){
    if(this.spellToggle==true){
      this.spellToggle=false;
    }else{
      this.spellToggle=true;
    }
  }

  getRecruitDeital(){
    this.subscription.add(
      this.localService.getRecruitDetail(this.recruitID)
        .subscribe(rs => {
          if(rs.result === '0'){
            console.log(rs);
            this.detailObj = rs.data;
          }else {
            this.tools.tips(rs.msg,null);
          }
        })
    );
  };

  tipClick(){
    // this.tools.showAlert('提 示','请登录APP做进一步操作~','确 定');
    this.tools.presentConfirm();
  };

  ngOnInit(){
    this.getRecruitDeital();
  };

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
