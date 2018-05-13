import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as createjs from 'createjs-module';
import { Game } from '../models/game';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private cdr: ChangeDetectorRef,
              private modalService: NgbModal) {
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

  openGolemSelection(content: any) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

  selectWilderness(index: number) {
    this.game.selectedWildernessIndex = index;
    /*let golem = golemDeepCopy(Game.golemCollection[0]);
    golem.amount = 1;
    this.game.addGolemToWilderness(this.game.wilderness[this.game.selectedWildernessIndex], golem);*/
  }

  removeGolemGroup(golemIndex: number) {
    this.game.removeGolemFromWilderness(this.game.wilderness[this.game.selectedWildernessIndex], golemIndex);
  }

  getManaCost() {
    const w = this.game.wilderness[this.game.selectedWildernessIndex];
    let manaCost = 0;
    for (let a = 0; a < w.golems.length; a++) {
      manaCost += w.golems[a].manaCost * w.golems[a].amount;
    }
    return manaCost;
  }

  getGoldCost() {
    const w = this.game.wilderness[this.game.selectedWildernessIndex];
    let goldCost = 0;
    for (let a = 0; a < w.golems.length; a++) {
      goldCost += w.golems[a].goldCost * w.golems[a].amount;
    }
    return goldCost;
  }

  getGolemCollection() {
    return Game.golemCollection;
  }

  getSeed(index: number): SeedInterface {
    return Game.seedCollection[index];
  }
}
