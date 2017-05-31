/**
 * Created by chenwenhao on 2017/1/14.
 * @description 此模块用作app全局自定义的pipe
 */
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from './StorageService';

/**
 * @description 此pipe用作angular safe html之用
 */
@Pipe({
  name: 'safeStyle'
})
export class SafeStyle implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer
  }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }
}

/**
 * @description 此pipe用作截取字符串之用
 * example {{value | truncate : 5}}
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, args: string[]): string {
    if (!value || value.length == 0)
      return;
    let limit = args.length > 0 ? parseInt(args[0], 5) : 5;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

/**
 * @description 将数字格式周几转换成中文格式
 */
@Pipe({
  name: 'chineseDay'
})
export class ChineseDay implements PipeTransform {
  transform(value: number, args: string[]): string {
    let days: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];
    return days[value];
  }
}

/**
 * 适用将字符串数字周转换成中文格式
 */
@Pipe({
  name: 'recruitWeek'
})
export class recruitWeek implements PipeTransform {
  transform(value: string, args: string[]): string {
    let days: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];
    if (typeof (value) != 'undefined') {
      let valueArr = value.split(',');
      // for(let i = 0; i < valueArr.length; i++){
      if (valueArr.length == 2) {
        var d = valueArr[0];
        var a = valueArr[1];

        return '周' + days[d] + ' 或 周' + days[a];
      } else if (valueArr.length == 1) {
        var d = valueArr[0];
        return '周' + days[d];
      }
      // }
    } else {
      return '时间待定';
    }

  }
}

/**
 * @description 将数字格式周几转换成中文格式
 */
@Pipe({
  name: 'timestampToChineseDay'
})
export class TimestampToChineseDay implements PipeTransform {
  transform(value: number, args: string[]): string {
    let date: Date = new Date(value);
    let numberDay = date.getDay();
    let chineseDays: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];
    return chineseDays[numberDay];
  }
}
/**
 * @description 将费用类型id转换成费用类型文字
 * example {{9001 | expense : AA制}}
 */
@Pipe({
  name: 'expense'
})
export class Expense implements PipeTransform {
  constructor(private storageService: StorageService) { }
  transform(value: string, args: string[]): string {
    let expenseTypes: Array<any> = this.storageService.getItem('expense_type');
    let typeText: string;
    for (let type of expenseTypes) {

      if (type.id === value) {
        typeText = type.title;
        break;
      }
    }
    return typeText;
  }
}
/**
 * @description 将赛制id转换成赛制类型文字
 * example {{5001 | expense : 11人制度}}
 */
@Pipe({
  name: 'matchFormat'
})
export class MatchFormat implements PipeTransform {
  constructor(private storageService: StorageService) { }
  transform(value: string, args: string[]): string {
    let matchFormat: Array<any> = this.storageService.getItem('match_format');
    let formatText: string;
    for (let format of matchFormat) {
      if (format.id === value) {
        formatText = format.title;
        break;
      }
    }
    return formatText;
  }
}
/**
 * @description 将赛制id转换成赛制类型文字
 * example {{5001 | expense : 11人制度}}
 */
@Pipe({
  name: 'distance'
})
export class Distance implements PipeTransform {
  transform(value: number, args: string[]): string {
    let distance: string;
    if (value > 1000) {
      distance = (value / 1000).toFixed(1) + 'km';
    }
    else {
      distance = value.toFixed(1) + 'm';
    }
    return distance;
  }
}
