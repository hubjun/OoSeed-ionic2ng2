/**
 * Created by allenou on 2017/3/23.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeService } from '../../../../providers/Me.service';


@Component({
  selector: 'match-result',
  template: `
         <ul class="team-grid-list" *ngIf="result">
      <li>
        <span>{{result.goalNum}}</span>
        <em>进球</em>
      </li>
      <li>
        <span>{{result.goalNum-result.goalDifferenceNum}}</span>
        <em>失球</em>
      </li>
      <li>
        <span>{{result.goalDifferenceNum}}</span>
        <em>净胜球</em>
      </li>
      <li>
        <circular-progress-bar [opts]="progressBarOpts"></circular-progress-bar>
        <em>胜({{result.winsNum}})</em>
      </li>
      <li>
        <circular-progress-bar [opts]="progressBarOpts"></circular-progress-bar>
        <em>平({{result.flatFieldNum}})</em>
      </li>
      <li>
        <circular-progress-bar [opts]="progressBarOpts"></circular-progress-bar>
        <em>负({{result.negativeFieldNum}})</em>
      </li>
    </ul>
    `
})
export class MatchResultComponent {
  result: any;//球队战绩
  //进度条配置
  progressBarOpts: Array<any> = [{
    color: '#e94141',
    percent: 0,
    size: 90,
    border: 3
  }, {
    color: '#89d035',
    percent: 0,
    size: 90,
    border: 3
  }, {
    color: '#23a3ec',
    percent: 0,
    size: 90,
    border: 3
  }]
  setPercent(result: any) {
    this.result = result;
    let progressBarOpts = this.progressBarOpts;
    progressBarOpts[0].percent = result.winsPercentum;
    progressBarOpts[1].percent = result.flatPercentum;
    progressBarOpts[2].percent = result.negativePercentum;
  }
}
