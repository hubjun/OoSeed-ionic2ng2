import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams, Http, Response } from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpService} from './HttpService';

@Injectable()
export class VideoService {
  // private APP_HOST = 'http://192.168.10.46:8089';
  private tvDemandUrl = '/feed/recommend';
  private tvDemandSlideUrl = '/file/playturn';
  // private tvDemandCate = 'http://192.168.10.234:8089/video/cate';
  private tvDemandCateUrl = '/video/home';
  private videoListUrl = '/video/homeMore';
  private videoStorageUrl = '/video/videoGallery';
  private demandVideoDetail = '/video';
  private videoCategory = '/video/id/list';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    public http: Http,
    public httpService: HttpService,
  ) {}

  getTvDemandList(): Observable<any>  {
    let params = new URLSearchParams();
    params.set('page', '1');
    params.set('rows', '10');
    return this.httpService.get(this.tvDemandUrl+`?${params}`)
      .map((rs: Response) => rs.json())

  }

  getTvDemandSlides(): Observable<any> {
    let params = new URLSearchParams();
    params.set('resPosition', '6002');
    params.set('rows', '5');
    return this.httpService.get(this.tvDemandSlideUrl+`?${params}`)
      .map((rs: Response) => rs.json())
  }

  getTvDemandCate(): Observable<any> {

    return this.httpService.get(this.tvDemandCateUrl)
      .map((rs: Response) => rs.json())

  }

  getVideoList(cateID):Observable<any>{
    // this.params.set('cateId', '10');
    let params = new URLSearchParams();
    params.set('cateId', cateID);
    return this.httpService.get(this.videoListUrl+`?${params}`)
      .map((rs: Response) => rs.json())
  }

  getVideoStorage():Observable<any>{
    let params = new URLSearchParams();
    params.set('page', '1');
    params.set('rows', '10');
    return this.httpService.get(this.videoStorageUrl+`?${params}`)
      .map((rs: Response) => rs.json())
  }

  getDeVideoDetail(videoId): Observable<any>{
    let params = new URLSearchParams();
    params.set('videoId', videoId);

    return this.httpService.get(this.demandVideoDetail+`?${params}`)
      .map((rs: Response) => rs.json())
  };

  getVideoCategory(cateId): Observable<any>{
    let params = new URLSearchParams();
    params.set('cateId',cateId);

    return this.httpService.get(this.videoCategory+`?${params}`)
      .map((rs: Response) => rs.json())

  }

  // addComment (body: Object): Observable<Comment[]> {
  //   let bodyString = JSON.stringify(body); // Stringify payload
  //   let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //   let options       = new RequestOptions({ headers: headers }); // Create a request option
  //
  //   return this.http.post(this.commentsUrl, body, options) // ...using post request
  //     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
  //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }



}
