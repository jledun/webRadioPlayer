import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-web-radio-browser-player',
  templateUrl: './web-radio-browser-player.component.html',
  styleUrls: ['./web-radio-browser-player.component.css']
})
export class WebRadioBrowserPlayerComponent {

  constructor(
    public dialogRef: MatDialogRef<WebRadioBrowserPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.afterOpen().subscribe(
      () => {}
    );
  }

}
