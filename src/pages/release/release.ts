import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-release',
  templateUrl: 'release.html'
})
export class ReleasePage {

  constructor(public navCtrl: NavController) {

  }
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/1000/1000';
  offset = 100;
  images = [
    'https://hd.unsplash.com/photo-1441765425173-8fd330fb4a02',
    'https://hd.unsplash.com/photo-1451481454041-104482d8e284',
    'https://hd.unsplash.com/photo-1471070855862-324d571a1857',
    'https://hd.unsplash.com/photo-1415045550139-59b6fafc832f'
  ];
}
