/**
 * Created by allenou on 2017/4/26.
 */
import { Component } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { ToolsService } from '../../../../providers/ToolsService';



@Component({
    selector: 'view-more-tip',
    template: `
         <div class="contentLook" (click)="TipCommon()">
        <div class="lookMore">下载球苗App，看更多精彩内容</div>
          </div>
    `
})

export class ViewMoreTipComponent {
    @Input() text: string;
    constructor(private toolsService:ToolsService){}
    TipCommon() {
        this.toolsService.presentConfirm();
    }

}
