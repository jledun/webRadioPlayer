import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RadioTimeBrowserService } from '../radio-time-browser.service';

@Component({
  selector: 'app-web-radio-browser-player',
  templateUrl: './web-radio-browser-player.component.html',
  styleUrls: ['./web-radio-browser-player.component.css']
})
export class WebRadioBrowserPlayerComponent {

  constructor(
    public dialogRef: MatDialogRef<WebRadioBrowserPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rt: RadioTimeBrowserService
  ) {
    this.dialogRef.afterOpen().subscribe(
      () => {
        if (this.data.hasOwnProperty('url')) return;
        if (this.data.hasOwnProperty('radioTimeUrl')) {
          this.rt.browseRadioTimeUrl(this.data).subscribe(
            data => {
              this.data = Object.assign({}, this.data, data);
            }, err => {
              console.log(err);
            }, () => {}
          );
        }
      }
    );
  }

}
