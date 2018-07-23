import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MultiplierService } from '../../services/multiplier-service';

@Component({
  selector: 'app-number-select',
  templateUrl: './number-select.component.html',
  styleUrls: ['./number-select.component.scss'],
})

export class NumberSelectComponent implements OnInit {

  @Input() numberValue = 1;
  @Input() title = 'Select amount';
  @Input() titleWidth = 126;
  @Output() numberChanged: EventEmitter<number> = new EventEmitter();

  constructor(public multiplierService: MultiplierService) {
  }

  ngOnInit() {
  }

  sendNumber(add: boolean) {
    if (add) {
      this.numberChanged.emit(this.multiplierService.buttonMultiplier);
    } else {
      this.numberChanged.emit(-this.multiplierService.buttonMultiplier);
    }
  }
}
