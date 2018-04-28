import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as createjs from 'createjs-module';
declare var kd;
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  width = 800;
  height = 800;
  htmlContainer: any;
  mainContainer: any;
  uiContainer: any;
  uiStage: createjs.Stage;
  mainStage: createjs.Stage;

  constructor() {

  }

  ngOnInit() {
    setInterval(() => {
      kd.tick();
    }, 25);

    this.htmlContainer = $('html');
    this.mainContainer = $('#main-container');
    this.uiContainer = $('#ui-container');
    this.mainStage = new createjs.Stage('main-container');
    this.uiStage = new createjs.Stage('ui-container');
  }
}
