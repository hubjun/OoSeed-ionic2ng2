/**
 * Created by dell on 2017/1/11.
 */
import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../providers/ValidatorService';

@Component({
  selector: 'control-messages',
  template: '<div class="app-prompt-box" *ngIf="errorMessages !== null">{{errorMessages}}</div>'
})

export class ControlMessagesComponent {
  @Input() control: FormControl;

  times:boolean = true;
  constructor() {}

  get errorMessages() {
    for (let propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
  ngOnInit(){
    this.errorMessages;
  }
}
