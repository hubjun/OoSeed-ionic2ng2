
/**
 * Created by chenwenhao on 2017/2/20.
 * @description
 * 这是一个状态管理器
 */
import {Injectable} from "@angular/core";


@Injectable()
export class StatesService{
  // 定义一个对象，用来存储状态
  public states = {};

  constructor(){};
// 获取整个对象内容，常用于开发中查看保存的值变成了多少
  getStates(){
    return this.states;
  }

//根据属性名，获取存储的值
  get(name){
    if (this.states[name]){
      return this.states[name];
    }

    return '';
  }

  set(options,target = this.states){
    let keys = Object.keys(options);
    let  o = target ? target : this.states;

    keys.map( item => {
      if (typeof o[item] == 'undefined'){
        o[item] = options[item];
      }else{
        if(this.type(o[item]) == 'object') {
          this.set(options[item], o[item])
        } else {
          o[item] = options[item]
        }
      }
      return item
    })
  }

  type(elem) {
    if (elem == null) return elem + '';
    return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
  }
}





