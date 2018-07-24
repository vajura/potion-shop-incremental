import { PotInterface } from './interfaces/pot-interface';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedInterface } from './interfaces/seed-interface';
import {
  golemGenerator,
  plantGenerator,
  potGenerator,
  seedGenerator,
  supplierGenerator,
  wildernessGenerator
} from '../helpers/game-elements-collection';
import { ChangeDetectorRef } from '@angular/core';
import { WildernessInterface } from './interfaces/wilderness-interface';
import { GolemInterface } from './interfaces/golem-interface';
import { NotificationService } from '../services/notification-service';
import { Plant } from './plant';
import { Pot } from './pot';
import { Wilderness } from './wilderness';
import { Seed } from './seed';
import { Golem } from './golem';
import { SupplierInterface } from './interfaces/supplier-interface';
import { Supplier } from './supplier';

export let game: Game;

export class Game {


  public static potCollection: PotInterface[];
  public static potsI: any[] = [];
  public static plantCollection: PlantInterface[];
  public static plantsI: any[] = [];
  public static seedCollection: SeedInterface[];
  public static seedsI: any[] = [];
  public static golemCollection: GolemInterface[];
  public static golemsI: any[] = [];
  public static wildernessCollection: WildernessInterface[];
  public static wildernessI: any[] = [];
  public static supplierCollection: SupplierInterface[];
  public static supplierI: any[] = [];

  // mana
  public maxMana = 100;
  public currentMana = 100;
  public manaRegen = 1;
  // gold
  public gold = 20;
  // wilderness
  public wilderness: Wilderness[] = [];
  public selectedWilderness: Wilderness;
  // golems
  public golems: Golem[] = [];
  public selectedGolem: Golem;
  // pots
  public pots: Pot[] = [];
  public selectedPot: Pot;
  // plants
  public plants: Plant[] = [];
  // seeds
  public seeds: Seed[] = [];
  public selectedSeed: Seed;
  // suppliers
  public suppliers: Supplier[] = [];
  public selectedSupplier: Supplier;

  // counters
  public elapsedCounter = 0;


  constructor(
    public cdr: ChangeDetectorRef,
    public notificationService: NotificationService
  ) {
    game = this;
    this.generateCollections();
    this.generateObjects();
    if (this.suppliers[0].amount === 0) {
      this.suppliers[0].amount = 1;
    }
    setTimeout(async () => {
      await this.gameLoop();
    }, 1000);
  }

  async gameLoop() {
    await this.gameLoopForMana();

    for (let a = 0; a < this.wilderness.length; a++) { this.wilderness[a].gameLoop(); }
    for (let a = 0; a < this.pots.length; a++) { this.pots[a].gameLoop(); }
    for (let a = 0; a < this.plants.length; a++) { this.plants[a].gameLoop(); }
    for (let a = 0; a < this.seeds.length; a++) { this.seeds[a].gameLoop(); }
    for (let a = 0; a < this.suppliers.length; a++) { this.suppliers[a].gameLoop(); }

    this.elapsedCounter++;
    await this.cdr.markForCheck();
    setTimeout(async () => {
      await this.gameLoop();
    }, 1000);
  }

  async gameLoopForMana() {
    this.currentMana += this.manaRegen;
    if (this.currentMana > this.maxMana) {
      this.currentMana = this.maxMana;
    }
  }

  checkAndRemoveManaAndGold(goldAmount: number, manaAmount: number) {
    if (
      this.checkAndRemoveGold(goldAmount, false) &&
      this.checkAndRemoveMana(manaAmount, false)
    ) {
      this.checkAndRemoveGold(goldAmount);
      this.checkAndRemoveMana(manaAmount);
      return true;
    } else {
      return false;
    }
  }
  checkAndRemoveGold(amount: number, remove = true): boolean {
    if (this.gold >= amount) {
      if (remove) {
        this.gold -= amount;
      }
      return true;
    }
    return false;
  }

  checkAndRemoveMana(amount: number, remove = true): boolean {
    if (this.currentMana >= amount) {
      if (remove) {
        this.currentMana -= amount;
      }
      return true;
    }
    return false;
  }

  generateCollections() {
    Game.potCollection = potGenerator();
    Game.plantCollection = plantGenerator();
    Game.seedCollection = seedGenerator();
    Game.wildernessCollection = wildernessGenerator();
    Game.golemCollection = golemGenerator();
    Game.supplierCollection = supplierGenerator();

    for (let a = 0; a < Game.potCollection.length; a++) {
      Game.potsI[Game.potCollection[a].name] = a;
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      Game.plantsI[Game.plantCollection[a].name] = a;
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      Game.seedsI[Game.seedCollection[a].name] = a;
    }
    for (let a = 0; a < Game.golemCollection.length; a++) {
      Game.golemsI[Game.golemCollection[a].name] = a;
    }
    for (let a = 0; a < Game.wildernessCollection.length; a++) {
      Game.wildernessI[Game.wildernessCollection[a].name] = a;
    }
    for (let a = 0; a < Game.supplierCollection.length; a++) {
      Game.supplierI[Game.supplierCollection[a].name] = a;
    }
  }

  generateObjects() {
    for (let a = 0; a < Game.potCollection.length; a++) {
      this.pots.push(new Pot(Game.potCollection[a], a));
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      this.plants.push(new Plant(Game.plantCollection[a], a));
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      this.seeds.push(new Seed(Game.seedCollection[a], a));
    }
    for (let a = 0; a < Game.wildernessCollection.length; a++) {
      this.wilderness.push(new Wilderness(Game.wildernessCollection[a], a));
    }
    for (let a = 0; a < Game.golemCollection.length; a++) {
      this.golems.push(new Golem(Game.golemCollection[a], a));
    }
    for (let a = 0; a < Game.supplierCollection.length; a++) {
      this.suppliers.push(new Supplier(Game.supplierCollection[a], a));
    }
    this.selectedWilderness = this.wilderness[0];
    this.selectedGolem = this.golems[0];
    this.selectedPot = this.pots[0];
    this.selectedSeed = this.seeds[0];
  }

  getUnlockedWilderness(): Wilderness[] {
    const unlockedElements: Wilderness[] = [];

    for (let a = 0; a < this.wilderness.length; a++) {
      if (this.wilderness[a].unlocked) {
        unlockedElements.push(this.wilderness[a]);
      }
    }
    return unlockedElements;
  }

  getUnlockedSeeds(tier = -1): Seed[] {
    const unlockedElements: Seed[] = [];

    for (let a = 0; a < this.seeds.length; a++) {
      if (this.seeds[a].unlocked && tier > -1 && this.seeds[a].tier <= tier) {
        unlockedElements.push(this.seeds[a]);
      }
    }
    return unlockedElements;
  }

  getUnlockedPots(): Pot[] {
    const unlockedElements: Pot[] = [];

    for (let a = 0; a < this.pots.length; a++) {
      if (this.pots[a].unlocked) {
        unlockedElements.push(this.pots[a]);
      }
    }
    return unlockedElements;
  }

  getUnlockedPlants(): Plant[] {
    const unlockedElements: Plant[] = [];

    for (let a = 0; a < this.plants.length; a++) {
      if (this.plants[a].unlocked) {
        unlockedElements.push(this.plants[a]);
      }
    }
    return unlockedElements;
  }

  getUnlockedGolems(): Golem[] {
    const unlockedElements: Golem[] = [];

    for (let a = 0; a < this.golems.length; a++) {
      if (this.golems[a].unlocked) {
        unlockedElements.push(this.golems[a]);
      }
    }
    return unlockedElements;
  }

  getUnlockedSuppliers(): Supplier[] {
    const unlockedElements: Supplier[] = [];

    for (let a = 0; a < this.suppliers.length; a++) {
      if (this.suppliers[a].unlocked) {
        unlockedElements.push(this.suppliers[a]);
      }
    }
    return unlockedElements;
  }

  getSeedFromName(name: string): SeedInterface {
    return this.seeds[Game.seedsI[name]];
  }
  getPlantFromName(name: string): PlantInterface {
    return this.plants[Game.plantsI[name]];
  }
  getPotFromName(name: string): PotInterface {
    return this.pots[Game.potsI[name]];
  }
}
