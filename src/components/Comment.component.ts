/**
 * Created by chenwenhao on 2017/1/22.
 */
import {Component, Input, Output, ViewChild, ElementRef} from '@angular/core';
import {EventEmitter} from "@angular/common/src/facade/async";
import {HomeService} from "../providers/HomeService";
import {UserDataService} from "../providers/UserDataSevice";
import {ToolsService} from "../providers/ToolsService";
import {Subscription} from "rxjs";
declare var $;
@Component({
  selector: 'comment',
  template: ` 
      <div class="article-template article-template-comments " *ngFor="let item of comments;let i =index">
        <div class=" article-template-icon">
          <img
            [offset]="offset"
            [lazyLoad]="item.userInfoBasicRespVO.iconUrl ? item.userInfoBasicRespVO.iconUrl : item.iconUrl"  
            [defaultImage]="'/assets/images/placeholder_head_pic.png'"
            [errorImage]="'/assets/images/placeholder_head_pic.png'"
            [scrollObservable]="content.ionScroll"
           >
        </div>
        <div class="article-template-content border-bottom"> 
          <header class="header">
            <div class="left-box ">   
              <div class="poster-name">
                <div>{{item.userInfoBasicRespVO.nickName}}</div>
                <div class="interface-item" >
                        <span class="interface" >
                            
                           <span class="support" *ngIf="item.isDigg == false || item.isDigg == true ">
                                <label class="icon_new_Likes"
                                    (click)="loadComments(item.commentId,$event)"
                                    [class.isDigg]="item.isDigg == true"   
                                ></label>  
                                <span class="quantity" #commentDigg >
                                    {{item.diggCount}}
                                 </span>
                           </span>
                        </span>
                </div>  
              </div>
              <div class="source">
                <time class="date">{{item.createTime | amDateFormat:'MM-DD HH:mm'}}</time>
              </div>
            </div>  
  
          </header>
          <article class="article summary">
            <p>{{item.content}}</p>
          </article>
        </div>
      </div>
  `
})

export class CommentComponent {
  @Input() comments:string[];
  @Input() content;
  offset:number = 2500;
  @Output() digg: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('commentDigg') commentDigg:ElementRef;
  subscription:Subscription = new Subscription();

  constructor(
    public homeService:HomeService,
    public user:UserDataService,
    public tools:ToolsService
  ){

  }

  loadComments(commentId:number,$event){
    if(!commentId )
      return;
    let quantity = $event.target.parentNode.getElementsByClassName('quantity')[0];
    //let quantity = $event.target.parentNode.innerText;
    let number = parseInt(quantity.innerText);


    if(this.user.hasLoggedIn() != null && this.user.getUserid() != null){
      let userId = this.user.getUserid();
       if($event.target.classList.contains('isDigg')){
         this.subscription.add(
           this.homeService.GetFeedArticleCommentDigg(commentId,userId,false).subscribe((res) =>{
             if(!res)
               return;

             if(res.result == 0){
               $event.target.classList.remove('isDigg');
               quantity.innerText = number - 1;
               this.tools.showToast('取消成功',1000)
             }
           })
         )
       }else {
         this.subscription.add(
          this.homeService.GetFeedArticleCommentDigg(commentId,userId,true).subscribe((res) =>{
            if(!res)
              return;
            if(res.result == 0){
              $event.target.classList.add('isDigg');
              quantity.innerText = number + 1;
              this.tools.showToast('点赞成功',1000)
            }
          })
         );
      }
     }else {
     this.tools.showToast('登录之后才可进行此操作',1000)
     }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
