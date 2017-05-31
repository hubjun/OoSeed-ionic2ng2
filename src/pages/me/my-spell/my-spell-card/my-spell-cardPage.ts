/**
 * Created by dell on 2017/4/12.
 */
/**
 * Created by baoww on 2017/4/6.
 */
import { Component,Input,OnInit,Injectable, EventEmitter} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController} from "ionic-angular";
import {mySpellDetail} from "./my-spell-card-detailPage";
import {ArticleCommentsPage} from '../../../ArticleComments.component';
import {ToolsService} from "../../../../providers/ToolsService";
import {HttpService} from "../../../../providers/HttpService";
import { Subscription } from "rxjs";
import {LocalService} from "../../../local/local.service";
import {PersonalHomepagePage} from "../../../personal-homepage/personal-homepage";

declare var $;
@Component({
  selector: 'spell-ball-channel-sep',
  templateUrl: 'my-spell-cardPage.html',
})

export class mySpellBallPage {
  public mySpellData:string[]=[];
  public mySpellShow:string;
  subscription: Subscription = new Subscription();
  public defaulticon = 'assets/icon/concern_default_head.png';
  public INFO_MY_LAUNCH_URL:string='/user/city/fight/findMyCreate'; //我发起的拼球信息列表
  public locationDistance:string;
  public mySpellCheck:any;

  @Input() mySpellIds:string;
  constructor(
    public navCtrl:NavController,
    public navParams:NavParams,
    private httpService: HttpService,
    public localService: LocalService,
    private toolsService: ToolsService
  ) {

    this.subscription.add(
      this.localService.postPara.subscribe((obj)=>{
          this.toolsService.showLoading();
          let params = {
            userId: localStorage.getItem('userid'),
            longitude: this.localService.coor.long,
            latitude: this.localService.coor.lat,
            page:1,
            rows:20
          };
          if(this.localService.coor.long==0&&this.localService.coor.lat==0){
            this.toolsService.presentConfirm('定位失败');
            this.locationDistance='未知';
          }
          this.MyLaunchSpellCompetition(params);
          this.toolsService.showLoading();
        })
    )
  }
//获取我发起的拼球信息
  getMyLaunchSpellInfo(obj){
    let url=this.INFO_MY_LAUNCH_URL;
    let uri=this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map((res)=>res.json());
  }
  //查询我发起的拼球
  MyLaunchSpellCompetition(params:any){
    this.subscription.add(
      this.getMyLaunchSpellInfo(params).subscribe((res) => {
        if(res.result==0){
          let mySpellBlock=res.data.list;
          for(let i=0;i<mySpellBlock.length;i++){
            if(!mySpellBlock[i].iconUrl||mySpellBlock[i].iconUrl==''){
              mySpellBlock[i]=this.defaulticon;
            }
          }
          if(res.data.list.length==0){
            this.mySpellCheck=0;
          }
          this.mySpellData=mySpellBlock;
          this.mySpellData.length>0?(this.mySpellShow='hide'):(this.mySpellShow='show');
          this.toolsService.hideLoading();
        }
      })
    )
  }

  TipCommon(){
    this.toolsService.presentConfirm();
  };
  ngOnInit(){
    // this.localService.getLonLatt();
    this.mySpellShow='hide';
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
  goToMySpellDetail(fightId,mySpell){
    this.navCtrl.push(mySpellDetail,{
      "fightId":fightId,
      "mySpell":mySpell
    })
  }
  goPersonalPage(userid:string){
    this.navCtrl.push(PersonalHomepagePage,{
      'userid':userid
    })
  }
}
