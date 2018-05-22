import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Game } from '../models/game';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { golemDeepCopy } from '../models/interfaces/golem-interface';
import { NotificationService } from '../services/notification-service';
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

  @ViewChild('golemSelectionModal') golemSelectionModal: NgbModal;

  mapIconAnimationToggle = false;
  golemAmount = 1;

  public game: Game;
  private golemSelectionModalRef: NgbModalRef;

  constructor(private cdr: ChangeDetectorRef,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.mapIconAnimationToggle = !this.mapIconAnimationToggle;
    }, 1000);
    setInterval(() => {
      kd.tick();
    }, 25);
    this.game = new Game(this.cdr, this.notificationService);
    Game.game = this.game;
    /*this.htmlContainer = $('html');
    this.mainContainer = $('#main-container');
    this.uiContainer = $('#ui-container');
    this.mainStage = new createjs.Stage('main-container');
    this.uiStage = new createjs.Stage('ui-container');*/
  }

  openGolemSelection(content: any) {
    this.golemSelectionModalRef = this.modalService.open(this.golemSelectionModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  sendGolemGroup() {
    const golem = golemDeepCopy(Game.golemCollection[this.game.selectedGolem]);
    golem.amount = this.golemAmount;
    if (!this.game.addGolemToWilderness(this.game.wilderness[this.game.selectedWildernessIndex], golem)) {
      this.notificationService.info('', 'You don\'t have enough resources.');
    } else {
      this.golemSelectionModalRef.close();
    }
  }

  selectWilderness(index: number) {
    this.game.selectedWildernessIndex = index;
  }

  selectGolem(index: number) {
    this.game.selectedGolem = index;
  }

  removeGolemGroup(golemIndex: number) {
    this.game.removeGolemFromWilderness(this.game.wilderness[this.game.selectedWildernessIndex], golemIndex);
  }

  getManaCost() {
    const golem = Game.golemCollection[this.game.selectedGolem];
    let manaCost = golem.manaCost * this.golemAmount;
    return manaCost;
  }

  getGoldCost() {
    const golem = Game.golemCollection[this.game.selectedGolem];
    let goldCost = golem.goldCost * this.golemAmount;
    return goldCost;
  }

  getTotalManaCost() {
    const wilderness = this.game.wilderness[this.game.selectedWildernessIndex];
    let manaCost = 0;
    for (let a = 0; a < wilderness.golems.length; a++) {
      manaCost += wilderness.golems[a].manaCost * wilderness.golems[a].amount;
    }
    return manaCost;
  }

  getTotalGoldCost() {
    const w = this.game.wilderness[this.game.selectedWildernessIndex];
    let goldCost = 0;
    for (let a = 0; a < w.golems.length; a++) {
      goldCost += w.golems[a].goldCost * w.golems[a].amount;
    }
    return goldCost;
  }

  addGolemAmount(num: number) {
    this.golemAmount += num;
    if (this.golemAmount < 1) {
      this.golemAmount = 1;
    }
  }

  getGolemCollection() {
    return Game.golemCollection;
  }

  getSeed(index: number): SeedInterface {
    return Game.seedCollection[index];
  }
}
