/**
 * Created by allenou on 2017/3/21.
 */
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamPlayerDetailPage } from './team-player-team-homepage';

@Component({
    selector: 'service-channel',
    templateUrl: 'service.component.html'
})
export class ServiceComponent {
    @Input() basicInfo;//球队基本信息
    constructor(public navCtrl: NavController) { }

}
