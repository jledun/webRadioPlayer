import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MplayerRemoteService } from './mplayer-remote.service';
import { WebRadioEditorComponent } from './web-radio-editor/web-radio-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Saballe Web Radio Player';

  absVolume: number = 0;
  setVolume(event) {
    this.absVolume = event.value;
  }
  displayTitle() {
    return (
      this.mPlayer.status && 
      this.mPlayer.status.url && 
      this.mPlayer.status.url.name && 
      this.mPlayer.status.status !== 'stopped'
    ) ? true : false
  }

  constructor(
    public dialog: MatDialog,
    public mPlayer: MplayerRemoteService
  ) {}

  play(url: any) {
    this.mPlayer.play(url);
  }
  stop(url: any) {
    this.mPlayer.stop(url);
  }
  pause(url: any) {
    console.log('pause: ', url);
  }
  volumeUp() {
    this.mPlayer.volumeUp();
  }
  volumeDown() {
    this.mPlayer.volumeDown();
  }
  createUrl() {
    const dialogRef = this.dialog.open(WebRadioEditorComponent, {
      width: '40%',
      data: {
        url: {name: '', url: ''},
        dialogType: 'create',
        dialogTitle: 'Ajouter une web radio'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mPlayer.addUrl(result.url);
    });
  }

}
