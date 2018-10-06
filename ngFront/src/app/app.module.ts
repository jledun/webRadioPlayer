import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MplayerRemoteService } from './mplayer-remote.service';
import { WebRadioItemComponent } from './web-radio-item/web-radio-item.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRadioItemComponent,
    StatusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatSliderModule,
    MatToolbarModule
  ],
  providers: [MplayerRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
