/**
 * Created by chenwenhao on 2017/2/27.
 */
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
@Component({
  selector:'page-authentication-protocol',
  templateUrl:'authentication-protocol.html'
})
export class AuthenticationProtocolPage {
  public isApp:number = 0;
  constructor(public navParams:NavParams){
    this.isApp = this.navParams.get('isApp');
  }

}
