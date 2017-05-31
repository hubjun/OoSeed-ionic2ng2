import {FormGroup} from "@angular/forms";
/**
 * Created by 陈文豪 on 2017/1/9.
 */

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required':'必填',
      'invalidPhoneNumber': '您输入的手机号码有误',
      'userNotExist': '用户不存在',
      'userExisted': '用户已注册',
      'phoneNumberNull': '手机号码不能为空',
      'passwordLimitLength': '密码长度应在6-16位',
      'loginSuccess': '登陆成功',
      'InvalidVerifyCode': '验证码错误',
      'passwordInconformity': '两次输入密码不一致',
      'passwordFormatError': '您输入的密码格式有误',
      'passwordIsChanged': '密码修改成功',
      'registerSuccess': '注册成功,已登录',
      'nicknameExisted': '该昵称已被使用',
      'minlength': '密码长度应在6-16位之间',
      'maxLength': '密码长度应在6-16位之间',
      'invalidNickname': '昵称长度在1~15个字符以内(不区分英文和汉字),昵称只能由汉字、数字、英文和下划线组成.'
    };

    return config[validatorName];
  }

  static accountValidator(control) {

    if (!control.value.match(/^1[34578]\d{9}$/))  {
      return { 'invalidPhoneNumber': true }
    } else {
      return null;
    }
  }

  static passwordValidator(control) {
    if (!control.value.match(/^[\w]{6,16}$/)) {
      return { 'passwordLimitLength': true }
    } else {
      return null;
    }
  }

  static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {'passwordInconformity': true};
      }else{
        return null;
      }
    }
  }

  static nickNameValidator(control) {
    if (!control.value.match(/^[0-9a-zA-Z\u4e00-\u9fa5_]{1,15}$/)) {
      return { 'invalidAccount': true }
    } else {
      return null;
    }
  }

}
