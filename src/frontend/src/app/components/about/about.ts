import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-about',
  templateUrl: 'about.pug',
  styleUrls: ['about.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello About');
  }

}
