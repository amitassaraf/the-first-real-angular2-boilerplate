import { Component, OnInit } from '@angular/core';
import '../../../libs';

@Component({
    selector: 'my-home',
    templateUrl: 'home.pug',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {

    constructor() {
        // Do stuff
    }

    ngOnInit() {
    }

    showHelloWorld() {
        Materialize.toast('I am a toast!', 4000);
    }

}
