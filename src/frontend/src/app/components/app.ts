import { Component } from '@angular/core';

import { ApiService } from '../services';

import '../style/index.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: 'app.pug',
  styleUrls: ['app.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;

  constructor(private api: ApiService) {
    this.title = this.api.title;
  }
}
