import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Game } from '../models/game';
import { SeedInterface } from '../models/interfaces/seed-interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification-service';
import { Golem } from '../models/golem';
import { Supplier } from '../models/supplier';
import { Pot } from '../models/pot';
import { Seed } from '../models/seed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  @ViewChild('golemSelectionModal') golemSelectionModal: NgbModal;
  private golemSelectionModalRef: NgbModalRef;
  @ViewChild('supplierChangeModal') supplierChangeModal: NgbModal;
  private supplierChangeModalRef: NgbModalRef;
  @ViewChild('buySupplierModal') buySupplierModal: NgbModal;
  private buySupplierModalRef: NgbModalRef;
  @ViewChild('buyPotModal') buyPotModal: NgbModal;
  private buyPotModalRef: NgbModalRef;
  @ViewChild('plantSeedModal') plantSeedModal: NgbModal;
  private plantSeedModalRef: NgbModalRef;

  animationToggle = false;
  golemAmount = 1;
  potBuyingAmount = 1;
  supplierBuyingAmount = 0;
  seedPlantAmount = 0;

  public game: Game;

  constructor(private cdr: ChangeDetectorRef,
              private modalService: NgbModal,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.animationToggle = !this.animationToggle;
    }, 1000);


    this.game = new Game(this.cdr, this.notificationService);
    /*this.htmlContainer = $('html');
    this.mainContainer = $('#main-container');
    this.uiContainer = $('#ui-container');
    this.mainStage = new createjs.Stage('main-container');
    this.uiStage = new createjs.Stage('ui-container');*/
  }

  openGolemSelection() {
    this.golemSelectionModalRef = this.modalService.open(this.golemSelectionModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  openBuySuppliersModal(supplier: Supplier) {
    this.game.selectedSupplier = supplier;
    this.buySupplierModalRef = this.modalService.open(this.buySupplierModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  openBuyPotModal() {
    this.buyPotModalRef = this.modalService.open(this.buyPotModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  openPlantSeedModal(pot: Pot) {
    this.game.selectedPot = pot;
    this.plantSeedModalRef = this.modalService.open(this.plantSeedModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  changeSupplierAmount(num: number) {
    this.supplierBuyingAmount += num;
    if (this.supplierBuyingAmount < 0) {
      this.supplierBuyingAmount = 0;
    }
  }

  changePlantSeedAmount(num: number) {
    this.seedPlantAmount += num;
    if (this.seedPlantAmount < 0) {
      this.seedPlantAmount = 0;
    }
    if (this.seedPlantAmount > this.game.selectedPot.amount) {
      this.seedPlantAmount = this.game.selectedPot.amount;
    }
    if (this.seedPlantAmount > this.game.getSeedFromName(this.game.selectedSeed.name).amount) {
      this.seedPlantAmount = this.game.getSeedFromName(this.game.selectedSeed.name).amount;
    }
  }

  buySuppliers() {
    if (this.game.selectedSupplier.addAmount(this.supplierBuyingAmount)) {
      this.supplierBuyingAmount = 0;
      this.buySupplierModalRef.close();
    } else {
      this.notificationService.info('', 'You don\'t have enough resources.');
    }
    this.supplierBuyingAmount = 0;
  }

  openSupplierChangeModal(supplier: Supplier) {
    this.game.selectedSupplier = supplier;
    this.supplierChangeModalRef = this.modalService.open(this.supplierChangeModal, {
      size: 'lg',
      windowClass: 'dark-modal'
    });
  }

  plantSeeds() {
    const seed: Seed = new Seed(Game.seedCollection[Game.seedsI[this.game.selectedSeed.name]]);
    seed.amount = this.seedPlantAmount;
    if (!this.game.selectedPot.addSeedToPot(seed)) {
      this.notificationService.info('', 'You don\'t have enough resources.');
    } else {
      this.plantSeedModalRef.close();
    }
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

  buyPots() {
    if (this.game.selectedPot.addAmount(this.potBuyingAmount)) {
      this.potBuyingAmount = 1;
      this.buyPotModalRef.close();
    } else {
      this.notificationService.info('', 'You don\'t have enough resources.');
    }
    this.potBuyingAmount = 1;
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

  addPotAmount(num: number) {
    this.potBuyingAmount += num;
    if (this.potBuyingAmount < 1) {
      this.potBuyingAmount = 1;
    }
  }

  changeActiveSupplierAmount (num: number) {
    this.game.selectedSupplier.activeAmount += num;
    if (this.game.selectedSupplier.activeAmount < 0) {
      this.game.selectedSupplier.activeAmount = 0;
    }
    if (this.game.selectedSupplier.activeAmount > this.game.selectedSupplier.amount) {
      this.game.selectedSupplier.activeAmount = this.game.selectedSupplier.amount;
    }
  }

  getSeed(index: number): SeedInterface {
    return Game.seedCollection[index];
  }

  r(value: number, precision = 10) {
    return Math.round(value * precision) / precision;
  }
}
