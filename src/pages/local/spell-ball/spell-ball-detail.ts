/**
 * Created by dell on 2017/4/6.
 */
import {Component,Input,OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {ToolsService} from "../../../providers/ToolsService";
import {LocalService} from "../local.service";
import {PersonalHomepagePage} from "../../personal-homepage/personal-homepage";
import { Subscription } from "rxjs";

@Component({
  selector:'page-article-details',
  templateUrl: 'spell-ball-detail.html',
})

export  class localDetailInner {
  private spellToggle=false;
  public spellDetail:string[]=[];
  private joinSize:string;
  public defaulticon = 'assets/icon/concern_default_head.png';
  public joinListCheck:string[]=[];
  public phoneCheck:string;
  public haveJoin:string;
  public signEndTime:any;
  public timeDate;any;
  subscription: Subscription = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public tools : ToolsService,
    public localService:LocalService
  ){

  }
  private fightId=this.navParams.get('fightId');
  getCateTeamDetailInfoArticle(){
    this.subscription.add(
      this.localService.getTeamCardDetailInfo(this.fightId,).subscribe((res)=>{
        if(res.result==0){
          let list=res.data;
          if(!list.iconUrl||list.iconUrl==''){
            list.ionUrl=this.defaulticon;
          }
          this.spellDetail=list;

          if(res.data.joinList){
            for(let j=0;j<res.data.joinList.length;j++){
              if(!res.data.joinList[j].ionUrl||res.data.joinList[j].ionUrl==''){
                res.data.joinList[j].ionUrl=this.defaulticon;
              }
              if(localStorage.getItem('userid')){
                if(res.data.joinList[j].userId==localStorage.getItem('userid')){
                    this.haveJoin='joined';
                }
              }
            }
            this.joinListCheck=res.data.joinList;
          }
          if(!res.data.phone){
            this.phoneCheck='无';
          }

          if(res.data.phone){
            this.phoneCheck=res.data.phone.slice(0,3)+'***'+res.data.phone.slice(-3,res.data.phone.length);
            if(localStorage.getItem('userid')){
              this.phoneCheck=res.data.phone;
            }
          }
          if(res.data.days==0||!res.data.days){
            this.timeDate='yes';
            let timeNow=new Date().getTime();
            this.signEndTime=(parseFloat(res.data.startTime)-parseFloat(res.data.signEnd)*3600*1000-timeNow)/1000;
          }

        }
      })
    )
  }

  TipCommon(obj){
    if(obj=='1'&&this.haveJoin!='joined'){
      this.tools.presentConfirm();
    }
  }

  ngOnInit() {
    this.navParams.get('fightId');
    this.getCateTeamDetailInfoArticle();
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(){
    $('.spellDetailGrayBg').css('height',$('.spellDetailPageBody1').height()-$('.joinFixed').height()-$('.spellDetailPageHeader1').height());
  }
  ngAfterViewChecked(){
    $('.spellTeamMember .spellUl .spellUlLi .spellUlLiP').css('width',$('.spellTeamMember .spellUl .spellUlLi').width()-$('.spellTeamMember .spellUl .spellUlLi .spellUlImg').width()-20);
  }
  spellDetailToggle(){
    if(this.spellToggle==true){
      this.spellToggle=false;
    }else{
      this.spellToggle=true;
    }
  }

  goPersonalPage(userid:string){
    this.navCtrl.push(PersonalHomepagePage,{
      'userId':userid
    })
  }

}

