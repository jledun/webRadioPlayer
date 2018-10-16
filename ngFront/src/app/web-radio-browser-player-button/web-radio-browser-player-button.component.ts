import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WebRadioBrowserPlayerComponent } from '../web-radio-browser-player/web-radio-browser-player.component';

@Component({
  selector: 'app-web-radio-browser-player-button',
  templateUrl: './web-radio-browser-player-button.component.html',
  styleUrls: ['./web-radio-browser-player-button.component.css']
})
export class WebRadioBrowserPlayerButtonComponent {
  @Input() url: any = {};
  
  constructor(
    public dialog: MatDialog
  ) { }

  playWebRadioInBrowser() {
    const dialogRef = this.dialog.open(
      WebRadioBrowserPlayerComponent, {
        data: Object.assign({}, this.url),
        closeOnNavigation: false,
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
