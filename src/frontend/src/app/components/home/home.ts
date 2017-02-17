import { Component, OnInit } from '@angular/core';
let Materialize = require('../../../../libs/materialize/js/bin/materialize');

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
    console.log('Hello Home');
  }

}
