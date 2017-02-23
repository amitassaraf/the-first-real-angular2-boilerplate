import { Component } from '@angular/core';
import { ApiService } from '../services';

// Include external styles here
import '../style/index.scss';

@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: 'app.pug',
    styleUrls: ['app.scss'],
})
export class AppComponent {
    url = 'https://github.com/amitassaraf/the-first-real-angular2-boilerplate';
    title:string;

    constructor(private api:ApiService) {
        this.title = this.api.title;
    }
}
