import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  @Input() status: string = 'stopped';

  constructor() { }

  getColor() {
    switch(this.status) {
      case 'stopped':
        return '#fff';
      case 'loading...':
        return '#ec407a';
      case 'playing':
        return '#42a5f5';
    }
  }

}
