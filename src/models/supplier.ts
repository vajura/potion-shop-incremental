import { BaseClass } from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { game, Game } from './game';
import { SupplierInterface } from './interfaces/supplier-interface';
import { SeedIndex } from './enums/seed-index-helper';
import { PlantIndex } from './enums/plant-index-helper';

export class Supplier extends BaseClass<SupplierInterface> implements SupplierInterface {

  public reference: SupplierInterface;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public goldCost: number;
  public activeAmount: number;
  public referenceIndex: PlantIndex | SeedIndex;
  public sellChance: number;
  public sellItem: any;
  public itemType: string;

  constructor(supplier: SupplierInterface, referenceIndex?: number) {
    super(supplier, referenceIndex);
  }

  protected assignData(data: SupplierInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.goldCost = data.goldCost;
    this.reference = Game.supplierCollection[referenceIndex];
    this.itemType = data.itemType;
    this.referenceIndex = data.referenceIndex;
    if (this.itemType === 'seed') {
      this.sellItem = game.seeds[data.referenceIndex];
    } else if (this.itemType === 'plant') {
      this.sellItem = game.plants[data.referenceIndex];
    }
    this.sellChance = data.sellChance;
    this.activeAmount = data.activeAmount;
  }

  public gameLoop(): void {
    const rand = Math.random();
    if (rand < this.sellChance) {
      let sellAmount = Math.floor(Math.random() * this.activeAmount * 2);
      if (sellAmount > 0) {
        const sellItem = this.sellItem;
        sellAmount = sellItem.removeAmount(sellAmount);
        game.gold += sellAmount * sellItem.sellingPrice;
      }
    }
  }

  public addAmount(amount: number): number {
    if (game.checkAndRemoveGold(this.goldCost * amount)) {
      this.amount += amount;
      return this.amount;
    } else {
      return undefined;
    }
  }

  public removeAmount(amount: number): number {
    if (this.amount < amount) {
      amount = this.amount;
    }
    this.amount -= amount;
    return amount;
  }
}

