/**
 * Created by dell on 2017/4/12.
 */
/**
 * Created by dell on 2017/4/6.
 */
import {Component,Input,OnInit,Injectable, EventEmitter} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {ToolsService} from "../../../../providers/ToolsService";
import {HttpService} from "../../../../providers/HttpService";
import {PersonalHomepagePage} from "../../../personal-homepage/personal-homepage";


declare var $;
@Component({
  selector:'page-article-details',
  templateUrl: 'my-spell-card-detailPage.html',
})

  export  class mySpellDetail {
    private spellToggle=false;
    public mySpellDataDetail:string[]=[];
    public defaulticon = 'assets/icon/concern_default_head.png';
    public INFO_MY_ACTIVITIES_URL:string='/user/_guest/city/fight/fightInfo'; //我发起的拼球详情
    public joinListCheck:string[]=[];
    public peddingListCheck:string[]=[];
    public signEndTime:any;

    @Input() myActivities:string;
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public tools : ToolsService,
    private httpService: HttpService,
  ){

  }

//获取我发起的拼球详情
  getMyLaunchSpellDetailInfo(obj){
    let url=this.INFO_MY_ACTIVITIES_URL;
    let uri=this.tools.param(obj);
    return this.httpService.get(`${url}?${uri}`).map((res)=>res.json());
  }
  MyLaunchSpellDetailCompetition(params:any){
    this.getMyLaunchSpellDetailInfo(params).subscribe((res) => {
      if(res.result==0){
        let list=res.data;
        if(res.data.joinList){
          this.joinListCheck=res.data.joinList;
        }
        if(res.data.pendList){
          this.peddingListCheck=res.data.pendList;
        }
        if(!list.iconUrl){
          list.ionUrl=this.defaulticon;
        }
        this.mySpellDataDetail=list;


        if(res.data.days==0||!res.data.days){
          let timeNow=new Date().getTime();
          this.signEndTime=(parseFloat(res.data.startTime)-parseFloat(res.data.signEnd)*3600*1000-timeNow)/1000;
        }

      }
    })
  };
  TipCommon(){
    this.tools.presentConfirm();
  };
  ngOnInit() {
    this.navParams.get('fightId');
    let params = {
      page:1,
      rows:100,
      lon: 114.085947,
      lat: 22.547,
      userId: localStorage.getItem('userid'),
      fightId:this.navParams.get('fightId')
    };
    this.MyLaunchSpellDetailCompetition(params);
  }
  ngAfterViewChecked(){
    $('.spellTeamPending>ul>li>p').css('width',$('.spellTeamPending>ul>li').width()-$('.spellTeamPending>ul>li>img').width()-20);
    $('.spellTeamMember>ul>li>p').css('width',$('.spellTeamMember>ul>li').width()-$('.spellTeamMember>ul>li>img').width()-20);
  }

  ngAfterViewInit(){
    $('.mySpellDataDetailGrayBg').css('height',$('.mySpellDataDetailPageBodyoo').height()-$('.myLaunchSpellManager').height()-$('.mySpellDataDetailPageHeaderoo').height());
  }

  mySpellDataDetailToggle(){
    if(this.spellToggle==true){
      this.spellToggle=false;
    }else{
      this.spellToggle=true;
    }
  }
  goPersonalPage(userid:string){
    this.navCtrl.push(PersonalHomepagePage,{
      'userid':userid
    })
  }


}

