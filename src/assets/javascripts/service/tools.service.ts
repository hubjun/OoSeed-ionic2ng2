/**
 * Created by 陈文豪 on 2017/1/9.
 */
import {Component,Injectable} from '@angular/core';
import {NavController,ViewController,ModalController} from 'ionic-angular';
@Injectable()
export class Tools {
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtl: ModalController
  ){}

  formatFunc(obj){
    return eval(obj);
  }
  goToRootPage(item){
    this.formatFunc(item);
    console.log(typeof item);
    this.navCtrl.setRoot(item);
  }
  openModalPage(item){
    console.log('enter this');
    this.formatFunc(item);
    let modal = this.modalCtl.create(eval(item));
    modal.present();
  }
}
