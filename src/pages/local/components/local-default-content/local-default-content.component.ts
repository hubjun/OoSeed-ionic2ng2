/**
 * Created by baoww on 2017/4/6.
 * Modifyed by allenou on 2017/4/7
 */
import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { LocalService } from '../../local.service';

@Component({
    selector: 'local-default-content',
    template: `
            <div class="spellMissingPage">
              <div class="missingBg">
                <p></p>
              </div>
              <p>{{text}}</p>
            </div>
    `
})

export class LocalDefaultContentComponent {
    @Input() text: string;
    constructor(
    ) { }
}
// 暂时没有该类拼球信息，去看看其他吧~
