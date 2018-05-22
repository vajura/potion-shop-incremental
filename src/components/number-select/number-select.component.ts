import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-select',
  templateUrl: './number-select.component.html',
  styleUrls: ['./number-select.component.scss']
})
export class NumberSelectComponent implements OnInit {

  @Input() numberValue = 1;
  @Output() numberChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
