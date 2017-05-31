/**
 * Created by baoww on 2017/4/6.
 * Modifyed by allenou on 2017/4/7
 */
import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { LocalService } from '../../local.service';
import { LocalFilterComponent } from '../local-filter/local-filter.component';


@Component({
    selector: 'local-nav',
    template: `
            <div class="gap"></div>
            <nav>
              <ul>
                <li class="active"
                    *ngFor="let nav of navs;let i=index"
                    (click)="selectNav(nav,i)"
                    [class.active]="i === selectedIndex">
                  <img src="../../assets/images/{{nav.icon}}" alt="">
                  <span>{{nav.text}}</span>
                </li>
              </ul>
            </nav>
             <div class="gap"></div>
    `
})

export class LocalNavComponent {
    selectedIndex: number = 0;
    @Output() onSelect = new EventEmitter<number>();

    constructor(
        private localService: LocalService
    ) { }
    public navs = [
        {
            "id": 1,
            "icon": "tchome_spell.png",
            "text": "拼球",
            "value": "spellBall"
        },
        {
            "id": 2,
            "icon": "tchome_about.png",
            "text": "约战",
            "value": "bookingMatch"
        },
        {
            "id": 3,
            "icon": "tchome_team.png",
            "text": "球队",
            "value": "teamIp"
        },
        {
            "id": 4,
            "icon": "tchome_recruiting.png",
            "text": "招募球员",
            "value": "recruit"
        },
        {
            "id": 5,
            "icon": "tchome_push.png",
            "text": "推荐用户",
            "value": "personalIp"
        }
    ];
    selectNav(nav: any, index: number) {
        this.selectedIndex = index;
        this.onSelect.emit(nav.value);
    }
}
