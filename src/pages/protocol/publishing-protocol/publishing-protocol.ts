/**
 * Created by chenwenhao on 2017/2/27.
 */
import {Component, Renderer, ViewChild} from "@angular/core";
import {NavParams, ViewController, Content} from "ionic-angular";
@Component({
  selector:'page-publishing-protocol',
  templateUrl:'publishing-protocol.html'
})
export class PublishingProtocolPage {
  public isApp:number = 0;

  @ViewChild(Content) content:Content;
  constructor(
    public navParams:NavParams,
    public viewCtrl:ViewController,
    public renderer:Renderer
  ){
    this.isApp = this.navParams.get('isApp');

  }

  ionViewWillEnter(){
    this.setViewFullScreen();
  }
  setViewFullScreen(){
    if(this.isApp == 1){
      const pageEleRef = this.viewCtrl.pageRef();
      if(pageEleRef){
        console.log('++++++++++++++++++++++++')
        this.renderer.setElementClass(pageEleRef.nativeElement,'tab-subpage',true);
        this.renderer.setElementStyle(pageEleRef.nativeElement,'z-index','101')
      }
    }
  }
}
