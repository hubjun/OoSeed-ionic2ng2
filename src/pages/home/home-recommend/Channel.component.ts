/**
 * Created by allenou on 2017/3/10.
 */
import { Component, Input } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
  selector: 'channel',
  template: `
      <div class="recommend-modules" *ngFor="let channel of channels">
            <div class="recommend-modules-header">
              <span class="title">{{channel.cateTitle}}</span>
              <span class="get-more">更多></span>
            </div>
            <div class="recommend-modules-content" >
              <div class="item"  *ngFor="let item of channel.homePageList">
                <img alt="" src="../../assets/images/yaoming.png">
                <div class="name">{{item.authName}}</div>
              </div>
            </div>
     </div>
  `
})

export class ChannelComponent {
  @Input() channels:any[]
  constructor(private params: NavParams) {
  
  }

}
