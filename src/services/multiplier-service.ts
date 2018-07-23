import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationInterface } from '../models/interfaces/notification-interface';
declare var kd;

@Injectable()
export class MultiplierService {

  public buttonMultiplier = 1;
  private displayTimeDefault = 5000;
  notification = new BehaviorSubject<NotificationInterface>(null);

  constructor() {
    setInterval(() => {
      kd.tick();
    }, 25);
    kd.A.down(() => {
      if (this.buttonMultiplier === 1) {
        this.buttonMultiplier = 10;
      }
    });
    kd.A.up(() => {
      if (this.buttonMultiplier === 10) {
        this.buttonMultiplier = 1;
      }
    });
    kd.S.down(() => {
      if (this.buttonMultiplier === 1) {
        this.buttonMultiplier = 100;
      }
    });
    kd.S.up(() => {
      if (this.buttonMultiplier === 100) {
        this.buttonMultiplier = 1;
      }
    });
    kd.D.down(() => {
      if (this.buttonMultiplier === 1) {
        this.buttonMultiplier = 1000;
      }
    });
    kd.D.up(() => {
      if (this.buttonMultiplier === 1000) {
        this.buttonMultiplier = 1;
      }
    });
  }
}
