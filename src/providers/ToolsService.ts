/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Injectable } from '@angular/core';
import {ModalController, Loading, LoadingController, ToastController} from 'ionic-angular';
import { Md5 } from "ts-md5/dist/md5";
import {StatusCodeService} from "./StatusCodeService";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ToolsService {
  private loading: Loading;
  private loadingRunning: boolean = false;
  private toastRunning: boolean = false;
  constructor(
    /*    public navCtrl: NavController,*/
    public modalCtl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public code: StatusCodeService,
    public alertCtrl: AlertController
  ) { }

  formatFunc(obj) {
    return eval(obj);
  }
  goToRootPage(item) {
    this.formatFunc(item);
  }
  openModalPage(item) {
    this.formatFunc(item);
    let modal = this.modalCtl.create(eval(item));
    modal.present();
  }

  set(target, states) {
    target = states;
  }

  get(target) {
    return target;
  }

  /**
   * @description MD5加密
   * @param key 加密的内容
   * @returns {string} md5加密后大写的内容
   */
  encryption(key: string) {
    let keys = Md5.hashStr(key).toString();

    return keys.toUpperCase();
  }

  /**
   * 格式化需要调用post请求需要的from数据
   * @param value
   * @returns {string} 格式化后数据的格式{email=example@gmail.com&password=abcd}
   */
  param(value) {
    return Object.keys(value).map((key)=>{
      return encodeURIComponent(key) + '=' + encodeURIComponent(value[key]);
    }).join('&');
  }

  /**
   * 格式化需要调用post请求需要的特殊from数据
   * 配合build
   * @param value
   * @returns {string} 格式化后数据的格式{email=example@gmail.com&password=abcd}
   */

  params(value){
    var s = [],
      add = function( key, value ) {
        s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
      };
    if (Array.isArray(value)) {
      for ( var v in value ) {
        add(v, value[v]);
      }
    } else {
      for ( var prefix in value ) {
        this.build( prefix, value[ prefix ], add );
      }
    }

    return s.join( "&" );
  }

  build(prefix, obj, add) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        this.build(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
      }
    } else if (typeof(obj) == "object") {
      for ( var name in obj ) {
        this.build( prefix + "." + name, obj[ name ], add );
      }
    } else {
      add( prefix, obj );
    }
  }

  /**
   * @description 调用此方法显示loading
   * @param content 显示的内容
   * @param duration 持续的时间,默认为5s
   */
  showLoading(content: string = '', duration: number = 5000) {
    if (!this.loadingRunning) {
      this.loadingRunning = true;
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: false,
        content: content,
        showBackdrop: false,
      });
      this.loading.present();
      setTimeout(() => {
        this.loading.dismiss().catch(() =>{});
        this.loadingRunning = false;
      }, duration)
    }
  }

  /**
   * @description 关闭loading
   */
  hideLoading(callback?:any) {
    if (this.loadingRunning) {
      this.loading.dismiss().then(callback).catch(() =>{});
      this.loadingRunning = false;
    }
  }

  /**
   * @description 调用此方法显示toast
   * @param message 提示语
   * @param duration 持续时间
   */
  showToast(message: string = '操作完成', duration: number = 2000, callback?) {
    if (this.loadingRunning) {
      this.hideLoading();
    }
    if (!this.toastRunning) {
      this.toastRunning = true;
      let toast = this.toastCtrl.create({
        cssClass: 'htxk-toast',
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      });

      toast.onDidDismiss(() => {
        if (callback) {
          callback();
        }
        this.toastRunning = false;
      })

      toast.present()
    }
  }

  //Basic Alert
  showAlert(title:string,Tips:string,ok:string = '确定') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: Tips,
      buttons: [ok]
    });
    alert.present();
  }

  //弹出框确认
  presentConfirm(location?:string) {
    let alert = this.alertCtrl.create({
      title: '提 示',
      message:location?location:'下载球苗App，看更多精彩内容',
      buttons: location?(
        [{
          text: '确定',
          handler: () => {
            if(!location){
              window.open("http://h5.oooseed.com/app/activity/index.html");
            }
          }
        }]):([
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            if(!location){
              window.open("http://h5.oooseed.com/app/activity/index.html");
            }
          }
        }
      ])
    });
    alert.present();
  }

  /**
   * 操作提示（上传，更新，错误等）
   * 默认1500ms
   */
  tips(msg: string, duration: any) {
    duration = duration == null || duration == '' ? 1500 : duration;
    let loading = this.loadingCtrl.create({
      cssClass: 'tipsClass',
      spinner: 'hide',
      content: msg,
      duration: duration,
      showBackdrop: true
    });
    loading.onDidDismiss(() => {
    });
    loading.present();
  }

  showStatusCodeMsg(codeName,duration:any = 1500){
    let message = this.code.getStatusCode(codeName);
    this.showToast(message,duration)
  }
    //弹出框确认
  showConfirm(title:string,msg:string,confirmCallback:any,cancelCallback?:any) {
    let confirm = this.alertCtrl.create({
      title:title,
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            cancelCallback();
          }
        },
        {
          text: '确认',
          handler: () => {
            confirmCallback()
          }
        }
      ]
    });
    confirm.present();
  }

}
