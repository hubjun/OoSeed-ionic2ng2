/**
 * Created by allenou on 2017/4/11.
 */
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { mySpellDetail } from '../../my-spell/my-spell-card/my-spell-card-detailPage';

@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent {
    @Input() schedules: Array<any>;
    constructor(public navCtrl: NavController) { }
    goToSpellDetail(spell: any) {
        this.navCtrl.push(mySpellDetail, {
            "fightId": spell.tableId
        })
    }
}