import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Game } from '../models/game';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification-service';
import { Golem } from '../models/golem';
import { Wilderness } from '../models/wilderness';
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
    const golem: Golem = new Golem(this.game.selectedGolem.reference);
    golem.amount = this.golemAmount;
    if (!this.game.selectedWilderness.addGolem(golem)) {
      this.notificationService.info('', 'You don\'t have enough resources.');
    } else {
      this.golemSelectionModalRef.close();
    }
  }

  getTotalManaCost() {
    let manaCost = 0;
    for (let a = 0; a < this.game.selectedWilderness.golems.length; a++) {
      manaCost += this.game.selectedWilderness.golems[a].manaCost * this.game.selectedWilderness.golems[a].amount;
    }
    return manaCost;
  }

  getTotalGoldCost() {
    let goldCost = 0;
    for (let a = 0; a < this.game.selectedWilderness.golems.length; a++) {
      goldCost += this.game.selectedWilderness.golems[a].goldCost * this.game.selectedWilderness.golems[a].amount;
    }
    return goldCost;
  }

  addGolemAmount(num: number) {
    this.golemAmount += num;
    if (this.golemAmount < 1) {
      this.golemAmount = 1;
    }
  }

  getSeed(index: number): SeedInterface {
    return Game.seedCollection[index];
  }
}
