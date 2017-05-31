import {Injectable} from '@angular/core';
import {
  Http, Response, RequestOptions, ConnectionBackend, RequestOptionsArgs, Headers,
  ResponseOptions
} from '@angular/http';


import {Observable} from "rxjs";
import {HttpInterceptHandle} from "./HttpInterceptHandle";
import {UserDataService} from "./UserDataSevice";
import {Events} from "ionic-angular";

const  ClientType:string = '4';
@Injectable()
export class HttpIntercept extends Http {

  private userid:string ;
  private token:string ;
  private HAS_LOGGED_IN:boolean = false;
  constructor(
    public backend: ConnectionBackend,
    public defaultOptions: RequestOptions,
    public _: HttpInterceptHandle,
    public userData:UserDataService,
    public events:Events
  ) {
    super(backend, defaultOptions);
      this.getUserData()
  }


  getUserData(){
    this.userid = this.userData.getUserid();
    this.token = this.userData.getToken();
    this.HAS_LOGGED_IN = !!this.userData.hasLoggedIn();
  }
  _setCustomHeaders(options?: RequestOptionsArgs):RequestOptionsArgs{


    if(!options) {
      options = new RequestOptions({});
    }
    if (!options.headers) {
      options.headers = new Headers();
    }

    if(this.userData.hasLoggedIn() == 'false' || this.userData.hasLoggedIn() == null){
      options.headers.set("X-SNS-UserId", '');
      options.headers.set("X-SNS-Timestamp", '');
      options.headers.set("X-SNS-Signature",'');
      options.headers.set("X-SNS-ClientType",ClientType);
    }else{
      this.getUserData();

      let timestamp = new Date().getTime();
      let signature = this.userData.buildSignature(this.userid,this.token,timestamp)
      options.headers.set("X-SNS-UserId", this.userid);
      options.headers.set("X-SNS-Timestamp", timestamp.toString());
      options.headers.set("X-SNS-Signature",signature);
      options.headers.set("X-SNS-ClientType",ClientType);
    }

    //console.log('userid:'+this.userid,'token:'+this.token,'login'+this.HAS_LOGGED_IN)

    return options;
  }
  get(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);

    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {

      super.get(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.post(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.put(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  delete(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.delete(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.patch(url, body, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }


  head(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.head(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }


  options(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    this._.events.publish("request:before", url, options,this.HAS_LOGGED_IN);
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.options(url, options).subscribe(res => {
        this._.events.publish("request:success", url, options, res);
        observer.next(res);
      }, err => {
        this._.events.publish("request:error", url, options, err);
        observer.error(err);
      });
    });
  }

}
