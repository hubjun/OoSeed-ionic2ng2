/**
 * Created by chenwenhao on 2017/3/14.
 * @description 此模块是app公共directive模块
 */

import {Directive, Input, ElementRef} from "@angular/core";
declare var $;


/**
 * @description 用此directive时一定要是ul>li的结构
 * 通过计算li的宽度给ul设scroll的宽度
 *
 */
@Directive({
  selector:'[render]'
})

export class RenderDirective {
  @Input('render') render:boolean;

  constructor(
    private el:ElementRef
  ){
  }

  ngAfterViewInit(){
    if(this.render == true){
      this.setScroll();
    }
  }

  private setScroll(){
    let eles = this.el.nativeElement;
    let totalWidths: number = 0;
    let lisLength = $(eles).parent('ul').find('li').length ;
    for (let i = 0; i < lisLength; i++) {
      totalWidths += $(eles).parent('ul').find('li').eq(i).width();
    }
    $(eles).parent('ul').css({ width: totalWidths + 40 + 'px' })
  }
}
