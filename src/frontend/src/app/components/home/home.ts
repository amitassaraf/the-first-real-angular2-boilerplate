import { Component, OnInit } from '@angular/core';

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
