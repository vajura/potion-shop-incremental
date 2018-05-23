import { PotInterface } from './interfaces/pot-interface';
import { PlantInterface } from './interfaces/plant-interface';
import { SeedInterface } from './interfaces/seed-interface';
import { golemGenerator, plantGenerator, potGenerator, seedGenerator, wildernessGenerator } from '../helpers/game-elements-collection';
import { ChangeDetectorRef } from '@angular/core';
import { WildernessInterface } from './interfaces/wilderness-interface';
import { GolemInterface } from './interfaces/golem-interface';
import { NotificationService } from '../services/notification-service';
import { Plant } from './plant';
import { Pot } from './pot';
import { Wilderness } from './wilderness';
import { Seed } from './seed';

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

  // mana
  public maxMana = 100;
  public currentMana = 100;
  public manaRegen = 1;
  // gold
  public gold = 0;
  // wilderness
  public wilderness: Wilderness[] = [];
  public selectedWildernessIndex = 0;
  // golems
  public selectedGolem = 0;
  // pots
  public pots: Pot[] = [];
  // plants
  public plants: Plant[] = [];
  // seeds
  public seeds: Seed[] = [];

  constructor(
    public cdr: ChangeDetectorRef,
    public notificationService: NotificationService
  ) {
    this.generateCollections();
    this.generateObjects();
    game = this;
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
  }

  generateObjects() {
    for (let a = 0; a < Game.potCollection.length; a++) {
      this.pots.push(new Pot(Game.potCollection[a]));
    }
    for (let a = 0; a < Game.plantCollection.length; a++) {
      this.plants.push(new Plant(Game.plantCollection[a]));
    }
    for (let a = 0; a < Game.seedCollection.length; a++) {
      this.seeds.push(new Seed(Game.seedCollection[a]));
    }
    for (let a = 0; a < Game.wildernessCollection.length; a++) {
      this.wilderness.push(new Wilderness(Game.wildernessCollection[a]));
    }
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
