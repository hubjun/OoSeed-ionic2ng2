import {Component, Input} from '@angular/core';
import {PersionalHomepageService} from "../../../providers/PersionalHomepageService";
import {Subscription} from "rxjs";


@Component({
  selector: 'page-homepage-service',
  templateUrl: 'homepage-service.html'
})
export class HomepageServicePage {
  userId:string;
  servers: Array<string> = [];
  @Input() content;
  subscription: Subscription = new Subscription();

  constructor(
    private http:PersionalHomepageService
  ) {}

  getUserServer(userId:string){
    this.subscription.add(
      this.http.getUserServer(userId).subscribe(res => {

        if (res && res.result == 0 && res.data) {
          var data = res.data;
          this.servers = data;
        }
      })
    );
  }

  ngOnInit(){
    this.userId = this.http.userId;
    this.getUserServer(this.userId);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
