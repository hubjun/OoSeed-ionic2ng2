/**
 * Created by chenwenhao on 2017/1/13.
 * @description 此模块是storage 公共类
 */
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class StorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
