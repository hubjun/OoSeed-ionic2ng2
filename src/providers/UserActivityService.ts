/**
 * Created by chenwenhao on 2017/3/3.
 * @description
 * 此模块包含用户登录/用户注册HTTP模块
 */

import { Injectable } from "@angular/core";
import { HttpService } from "./HttpService";
import { ToolsService } from './ToolsService';


@Injectable()
export class UserActivityService {
  private LOGIN_URL = '/user/_guest/login';
  private REGISTER_URL = '/user/_guest/register';
  private GET_SMS_CODE_URL = '/user/_guest/smsCode';
  private VALIDATE_SMS_CODE_URL = '/user/_guest/validateSmsCode'
  private NICKNAME_URL = '/user/_userInfo'
  constructor(
    private httpService: HttpService,
    private tools: ToolsService
  ) {
  }

  login(data) {
    let url = this.LOGIN_URL;
    return this.httpService.authenticate(url, data).map((res) => res.json());
  }

  //获取短信验证码
  getSMSCode(data) {
    let url = this.GET_SMS_CODE_URL;
    let uri = this.tools.param(data);
    return this.httpService.get(`${url}?${uri}`).map((res) => res.json());
  }
  //核实短信验证码
  checkSMSCode(data) {
    let url = this.VALIDATE_SMS_CODE_URL;
    let uri = this.tools.param(data);
    return this.httpService.get(`${url}?${uri}`).map((res) => res.json());
  }
  //注册
  register(data) {
    let url = this.REGISTER_URL;
    return this.httpService.authenticate(url, data).map((res) => res.json());
  }
  //设置昵称
  setNickname(data) {
    let url = this.NICKNAME_URL;
    return this.httpService.get(`${url}?${data}`).map((res) => res.json());
  }
}
