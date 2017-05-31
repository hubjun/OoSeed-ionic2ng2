/**
 * Created by allenou on 2017/3/15.
 */
//获取验证码
export interface SMSCode {
    phone: string;
    operateType: string;

}
//检验验证码
export interface ValidateSMSCode {
    validateMsg: string;
    validateType: string;
}

//注册
export interface Register {
    account: string;
    loginPwd: string;
    accountType: string;
    operateType: string;
    smsCode: string;
}
