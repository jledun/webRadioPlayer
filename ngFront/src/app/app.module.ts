import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatGridListModule,
  MatMenuModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MplayerRemoteService } from './mplayer-remote.service';
import { WebRadioItemComponent } from './web-radio-item/web-radio-item.component';
import { StatusComponent } from './status/status.component';
import { WebRadioEditorComponent } from './web-radio-editor/web-radio-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRadioItemComponent,
    StatusComponent,
    WebRadioEditorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  entryComponents: [
    WebRadioEditorComponent
  ],
  providers: [MplayerRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
