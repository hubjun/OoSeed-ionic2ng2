/**
 * Created by chenwenhao on 2017/1/13.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './HttpService';
import {Response} from "@angular/http";

@Injectable()
export class HomeService {
  private RECOMMEND_URL = '/ip/cate/home';
  private RECOMMEND_IP_URL = '/ip/recom';  //首页推荐IP列表
  private RECOMMEND_CHANNEL_URL = '/ip/cate/home'; //首页栏目列表
  private INFO_BANNER_URL = '/file/playturn';
  private INFO_CATE_URL = '/article/cate';
  private INFO_CATE_ARTICLES_URL = '/article/articles';
  private INFO_CATE_ARTICLE_URL = '/article/article';

  private INFO_CATE_ARTICLE_LIST_RECOMMEND_URL = '/article/article/acticleList/recom';
  private INFO_CATE_ARTICLE_LIST_COMMENT_URL = '/article/article/comment';
  private FEED_GUEST_URL = '/feed/_guest';
  private FEED_ARTICLE_URL = '/feed';
  private FEED_ARTICLE_COMMENT_URL = '/feed/comment';
  private FEED_ARTICLE_DIGG_URL = '/user/feed/digg';
  private FEED_ARTICLE_COMMENT_DIGG_URL = '/user/comment/digg';

  constructor(private httpService: HttpService,) {
  }

  //获取首页推荐IP列表
  getRecommendIP() {
    let url = this.RECOMMEND_IP_URL + '?page=1&rows=10';
    return this.httpService.get(url).map((res: Response) => res.json())
  }

  //获取首页推荐栏目
  getRecomentChannel() {
    let url = this.RECOMMEND_CHANNEL_URL
    return this.httpService.get(url).map((res: Response) => res.json())
  }

  GetRecommendInfo() {
    let url = this.RECOMMEND_URL;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  GetBannerInfo() {
    let url = this.INFO_BANNER_URL + '?resPosition=6001&rows=5';
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  GetCateInfo() {
    let url = this.INFO_CATE_URL;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

//获取资讯cate分类下的文章描述
  GetCateArticles(id: number, page: number = 1, rows: number = 5) {
    let url = this.INFO_CATE_ARTICLES_URL + `?categoryId=${id}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

//获取资讯cate分类下的文章描述的文章详细内容
  GetCateArticleInfo(id: number) {
    let url = this.INFO_CATE_ARTICLE_URL + `?articleId=${id}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }







  //获取资讯cate分类下的文章描述的文章详细内容下的推荐文章
  GetCateArticleListRecommend(categoryId: number) {
    let url = this.INFO_CATE_ARTICLE_LIST_RECOMMEND_URL + `?categoryId=${categoryId}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  //获取资讯cate分类下的文章描述的文章详细内容下的评论
  GetCateArticleListComment(categoryId: number, page: number, rows: number = 10) {
    let url = this.INFO_CATE_ARTICLE_LIST_COMMENT_URL + `?articleId=${categoryId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }


  /**
   *
   * @description 获取帖子相关数据
   *
   */
  GetFeedForGuest(page:number = 1,rows:number = 4) {
    let url = this.FEED_GUEST_URL;
    return this.httpService.get(`${url}?page=${page}&rows=${rows}`).map((res: Response) => res.json());
  }

  GetFeedArticle(id: number) {
    let url = this.FEED_ARTICLE_URL + `?feedId=${id}`;
    return this.httpService.get(url);
  }

  GetFeedArticleComment(id: number, page: number, rows: number = 10) {
    let url = this.FEED_ARTICLE_COMMENT_URL + `?feedId=${id}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  GetFeedDigg(feedId:number,userId:string,operation:boolean = true){
    let data = {
      feedId :feedId,
      userId : userId
    };

    if (operation){
      let url = this.FEED_ARTICLE_DIGG_URL;
      return this.httpService.post(url,data).map((res) => res.json());

    }else {
      let url = this.FEED_ARTICLE_DIGG_URL + `?feedId=${feedId}&userId=${userId}`;
      return this.httpService.delete(url).map((res: Response) => res.json());
    }
  }

  GetFeedArticleCommentDigg(commentId: number,userId:string,operation:boolean = true) {
    let data = {
      userId    : userId,
      commentId : commentId
    };
    if (operation) {
      let url = this.FEED_ARTICLE_COMMENT_DIGG_URL;
      return this.httpService.post(url,data).map((res: Response) => res.json());
    }else {
      let url = this.FEED_ARTICLE_COMMENT_DIGG_URL + `?userId=${userId}&commentId=${commentId}`;
      return this.httpService.delete(url).map((res: Response) => res.json());
    }
  }
}
