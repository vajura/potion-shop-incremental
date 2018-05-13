import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as createjs from 'createjs-module';
import { Game } from '../models/game';
import { golemDeepCopy } from '../models/interfaces/golem-interface';
declare var kd;
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  width = 800;
  height = 800;
  htmlContainer: any;
  mainContainer: any;
  uiContainer: any;
  uiStage: createjs.Stage;
  mainStage: createjs.Stage;
  mapIconAnimationToggle = false;
  public game: Game;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    setInterval(() => {
      this.mapIconAnimationToggle = !this.mapIconAnimationToggle;
    }, 1000);
    setInterval(() => {
      kd.tick();
    }, 25);
    this.game = new Game(this.cdr);
    /*this.htmlContainer = $('html');
    this.mainContainer = $('#main-container');
    this.uiContainer = $('#ui-container');
    this.mainStage = new createjs.Stage('main-container');
    this.uiStage = new createjs.Stage('ui-container');*/
  }

  selectWilderness(index: number) {
    this.game.selectedWildernessIndex = index;
    let golem = golemDeepCopy(Game.golemCollection[0]);
    golem.amount = 1;
    this.game.addGolemToWilderness(this.game.wilderness[this.game.selectedWildernessIndex], golem);
  }

  getSeedName(index: number) {
    return Game.seedCollection[index].name;
  }
}
