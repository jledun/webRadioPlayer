import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
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
  sideOpen: boolean = false;

  navButtons: Array<any> = [
    {title: 'Bibliothèque', link: 'library'},
    {title: 'TuneIn', link: 'radiotime'},
    {title: 'Soundcloud', link: 'soundcloud'}
  ]

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
    public mPlayer: MplayerRemoteService,
    private router: Router
  ) {
    this.router.events.subscribe(
      data => {
        if (
          data instanceof RouterEvent && 
          data.hasOwnProperty('url') && 
          data.url !== ''
        ) this.title = this.navButtons.find(elm => data.url.indexOf(elm.link) >= 0).title;
      }
    )
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
