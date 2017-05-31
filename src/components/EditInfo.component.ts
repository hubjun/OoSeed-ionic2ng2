/**
 * Created by allenou on 2017/3/7.
 */
import {Component, Input} from '@angular/core';
import {MeService} from "../pages/me/me.service";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'edit-info',
  template: `
      <ion-header id="user-header">
        <ion-toolbar color="c10">
          <ion-title>编辑{{title}}</ion-title>
          <ion-buttons end >
          <button ion-button color="" (click)="updateInfo(info.value)">保存</button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="gray-background">
           <ion-input placeholder="请输入内容" #info></ion-input>
      </ion-content>
  `
})

export class EditInfoComponent {
  @Input() title: string

  constructor(private params:NavParams,private modifyInfoService: MeService) {

  }

  updateInfo(value) {
    let type=this.params.get('type')
    this.modifyInfoService.updateInfo(type,value)

  }
}
