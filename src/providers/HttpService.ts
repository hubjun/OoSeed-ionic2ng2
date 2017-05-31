/**
 * Created by chenwenhao on 2017/1/13.
 * @description 此模块是所有http请求的方法跟模块
 * @param APP_HPST = 'http://192.168.10.45:8089'; 开发环境IP ADDRESS
 * @param APP_HOST = 'http://192.168.10.46:8089'; 测试环境IP ADDRESS
 * @param APP_HOST = 'http://h5.13322cc.com/api/v1'; 生产环境IP ADDRESS
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ToolsService} from "./ToolsService";
declare var $;

@Injectable()

export class HttpService {

   private APP_HOST = 'http://192.168.10.46:8089/api/v1';   //测试地址
   //private APP_HOST = 'http://h5.13322cc.com/api/v1'; //生产地址
   // private APP_HOST = 'http://h5.oooseed.com/api/v1'; //生产地址
   // private APP_HOST = 'http://192.168.10.45:8089/api/v1';   //开发地址

  constructor(
    private http: Http,
    private tools:ToolsService
  ) { }

  public get(url: string): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-type', 'application/json')
    let options = new ResponseOptions({ headers: headers });
    let URL = this.APP_HOST + url;

    return this.http.get(URL, options)

  }

  public post(url: string, data: any): Observable<Response> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new ResponseOptions({ headers: headers });
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);
    return this.http.post(URL, body, options)
  }

  public authenticate(url: string, data: any): Observable<Response> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let URL = this.APP_HOST + url;
    let options = new ResponseOptions({ headers: headers });
    let body = this.tools.param(data);

    return this.http.post(URL, body, options)
  }

  /**
   * 文件上传
   * @param url 接口路径
   * @param file 文件流
   * @author allenou
   */
  public upload(url: string, file: any): Observable<Response> {
    let formData = new FormData();
    let reader = new FileReader();
    let headers = new Headers();

    formData.append(file.name, file);
    reader.readAsText(file, "UTF-8");

    let boundary = '';
    reader.onload = function () {
      boundary = reader.result;
      headers.append('Content-Type', 'multipart/form-data;boundary=' + boundary);
    }

    let URL = this.APP_HOST + url;
    let options = new ResponseOptions({ headers: headers });

    return this.http.post(URL, formData, options)
  }


  public delete(url:string){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded')
    let options = new ResponseOptions({ headers: headers });
    let URL = this.APP_HOST + url;

    return this.http.delete(URL, options)
  }

  public put(url:string){
    let headers = new Headers();
    headers.append('Content-type', 'application/json')
    let options = new ResponseOptions({ headers: headers });
    let URL = this.APP_HOST + url;

    return this.http.put(URL, options)
  }

  public putUrlencode(url:string,data: any){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let options = new ResponseOptions({ headers: headers });
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);

    return this.http.put(URL,body, options)
  }

  /**
   * 对复杂JSON对象put方法
   * url:接口url
   * opt:JSON对象
   */
  public putJsonObj(url: string, opt: any){
    let headers = new Headers({'Content-Type': 'application/json;'});
    let options = new RequestOptions({headers: headers});
    let URL = this.APP_HOST + url;
    let body = JSON.stringify(opt);

    return this.http.put(URL, body, options)
  }

  private handleError(error: Response) {
    return Observable.throw('Server Error');
  }

}
