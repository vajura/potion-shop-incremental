import { BaseClass } from './base';
import { baseInterfaceCopy } from './interfaces/base-interface';
import { game, Game } from './game';
import { Seller, SupplierInterface } from './interfaces/supplier-interface';
import { Seed } from './seed';
import { Plant } from './plant';
import { SeedIndex } from './enums/seed-index-helper';
import { PlantIndex } from './enums/plant-index-helper';
import { Golem } from './golem';
import { GolemInterface } from './interfaces/golem-interface';

export class Supplier extends BaseClass<SupplierInterface> implements SupplierInterface {

  public reference: SupplierInterface;
  public name: string;
  public tier: number;
  public amount: number;
  public color1: string;
  public color2: string;
  public unlocked: boolean;
  public seedIndex: SeedIndex;
  public plantIndex: PlantIndex;
  public seedSeller: Seller<Seed>;
  public plantSeller: Seller<Plant>;
  public goldCost: number;

  constructor(supplier: SupplierInterface, referenceIndex?: number) {
    super(supplier, referenceIndex);
  }

  protected assignData(data: SupplierInterface, referenceIndex?: number) {
    baseInterfaceCopy(this, data);
    this.goldCost = data.goldCost;
    this.reference = Game.supplierCollection[referenceIndex];
    this.seedSeller = {
      reference: game.seeds[data.seedIndex],
      sellChance: data.seedSeller.sellChance,
      amount: data.seedSeller.amount
    };
    this.plantSeller = {
      reference: game.plants[data.plantIndex],
      sellChance: data.plantSeller.sellChance,
      amount: data.plantSeller.amount
    };
  }

  public gameLoop(): void {
    const rand = Math.random();
    if (rand < this.seedSeller.sellChance) {
      let sellAmount = Math.floor(Math.random() * this.seedSeller.amount * 2);
      if (sellAmount > 0) {
        const seed = this.seedSeller.reference;
        sellAmount = seed.removeAmount(sellAmount);
        game.gold += sellAmount * seed.sellingPrice;
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

