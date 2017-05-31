/**
 * Created by dell on 2017/4/10.
 */
import {Component,Input,OnInit,Injectable, EventEmitter} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {ToolsService} from "../../../providers/ToolsService";
import {HttpService} from "../../../providers/HttpService";

declare var $;
@Component({
  selector:'page-article-details',
  templateUrl: './my-spell.html',
})

export class mySpell{
  public myspellid:string='Launch';
  public activities:string='activities';
  public filterTypes: EventEmitter<any>;
  public filterResults: EventEmitter<any>;
  public classTag:string='LaunchClass';

  constructor(
    public navCtrl:NavController,
    public navParams:NavParams,
  ){
    this.filterTypes = new EventEmitter();
    this.filterResults = new EventEmitter();
  }

  myLaunch(){
    this.classTag='LaunchClass';
    $('.my-launch-page').show();
    $('.my-activities-page').hide();
  }
  myActivities(){
    this.classTag='activitiesClass';
    $('.my-launch-page').hide();
    $('.my-activities-page').show();
  }
}
