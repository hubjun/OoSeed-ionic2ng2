/**
 * Created by dell on 2017/1/4.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

export class PublicMethods{
  constructor(public nav: NavController, public navParams: NavParams){

  }

  goToPage(target){
    this.nav.pop();
  }
}
