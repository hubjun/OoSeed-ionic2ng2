/**
 * Created by chenwenhao on 2017/3/6.
 */
import {Events} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {ToolsService} from "../../src/providers/ToolsService";
import {UserDataService} from "./UserDataSevice";

@Injectable()
export class HttpInterceptHandle {
  constructor(
    public events: Events,
    public tools:ToolsService,
    public userData:UserDataService
  ) {
    events.subscribe('request:before', (url, options,status) => {
      let userParam = url.indexOf('user');
      let guestParam = url.indexOf('user/_guest');
      if(userParam > -1){
        if(guestParam > -1){

        }else{
          if(!status){
            this.userData.showLoginPage();
          }
        }
      }

     // console.log( '%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
    });

    events.subscribe('request:success', (url, options, response) => {
      let res = response.json();
      if(res.result && res.result == "2103" ){
        //tools.hideLoading();
        this.userData.showLoginPage();
      }
      // tools.hideLoading();
      //console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
    });

    events.subscribe('request:error', (url, options, error) => {
      //console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'error', error);
      let status = error.status;
      if (status === 0) {
        // tools.hideLoading();
        tools.showToast('请求响应错误，请检查网络');
      } else if (status === 404) {
        // tools.hideLoading();
        tools.showToast('请求链接不存在');
      } else if (status === 500) {
        // tools.hideLoading();
        tools.showToast('服务器出错，请稍后再试');
      } else {
        // tools.hideLoading();
        tools.showToast('未知错误，请检查网络');
      }
    });
  }

}

